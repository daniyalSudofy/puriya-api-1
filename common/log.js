const winston = require('winston');
require('winston-papertrail').Papertrail;
const log = require('tracer').console({ format: '{{message}}  - {{file}}:{{line}}' }).log;
const host = ``;
const port = '';

const nodeWinstonPapertrail = new winston.transports.Papertrail({
  host: host,
  port: port,
  program: `API`,
  colorize: true,
  logFormat: function (level, message) {
    return message;
  }
});

const nodeLogger = new winston.Logger({
  transports: [nodeWinstonPapertrail]
});

function productionLogs() {
  let fileParts;
  let fileName = ` - `;
  try {
    fileParts = new Error().stack.split(`\n`)[2].split(`/`);
    fileName = ` - ${fileParts[fileParts.length - 1]}`;
  } catch (err) {
    // donothing
  }
  nodeLogger.info(...arguments, fileName);
}

// PRODUNCTION LOGS
if (process.env.ENVIRONMENT === `aws`) {
  module.exports = productionLogs;
} else {
  module.exports = log;
}
