const express = require('express');
const router = express.Router();
const UserSettings = require('../models/UserSettings');

// Route to get user setting with passed userId and create a new empty one if it doesn't exist
router.get('/userSettings/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        let userSetting = await UserSettings.findOne({ userId });

        // If userSetting doesn't exist, create a new empty one
        if (!userSetting) {
            userSetting = new UserSettings({ userId });
            await userSetting.save();
        }

        res.status(200).json(userSetting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to create a new user setting
router.post('/userSettings', async (req, res) => {
    try {
        const newUserSettings = new UserSettings(req.body);
        await newUserSettings.save();
        res.status(201).json(newUserSettings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to append to activities
router.post('/userSettings/:userId/activity', async (req, res) => {
    try {
        const { userId } = req.params;
        const userSettings = await UserSettings.findOne({ userId });
        if (!userSettings) return res.status(404).json({ message: 'UserSettings not found' });
        
        userSettings.activity.push(req.body);
        await userSettings.save();
        
        res.status(200).json(userSettings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to update failed login attempts
router.patch('/userSettings/:userId/loginAttempts', async (req, res) => {
    try {
        const { userId } = req.params;
        const { loginAttempts } = req.body;

        await UserSettings.updateOne({ userId }, { loginAttempts });
        
        res.status(200).json({ message: 'Failed login attempts updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;