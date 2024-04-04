const mongoose = require("mongoose");
const User = require("../models/User");
const logger = require("./logger");

const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Function to encrypt data using AES
function encryptData(data, key) {
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let encryptedData = cipher.update(data, "utf8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}

// Function to decrypt data using AES
function decryptData(encryptedData, key) {
  const decipher = crypto.createDecipher("aes-256-cbc", key);
  let decryptedData = decipher.update(encryptedData, "hex", "utf8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
}

/**
 * This function adds User into DB
 * @param {JSON} userInfo JSON Info of User
 * @returns Boolean
 */
async function addUserToDB(userInfo) {
  try {
    hashedPassword = await bcrypt.hash(userInfo.password, 10);

    console.log("Tester: hashed password: ", hashedPassword);
    const x = userInfo;
    x.password = hashedPassword;

    const encryptedUserInfo = {
      name: encryptData(userInfo.name, "encryptionKey"),
      email: encryptData(userInfo.email, "encryptionKey"),
      password: x.password,
      address: encryptData(userInfo.address, "encryptionKey"),
      phoneNumber: encryptData(userInfo.phoneNumber, "encryptionKey"),
      mfa: userInfo.mfa,
      tempSecret: userInfo.tempSecret,
      locked: userInfo.locked,
    };
    console.log(encryptedUserInfo);

    const userExists = await User.findOne({
      email: encryptData(userInfo.email, "encryptionKey"),
    }).exec();

    if (userExists) {
      logger.testlogger.info(
        `User with email: ${userInfo.email} already exists.`
      );
      throw new Error("User already exists", {
        cause: { statusCode: 404, message: "User already exists" },
      });
    } else {
      logger.testlogger.info(`Creating new user with: ${encryptedUserInfo}`);
      const newUser = await User.create(encryptedUserInfo);
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
    const encryptedEmail = encryptData(userInfo.email, "encryptionKey");
    const userExists = await User.findOne({ email: encryptedEmail }).exec();
    console.log(
      "Encrypted emailL: ",
      encryptData(userInfo.email, "encryptionKey")
    );
    const passwordMatch = await bcrypt.compare(
      userInfo.password,
      userExists.password
    );

    if (userExists) {
      const decryptedEmail = decryptData(userExists.email, "encryptionKey");
      if (decryptedEmail === userInfo.email) {
        const passwordMatch = await bcrypt.compare(
          userInfo.password,
          userExists.password
        );
        if (passwordMatch) {
          logger.testlogger.info(
            `User with email: ${userInfo.email} logged in.`
          );
          return userExists._id;
        } else {
          logger.testlogger.error(`Incorrect password.`);
          throw new Error("Passwords Mismatch", {
            statusCode: 404,
            message: "Incorrect password",
          });
        }
      } else {
        logger.testlogger.error(`Incorrect email information.`);
        throw new Error("User does not exist", {
          statusCode: 404,
          message: "Incorrect email info",
        });
      }
    } else {
      logger.testlogger.error(
        `User with email: ${userInfo.email} does not exist.`
      );
      throw new Error("User does not exist", {
        statusCode: 404,
        message: "User does not exist",
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
    const encryptedEmail = encryptData(userInfo.email, "encryptionKey");
    const userExists = await User.findOne({ email: encryptedEmail }).exec();
    if (userExists) {
      const decryptedEmail = decryptData(userExists.email, "encryptionKey");
      if (decryptedEmail === userInfo.email) {
        const passwordMatch = await bcrypt.compare(
          userInfo.password,
          userExists.password
        );

        if (passwordMatch) {
          logger.testlogger.info(
            `User with email: ${userInfo.email} logged in.`
          );
          return userExists.mfa;
        } else {
          logger.testlogger.error(`Incorrect password.`);
          throw new Error("Passwords Mismatch", {
            statusCode: 404,
            message: "Incorrect password",
          });
        }
      } else {
        logger.testlogger.error(`Incorrect email information.`);
        throw new Error("User does not exist", {
          statusCode: 404,
          message: "Incorrect email info",
        });
      }
    } else {
      logger.testlogger.error(
        `User with email: ${userInfo.email} does not exist.`
      );
      throw new Error("User does not exist", {
        statusCode: 404,
        message: "User does not exist",
      });
    }
  } catch (error) {
    logger.testlogger.error(`Error occured while searching for user: ${error}`);
    if (error instanceof Error) throw error;
    else throw Error("Some Error Occured: ", error.toString());
  }
}

async function getUserStatus(userInfo) {
  try {
    const encryptedEmail = encryptData(userInfo.email, "encryptionKey");
    const userExists = await User.findOne({ email: encryptedEmail }).exec();
    if (userExists) {
      const decryptedEmail = decryptData(userExists.email, "encryptionKey");
      if (decryptedEmail === userInfo.email) {
        const passwordMatch = await bcrypt.compare(
          userInfo.password,
          userExists.password
        );

        if (passwordMatch) {
          logger.testlogger.info(
            `User with email: ${userInfo.email} logged in.`
          );
          return userExists.locked;
        } else {
          logger.testlogger.error(`Incorrect password.`);
          throw new Error("Passwords Mismatch", {
            statusCode: 404,
            message: "Incorrect password",
          });
        }
      } else {
        logger.testlogger.error(`Incorrect email information.`);
        throw new Error("User does not exist", {
          statusCode: 404,
          message: "Incorrect email info",
        });
      }
    } else {
      logger.testlogger.error(
        `User with email: ${userInfo.email} does not exist.`
      );
      throw new Error("User does not exist", {
        statusCode: 404,
        message: "User does not exist",
      });
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
    const encryptedEmail = encryptData(email, "encryptionKey");
    const updatedUser = await User.findOneAndUpdate(
      { email: encryptedEmail },
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
    const encryptedEmail = encryptData(email, "encryptionKey");
    const updatedUser = await User.findOneAndUpdate(
      { email: encryptedEmail },
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
      { email: email  },
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
    const decryptedUser = {
      _id: user._id,
      name: decryptData(user.name, "encryptionKey"),
      email: decryptData(user.email, "encryptionKey"),
      address: decryptData(user.address, "encryptionKey"),
      phoneNumber: decryptData(user.phoneNumber, "encryptionKey"),
      mfa: user.mfa,
      tempSecret: user.tempSecret,
      locked: user.locked,
    };
    logger.testlogger.info(`Getting user: ${decryptedUser}.`);
    return decryptedUser;
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
  deleteUser,
};
