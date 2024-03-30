const mongoose = require("mongoose");
const logger = require("./logger");
const fs = require('fs');
const path = require('path'); 

const dbName = "test";

//Mongoose Schemes
const User = require("../models/User");
const Logs = require("../models/Logs");
//Usercalls
const userCalls = require("../backend/userCalls");
const logsCalls = require("../backend/logsCalls");

/**
 * Initializing Database *
 * @returns Database
 */
async function init() {
  try {
    await mongoose.connect(
      `mongodb+srv://yajurva23:capstone2024@capstonetestdb.x5h6b57.mongodb.net/${dbName}`
    );
    const db = mongoose.connection;
    console.log("Connection Successful");
    // Add User Schema
    db.model("User", User.schema);
    db.model("Logs", Logs.schema);
    // Add Log Data
    await addLogs();
    logger.testlogger.info(`Successfully connected to DB: ${db.name}`);
    return db;
  } catch (error) {
    logger.testlogger.error(`Error DB initialization: ${error}`);
    console.error(error);
  }
}

async function addLogs() {

    try {
        const logFilePath = path.join(__dirname, 'info.log');
        const logData = fs.readFileSync(logFilePath, 'utf8');
        // console.log("Log data:", logData);
        const log_ = await logsCalls.addLog(logData);
        // console.log("Log:", log_);
    } catch (error) {
        console.error('Error adding logs:', error);
    }

}
module.exports = { init };
