const dgram = require('dgram');  // For UDP syslog
const tls = require('tls');      // For TCP/TLS syslog
const client = require('prom-client');  // Optional metrics

const LOKI_URL = 'http://loki-o8cj.onrender.com/loki/api/v1/push';  // Your Loki
const SYSLOG_PORT = 6514;
const server = dgram.createSocket('udp4');  // Start with UDP; add TCP below if needed

// Parse syslog message (RFC5424 simple version)
function parseSyslog(msg, rinfo) {
  const parts = msg.toString().split(' ');
  const timestamp = new Date().toISOString();
  const hostname = rinfo ? rinfo.address : 'unknown';
  const logLine = msg.toString();
  return {
    streams: [{
      stream: { job: 'node-app', host: hostname, level: 'info' },
      values: [ [ timestamp, JSON.stringify({ message: logLine, timestamp }) ] ]
    }]
  };
}

// Push to Loki
async function pushToLoki(parsed) {
  const response = await fetch(LOKI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed)
  });
  if (!response.ok) console.error('Loki push failed:', response.status);
}

// UDP Syslog listener
server.on('message', (msg, rinfo) => {
  const parsed = parseSyslog(msg, rinfo);
  pushToLoki(parsed);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP Syslog listener on ${address.address}:${address.port}`);
});

server.bind(SYSLOG_PORT, '0.0.0.0');

// For TCP/TLS (Render prefers TLS—add if UDP fails)
const tlsServer = tls.createServer({
  key: '',  // Self-signed for Free tier; Render accepts insecure
  cert: ''
}, (socket) => {
  socket.on('data', (data) => {
    const parsed = parseSyslog(data);
    pushToLoki(parsed);
  });
});
tlsServer.listen(SYSLOG_PORT + 1, '0.0.0.0');  // 6515 for TCP test
console.log('TCP/TLS listener ready on 6515 (insecure mode)');
