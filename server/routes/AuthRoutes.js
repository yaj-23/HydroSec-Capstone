const express = require('express');
const router = express.Router();

const userCalls = require('../backend/userCalls');


router.post("/signup", async (req, res) => {
    try {
        // Saving using Info
        const userInfo = req.body;
        // Adding using to DB
        const userId = await userCalls.addUserToDB(userInfo);
        res.send(userId);
    } catch (error) {
        errorFunc(res, error);
    }
    
});
router.post("/signin", async (req, res) => {
    try{
    const userInfo = req.body;
    const userId = await userCalls.searchUserInDB(userInfo);
    res.send(userId);
    }catch(error){
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
function errorFunc(res, error){
    if (error.name === "TypeError")
        res.status(404).send("Wrong ID sent");
    else if (error.cause) {
        res.status(error.cause.statusCode).send(error.toString());            
    }
    else
        res.status(500).send(error.toString());
}