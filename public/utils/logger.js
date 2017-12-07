const winston = require('winston');
winston.emitErrs = true;

const logger = new winston.Logger({
  transports: [
    // new winston.transports.File({
    //   level: 'info',
    //   filename: './../logs/all-logs.log',
    //   handleExeptions: true,
    //   json: true,
    //   maxsize: 5242880,
    //   maxFiles: 5,
    //   colorize: false
    // }),
    new winston.transports.Console({
      level: 'debug',
      handleExeptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: (message, encoding) => {
    logger.info(message);
  }
};