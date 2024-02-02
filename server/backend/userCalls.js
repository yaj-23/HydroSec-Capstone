const mongoose = require("mongoose");
const User = require("../models/User");
const logger = require('../backend/logger');

/**
 * This function adds User into DB
 * @param {JSON} userInfo JSON Info of User
 * @returns Boolean
 */
async function addUserToDB(userInfo) {
    try 
    {   
        // Checking is a User Already exists
        const userExists = await User.findOne({ email: userInfo.email }).exec();

        if (userExists) {
            logger.testlogger.info(`User with email: ${userInfo.email} already exists.`);
            throw new Error("User already exists", { cause: { statusCode: 404, message: "User already exists" } })
        }
        else {
            logger.testlogger.info(`Creating new user with: ${userInfo}`);
            const newUser = await User.create(userInfo);
            await newUser.save();  
            return newUser._id;
        }

    }catch(error){
        logger.testlogger.error(`Error occured while adding user: ${error}`);
        if (error instanceof(Error))
            throw error
        else
            throw Error("Some Error Occured: ", error.toString());
    }
}

async function searchUserInDB(userInfo){
    try 
    {   
        // Checking is a User Already exists
        const userExists = await User.findOne({ email: userInfo.email, password: userInfo.password }).exec();

        if (userExists) {
            logger.testlogger.info(`User with email: ${userInfo.email} exists.`);
            return userExists._id;
        }
        else {
            logger.testlogger.error(`Incorrect login information.`);
            throw new Error("User does not exist", { cause: { statusCode: 404, message: "Incorrect login info" } })
        }

    }catch(error){
        logger.testlogger.error(`Error occured while searching for user: ${error}`);
        if (error instanceof(Error))
            throw error
        else
            throw Error("Some Error Occured: ", error.toString());
    }
}

async function updateUserInDB(userInfo, data){
    try 
    {   
        User.findOneAndUpdate({ email: userInfo.email, password: userInfo.password }, {tempSecret : data}, {
            new: true
          });
    }catch(error){
        logger.testlogger.error(`Error occured while updating user data: ${error}`);
        if (error instanceof(Error))
            throw error
        else
            throw Error("Some Error Occured: ", error.toString());
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
            throw new Error('Fetching user failed', { cause : {statusCode : 404, errMessage : error }})
        else throw new Error('Fetching user failed', { cause : { statusCode : 500, errMessage : error }})

    }    
}

module.exports = {
    addUserToDB,
    getUserFromDB,
    searchUserInDB,
    updateUserInDB
}