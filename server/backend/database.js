const mongoose = require("mongoose");

const dbName = "test";
const userCount = 5;

//Mongoose Schemes
const User = require("../models/User");
//Usercalls
const userCalls = require('../backend/userCalls');


/**
 * Initializing Database * 
 * @returns Database
 */
async function init() {
    try {
        await mongoose.connect(`mongodb+srv://yajurva23:Parul_1471@capstonetestdb.x5h6b57.mongodb.net/${dbName}`);
        const db = mongoose.connection;
        
        console.log('Connection Successful')
        // Add User Schema
        db.model("User", User.schema);

        // Add Dummy User Data
        // await addDummyUserData(userCount);
        
        return db;

    } catch (error) {
        console.error(error);
    }
}

async function addDummyUserData(size) {

    const api_endpoint = `https://random-data-api.com/api/v2/users?size=${size}`;
    await fetch(api_endpoint, {
        method: "GET"
    })
        .then(response => {
            if (response.status !== 200) {
                return "error";
            }
            return response.json();
        })
        .then(data => {
            data.forEach(async user => {
                const newUser = {
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    password: user.password,
                }
                userCalls.addUserToDB(newUser);
            });
        })
        .catch(error => {
            console.log(error);
            throw (new Error(`Error: ${error}\nSomething went wrong with the Dummy Data API`));
        });
}
module.exports = { init }