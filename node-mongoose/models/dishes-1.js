var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create the dish schema
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Using the schema create the model
var Dishes = mongoose.model('Dish', dishSchema); //This creates a collection called Dishes

module.exports = Dishes;