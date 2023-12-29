const express = require("express");
const dbo = require("./database");
const cors = require("cors");
const authRoutes = require('../routes/AuthRoutes');
const userRoutes = require('../routes/UserRoutes');

require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', authRoutes, userRoutes );

app.listen(port, () => {
  console.log("Server listening on port", port);
  try {
    dbo.init();
  } catch (error) {
      console.error(error);
      process.exit(1);
  }
});