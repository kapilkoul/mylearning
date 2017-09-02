var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create comments schema
var commentsSchema = new Schema({
    rating: {type: Number, min:1, max:5, required: true},
    comment: {type: String, required: true},
    author: {type: String, required: true}
}, {timestamps: true});

//Create the dish schema
var dishSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    comments: [commentsSchema]
}, {timestamps: true});

//Using the schema create the model
var Dishes = mongoose.model('Dish', dishSchema); //This creates a collection called Dishes

module.exports = Dishes;