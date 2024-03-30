const mongoose = require("mongoose");
const User = require("../models/User");
const logger = require("./logger");

/**
 * This function adds User into DB
 * @param {JSON} userInfo JSON Info of User
 * @returns Boolean
 */
async function addUserToDB(userInfo) {
  try {
    // Checking is a User Already exists
    const userExists = await User.findOne({ email: userInfo.email }).exec();

    if (userExists) {
      logger.testlogger.info(
        `User with email: ${userInfo.email} already exists.`
      );
      throw new Error("User already exists", {
        cause: { statusCode: 404, message: "User already exists" },
      });
    } else {
      logger.testlogger.info(`Creating new user with: ${userInfo}`);
      const newUser = await User.create(userInfo);
      await newUser.save();
      return newUser._id;
    }
  } catch (error) {
    logger.testlogger.error(`Error occured while adding user: ${error}`);
    if (error instanceof Error) throw error;
    else throw Error("Some Error Occured: ", error.toString());
  }
}

async function searchUserInDB(userInfo) {
  try {
    // Checking is a User Already exists
    const userExists = await User.findOne({
      email: userInfo.email,
      password: userInfo.password,
    }).exec();

    if (userExists) {
      logger.testlogger.info(`User with email: ${userInfo.email} exists.`);
      return userExists._id;
    } else {
      logger.testlogger.error(`Incorrect login information.`);
      throw new Error("User does not exist", {
        cause: { statusCode: 404, message: "Incorrect login info" },
      });
    }
  } catch (error) {
    logger.testlogger.error(`Error occured while searching for user: ${error}`);
    if (error instanceof Error) throw error;
    else throw Error("Some Error Occured: ", error.toString());
  }
}

async function getMFA(userInfo) {
  try {
    // Checking is a User Already exists
    const userExists = await User.findOne({
      email: userInfo.email,
      password: userInfo.password,
    }).exec();
    console.log("yo:", userExists);
    if (userExists) {
      logger.testlogger.info(`User with email: ${userInfo.email} exists.`);
      return userExists.mfa;
    }
  } catch (error) {
    logger.testlogger.error(`Error occured while searching for user: ${error}`);
    if (error instanceof Error) throw error;
    else throw Error("Some Error Occured: ", error.toString());
  }
}

async function getUserStatus(userInfo) {
  try {
    // Checking is a User Already exists
    const userExists = await User.findOne({
      email: userInfo.email,
      password: userInfo.password,
    }).exec();
    console.log("yo:", userExists);
    if (userExists) {
      logger.testlogger.info(`User with email: ${userInfo.email} exists.`);
      return userExists.locked;
    }
  } catch (error) {
    logger.testlogger.error(`Error occured while searching for user: ${error}`);
    if (error instanceof Error) throw error;
    else throw Error("Some Error Occured: ", error.toString());
  }
}

async function updateUserInDB(email, data) {
  try {
    console.log("The Email: ", email, " and TempSecret: ", data);
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { tempSecret: data },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    logger.testlogger.error(`Error occured while updating user data: ${error}`);
    if (error instanceof Error) throw error;
    else throw Error("Some Error Occured: ", error.toString());
  }
}

async function updateUserMFAInDB(email, data) {
  try {
    console.log("The Email: ", email, " and MFA: ", data);
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { mfa: data },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    logger.testlogger.error(`Error occured while updating user data: ${error}`);
    if (error instanceof Error) throw error;
    else throw Error("Some Error Occured: ", error.toString());
  }
}

async function updateUserStatus(email, status) {
  try {
    console.log("The Email: ", email, " and status is: ", status);
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { locked: status },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    logger.testlogger.error(`Error occured while updating user data: ${error}`);
    if (error instanceof Error) throw error;
    else throw Error("Some Error Occured: ", error.toString());
  }
}

/**
 * This function retriever User info from DB
 * @param {mongoose.ObjectId} userId
 * @returns User
 */
async function getUserFromDB(userId) {
  try {
    const user = await User.findById(userId).exec();
    logger.testlogger.info(`Getting user: ${user}.`);
    return user;
  } catch (error) {
    logger.testlogger.error(`Error occured while searching for user: ${error}`);
    if (error instanceof mongoose.Error.CastError)
      throw new Error("Fetching user failed", {
        cause: { statusCode: 404, errMessage: error },
      });
    else
      throw new Error("Fetching user failed", {
        cause: { statusCode: 500, errMessage: error },
      });
  }
}

/**
 * This function retrieves all users from the database
 * @returns Array of User objects
 */
async function getAllUsersFromDB() {
  try {
    const users = await User.find().exec();
    logger.testlogger.info(`Retrieved all users from database.`);
    return users;
  } catch (error) {
    logger.testlogger.error(
      `Error occurred while retrieving all users: ${error}`
    );
    throw new Error("Fetching all users failed", {
      cause: { statusCode: 500, errMessage: error },
    });
  }
}

/**
 * Deletes a user from the database.
 * @param {string} userId - The ID of the user to be deleted.
 * @returns {Promise<void>} A Promise that resolves once the user is deleted.
 */
async function deleteUser(userId) {
  try {
    await User.findByIdAndDelete(userId);
    logger.testlogger.info(`User with ID ${userId} deleted successfully.`);
  } catch (error) {
    logger.testlogger.error(`Error deleting user with ID ${userId}: ${error}`);
    throw error;
  }
}

module.exports = {
  addUserToDB,
  getUserFromDB,
  searchUserInDB,
  updateUserInDB,
  updateUserMFAInDB,
  updateUserStatus,
  getMFA,
  getUserStatus,
  getAllUsersFromDB,
  deleteUser
};
