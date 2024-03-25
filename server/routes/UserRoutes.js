const express = require("express");
const router = express.Router();

const userCalls = require("../backend/userCalls");
const User = require("../models/User");

const logger = require("../backend/logger");

const { Mongoose, default: mongoose } = require("mongoose");

router.get("/users/:userId/getDetails", async (req, res) => {
  // Getting all details from user
  try {
    // Saving User Id
    const userId = req.params.userId;
    let userItem = {};

    // Grabbing user from database
    const user = await userCalls.getUserFromDB(userId);
    userItem = {
      accountNumber: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
      role: user.role,
      mfa: user.mfa,
    };
    // Sending back user item list
    res.send(userItem);
  } catch (error) {
    errorFunc(res, error);
  }
});

router.get("/users/getAllDetails", async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await userCalls.getAllUsersFromDB();

    // Map users to desired format
    const usersList = users.map((user) => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.locked,
    }));

    // Sending back the list of user items
    res.json(usersList);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

router.get("/users/updateStatus", async (req, res) => {
    try{
        const userInfo = req.query;
        logger.testlogger.info(`User Status Change Invoked For: ${JSON.stringify(userInfo.email)}`);
        const user = await userCalls.updateUserStatus(userInfo.email, userInfo.status)
        res.send(user);
    } catch(error) {
        logger.testlogger.error(`Error occured while generating QR image: ${error}`);
        errorFunc(res, error);
    }
});


module.exports = router;

/**
 *
 * @param {*} res
 * @param {*} error
 */
function errorFunc(res, error) {
  if (error.name === "TypeError") {
    console.log(error);
    res.status(404).send("Wrong ID sent");
  } else if (error.cause) {
    res.status(error.cause.statusCode).send(error.toString());
  } else res.status(500).send(error.toString());
}
