var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
    vendor: {type: String, required: true },
    type: {type: String, enum: ['savings','credit card','loan','investment'], default: 'savings'},
    identifier: {type: String, required: true},
    belongsTo: {type: String, enum: ['self','merchant','cash'], default: 'self'},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

Account.index({identifier:1, createdBy:1}, {unique: true});

module.exports = mongoose.model('Account', Account);