const mongoose = require("mongoose");
const User = require("../models/User");

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
            throw new Error("User already exists", { cause: { statusCode: 404, message: "User already exists" } })
        }
        else {
            const newUser = await User.create(userInfo);
            await newUser.save();  
            return newUser._id;
        }

    }catch(error){
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
            return userExists._id;
        }
        else {
            throw new Error("User does not exist", { cause: { statusCode: 404, message: "Incorrect login info" } })
        }

    }catch(error){
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
        return user;
    } catch (error) {   
        if (error instanceof mongoose.Error.CastError)
            throw new Error('Fetching user failed', { cause : {statusCode : 404, errMessage : error }})
        else throw new Error('Fetching user failed', { cause : { statusCode : 500, errMessage : error }})

    }    
}

module.exports = {
    addUserToDB,
    getUserFromDB,
    searchUserInDB
}