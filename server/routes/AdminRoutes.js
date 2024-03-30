const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path'); 

const logger = require("../backend/logger");

const logsCalls = require("../backend/logsCalls");

router.get('/addLogToDatabase', async (req, res) => {
    try {
        const logFilePath = path.join(__dirname, '..', 'backend', 'info.log'); 
        const logData = fs.readFileSync(logFilePath, 'utf8');
        const log_ = await logsCalls.addLog(logData);
        logger.testlogger.info(`Invoked Log To Database`);
        res.status(200).send('Log data stored successfully');
    } catch (error) {
        console.error('Error storing log data:', error);
        errorFunc(res, error);
    }
});

router.get('/fetchLatestLog', async (req, res) => {
    try {
        logger.testlogger.info(`Invoked Database to Fetch Logs`);
        const latestLog = await logsCalls.fetchLatestLog();
        res.status(200).json(latestLog);
    } catch (error) {
        console.error('Error fetching latest log entry:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
/**
 *
 * @param {*} res
 * @param {*} error
 */
function errorFunc(res, error) {
    if (error.name === "TypeError") res.status(404).send("Wrong ID sent");
    else if (error.cause) {
      res.status(error.cause.statusCode).send(error.toString());
    } else res.status(500).send(error.toString());
  }
  