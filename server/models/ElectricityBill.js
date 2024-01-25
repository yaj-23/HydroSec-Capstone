let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let electricityBillSchema = new Schema({
    accountNumber: { type: Number, require: true },
    meterNumber: { type: Number, require: true },
    electricityRate: { type: Number, require: true },
    totalElectricityConsumption: { type: Number, require: true },
    amountDue: { type: Number, require: true },
    statementDate: { type: String, require: true },
    dueDate: { type: String, require: true },
});

module.exports = mongoose.model('ELectricityBill', electricityBillSchema);