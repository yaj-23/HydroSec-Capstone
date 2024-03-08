const express = require("express");
const router = express.Router();

const userCalls = require("../backend/userCalls");

const logger = require("../backend/logger");

router.post("/signup", async (req, res) => {
  try {
    // Saving using Info
    const userInfo = req.body;
    logger.testlogger.info(`Sign Up invoked, with userinfo: ${userInfo}`);

    // Adding using to DB
    const userId = await userCalls.addUserToDB(userInfo);
    res.send(userId);
  } catch (error) {
    logger.testlogger.error(`Error occured while signup process: ${error}`);
    errorFunc(res, error);
  }
});
router.post("/signin", async (req, res) => {
  try {
    const userInfo = req.body;
    logger.testlogger.info(
      `Sign In invoked, with userinfo: ${JSON.stringify(userInfo.email)} and ${JSON.stringify(userInfo.password)}`
    );

    const userId = await userCalls.searchUserInDB(userInfo);
    if (userId != null) {
      const userMFA = await userCalls.getMFA(userInfo);
      console.log("YOYOYOYYO:", userMFA);
    }
    res.send(userId);
  } catch (error) {
    logger.testlogger.error(`Error occured while signin process: ${error}`);
    errorFunc(res, error);
  }
});

router.delete("/delete-account", (req, res) => {
  // Delete account
  res.send("Delete account");
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
