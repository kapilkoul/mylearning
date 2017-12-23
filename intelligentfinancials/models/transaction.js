var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var Double = mongoose.Schema.Types.Double;

var Transaction = new Schema({
    accountTo: {type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true},
    accountFrom: {type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true},
    instrument: {type: String, enum: ['cash','cheque','electronic'], required: true},
    date: {type: Date, default: Date.now},
    amount: {type: Double, required: true},
    text: {type: String, required: true},
    categoryType: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

Transaction.index({accountTo:1, accountFrom: 1, createdBy: 1});
Transaction.index({accountTo:1, createdBy: 1});
Transaction.index({accountFrom:1, createdBy: 1});

module.exports = mongoose.model('Transaction', Transaction);