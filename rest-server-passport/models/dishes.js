var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Load currency type
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//Create comments schema
var commentsSchema = new Schema({
    rating: {type: Number, min:1, max:5, required: true},
    comment: {type: String, required: true},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

//Create the dish schema
var dishSchema = new Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    category: {type:String, required: true},
    label: {type:String, default: ''},
    price: {type:Currency, required: true},
    description: {type: String, required: true},
    featured: {
        type: Boolean,
        default:false
    },
    comments: [commentsSchema]
}, {timestamps: true});

//Using the schema create the model
var Dishes = mongoose.model('Dish', dishSchema); //This creates a collection called Dishes

module.exports = Dishes;