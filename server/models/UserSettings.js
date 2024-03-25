const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    type: {
        type: String,
        enum: ['SUCCESSFUL_LOGIN', 'FAILED_LOGIN', 'PASSWORD_CHANGE']
    },
    ip: String,
    location: String,
    browser: String,
    os: String,
    date: String,
    timestamp: String
});

const userSettingsSchema = new Schema({
    userId: { // uses ObjectId from User schema
        type: String,
        required: true
    },
    failedLoginAttempts: { // failed login attempts since last login
        type: Number,
        default: 0
    },
    activity: [activitySchema]
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);