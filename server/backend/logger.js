// logger.js
const {createLogger, transports, format}  = require('winston');

const testlogger = createLogger({
  transports: [
    new transports.File({ 
      filename: 'info.log',    
      format: format.combine(format.timestamp(), format.json())
    }), 
  ],
});

module.exports = {testlogger};
