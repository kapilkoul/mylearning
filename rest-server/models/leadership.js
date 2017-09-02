var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create the leader schema
var leaderSchema = new Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    designation: {type:String, required: true},
    abbr: {type:String, required: true},
    description: {type: String, required: true}
}, {timestamps: true});

//Using the schema create the model
var Leaders = mongoose.model('Leader', leaderSchema); //This creates a collection called Dishes

module.exports = Leaders;