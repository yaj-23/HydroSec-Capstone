const express = require('express');
const router = express.Router();

const userCalls = require('../backend/userCalls'); 
const User = require('../models/User');

const { Mongoose, default: mongoose } = require('mongoose');


router.get("/users/:userId/getDetails", async (req, res) => {
    // Getting all details from user 
    try {
        // Saving User Id
        const userId = req.params.userId;
        let userItem = {};

        // Grabbing user from database
        const user = await userCalls.getUserFromDB(userId);
        userItem = {
            name: user.name,
            email: user.email
        };
        // Sending back user item list
        res.send(userItem);
    } catch (error) {
        errorFunc(res, error);
    }
});

module.exports = router;

/**
 * 
 * @param {*} res 
 * @param {*} error 
 */
function errorFunc(res, error){
    if (error.name === "TypeError"){
        console.log(error);
        res.status(404).send("Wrong ID sent");
    }
    else if (error.cause) {
        res.status(error.cause.statusCode).send(error.toString());            
    }
    else
        res.status(500).send(error.toString());
}