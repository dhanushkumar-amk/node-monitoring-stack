const express = require('express');
const promBundle = require('express-prom-bundle');
const winston = require('winston');
const app = express();
const port = process.env.PORT || 3000;

// Winston logger (outputs JSON for easy Loki parsing)
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()  // Outputs to stdout for Promtail to scrape
  ]
});

const metricsMiddleware = promBundle({ includeMethod: true, includePath: true, normalizePath: true });
app.use(metricsMiddleware);

app.get('/', (req, res) => {
  logger.info('Request received at /', { method: req.method, path: req.path, ip: req.ip });
  res.send('Hello World from Node.js on Render!');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(await require('prom-client').register.metrics());
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
