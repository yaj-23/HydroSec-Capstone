const logger = require("./logger");
const mongoose = require("mongoose");
const Logs = require("../models/Logs");


/**
 * Function to add a log message to the database
 * @param {String} message The log message to be added
 */
async function addLog(message) {
  try {
      const logEntry = await Logs.create({
          logdata: message
      });
      logger.testlogger.info(`Log data stored successfully.`);
      console.log("Log entry saved successfully.");
      return logEntry;
  } catch (error) {
      console.error("Error saving log entry:", error);
      throw error; 
  }
}

/**
 * Function to fetch the latest log entry from the database
 * @returns {Promise<Object>} The latest log entry
 */
async function fetchLatestLog() {
  try {
    const latestLog = await Logs.findOne().sort({ _id: -1 });
    logger.testlogger.info(`Latest log entry retrieved successfully.`);
    return latestLog;
  } catch (error) {
    console.error("Error fetching latest log entry:", error);
    throw error;
  }
}

module.exports = {
    addLog,
    fetchLatestLog
  };
  