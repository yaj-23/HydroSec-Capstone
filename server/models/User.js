let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    accountNumber: { type: Number, require: false },
    name: { type: String, require: true },
    email: { type: String, require: true, unique : true },
    password: { type: String, require: true, minLength: 8 },
    address: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    role: { type: String, enum: ['CUSTOMER', 'EMPLOYEE', 'ADMIN'], require: false },
    mfa: { type: Boolean, require: true},
    tempSecret: {type: String, require: false},
    locked: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', userSchema);

