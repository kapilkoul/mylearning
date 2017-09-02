var mongoose = require('mongoose'), assert = require('assert');

var Promotions = require('./models/promotions');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

//Event handling
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected successfully to " + url);
    
    Promotions.create({
        name: "Weekend Grand Buffet",
        image: "images/buffet.png",
        label: "New",
        price: "19.99",
        description: "Featuring . . ."
    }, function(err, promotion) {
        if(err) throw err;
        console.log('Promotion created!');
        console.log(promotion);
        var id = promotion._id;
        
        //Get dishes by id after a timeout
        setTimeout(function() {
            Promotions.findByIdAndUpdate(id, {
                $set: {description: 'Featuring...updated'}
            }, {new:true})
            .exec(function(err,promotion) {
                if(err) throw err;
                console.log('Updated promotion!');
                console.log(promotion);
                    
                db.collection('promotions').drop(function() {
                    console.log("Dropped collection!");
                    db.close();
                });//end drop

            }); //end find and exec
        },3000); //end timeout
    }); //end create 
}); //end db once