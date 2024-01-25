let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let paymentSchema = new Schema({
    accountNumber: { type: Number, require: true },
    branch_transit_number: { type: Number, require: true },
    institution_id: { type: Number, require: true },
});

module.exports = mongoose.model('Payment', paymentSchema);