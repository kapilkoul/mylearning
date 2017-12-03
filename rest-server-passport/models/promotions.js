var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Load currency type
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//Create the promotions schema
var promotionSchema = new Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    label: {type:String, default: ''},
    price: {type:Currency, required: true},
    featured: {type: Boolean, default:false},
    description: {type: String, required: true}
}, {timestamps: true});

//Using the schema create the model
var Promotions = mongoose.model('Promotion', promotionSchema); //This creates a collection called Dishes

module.exports = Promotions;