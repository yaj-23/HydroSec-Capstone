const express = require("express");
const dbo = require("./database");
const cors = require("cors");
const authRoutes = require('../routes/AuthRoutes');
const userRoutes = require('../routes/UserRoutes');
const adminRoutes = require('../routes/AdminRoutes');
const userSettingRoutes = require('../routes/UserSettingsRoutes');

const logger = require('./logger')

require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', authRoutes, userRoutes, adminRoutes, userSettingRoutes );

app.listen(port, () => {
  console.log("Server listening on port", port);
  logger.testlogger.info(`Server listening on port ${port}.`);
  try {
    dbo.init();
  } catch (error) {
      logger.testlogger.error(`Error: ${error}`);
      console.error(error);
      process.exit(1);
  }
});