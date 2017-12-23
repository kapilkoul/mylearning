var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create comments schema
var Category = new Schema({
    label: {type: String, required: true},
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true});

Category.index({label:1, createdBy:1}, {unique: true});

module.exports = mongoose.model('Category', Category);