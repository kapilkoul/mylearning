var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create favor schema
var favoriteSchema = new Schema({
    postedBy: {required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dishes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dish'}]
}, {timestamps: true});

//Using the schema create the model
var Favorites = mongoose.model('Favorite', favoriteSchema); //This creates a collection called Favorites

module.exports = Favorites;