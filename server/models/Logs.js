let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let LogsSchema = new Schema({
    logdata: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Raw Logs', LogsSchema);