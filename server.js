const express = require('express');
const client = require('prom-client');
const promBundle = require('express-prom-bundle');

const app = express();
const PORT = process.env.PORT || 3000;

// Collect default Node.js metrics (memory, CPU, event loop, GC, etc.)
client.collectDefaultMetrics({ timeout: 5000 });

// Prometheus middleware – this automatically creates /metrics endpoint
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  metricsPath: '/metrics',
  promClient: {
    collectDefaultMetrics: {}
  }
});

app.use(metricsMiddleware);

// Your actual route
app.get('/', (req, res) => {
  console.log('Request received at /');
  res.send('Hello from Node.js – Monitoring Works!');
});

// Health check (optional)
app.get('/health', (req, res) => res.send('OK'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Metrics available at http://localhost:${PORT}/metrics`);
});
