const express = require("express");
const router = express.Router();

const userCalls = require("../backend/userCalls");
const { authenticator} = require('otplib');

const logger = require("../backend/logger");

router.post("/signup", async (req, res) => {
  try {
    // Saving using Info
    const userInfo = req.body;
    logger.testlogger.info(`Sign Up invoked, with userinfo: ${userInfo}`);

    // Adding using to DB
    const userId = await userCalls.addUserToDB(userInfo);
    console.log("Sign UP: ", userId);
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
      `Sign In invoked, with userinfo: ${JSON.stringify(userInfo.email)}}`
    );

    const userId = await userCalls.searchUserInDB(userInfo);
    // if (userId != null) {
    //   const userMFA = await userCalls.getMFA(userInfo);
    //   console.log("YOYOYOYYO:", userMFA);
    // }
    res.send(userId);
  } catch (error) {
    logger.testlogger.error(`Error occured while signin process: ${error}`);
    errorFunc(res, error);
  }
});

router.post("/fetchMFA", async (req, res) => {
  try {
    const userInfo = req.body;
    logger.testlogger.info(
      `Fetching MFA Status = invoked, with userinfo: ${JSON.stringify(userInfo.email)}}`
    );
    const userMFA = await userCalls.getMFA(userInfo);
    console.log("MFA STATUS OF USER: ", userInfo.email, "is: ", userMFA);
    res.send(userMFA);
  } catch (error) {
    logger.testlogger.error(`Error occured while fetching mfa Status : ${error}`);
    errorFunc(res, error);
  }
});

router.get('/qrauth', async (req, res) => {
  try {
    const userInfo = req.query;
    console.log("UserINFO: ", userInfo);
    logger.testlogger.info(`QRCode invoked, with userinfo: ${JSON.stringify(userInfo.email)}`);
    // // // const userId = await userCalls.searchUserInDB(userInfo);
    const qrcode = require('qrcode');
    const secret = authenticator.generateSecret();
    const uri = authenticator.keyuri(userInfo, "HydroSec", secret);
    const image = await qrcode.toDataURL(uri);
    const user = await userCalls.updateUserInDB(userInfo.email, secret)
    console.log("***", user);
    console.log("**TEST**");
    console.log("**QR Image = ", image), " **";
    console.log("**Test Secret ", secret, " **");
    res.send({ image });
  } catch (error) {
    logger.testlogger.error(`Error occured while generating QR image: ${error}`);
    errorFunc(res, error);
  }
});

router.get('/set2FA', async (req, res) => {
    try {
      const userInfo = req.query;
      console.log("Email: ", userInfo.y);
      const temp = await userCalls.getUserFromDB(userInfo.y);
      console.log(userInfo.code);
      console.log(temp.tempSecret);
      const verified = authenticator.check(userInfo.code, temp.tempSecret);
      console.log(verified);
      if (verified) {
        return res.send({success : true});
      } else {
        return res.send({success : false});
      }
      // res.send("we good");
    } catch (error) {
      logger.testlogger.error(`Error occured while verifying 2FA: ${error}`);
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
