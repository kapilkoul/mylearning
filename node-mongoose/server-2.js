var mongoose = require('mongoose'), assert = require('assert');

var Dishes = require('./models/dishes-1');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

//Event handling
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected successfully to " + url);
    
    Dishes.create({
        name: 'Uthapizza',
        description: 'Test'
    }, function(err, dish) {
        if(err) throw err;
        console.log('Dish created!');
        console.log(dish);
        var id = dish._id;
        
        //Get dishes by id after a timeout
        setTimeout(function() {
            Dishes.findByIdAndUpdate(id, {
                $set: {description: 'Update Test'}
            }, {new:true})
            .exec(function(err,dish) {
                if(err) throw err;
                console.log('Updated Dish!');
                console.log(dish);
                
                db.collection('dishes').drop(function() {
                    console.log("Dropped collection!");
                    db.close();
                });//end drop
            }); //end find and exec
        },3000); //end timeout
    }); //end create 
}); //end db once