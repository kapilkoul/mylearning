var mongoose = require('mongoose'), assert = require('assert');

var Dishes = require('./models/dishes');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

//Event handling
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected successfully to " + url);
    
    Dishes.create({
        name: "Uthapizza",
        image: "images/uthapizza.png",
        category: "mains",
        price: "4.99",
        label: 'Hot',
        description: "A unique . . .",
        comments: [
            {
              rating: 5,
              comment: "Imagine all the eatables, living in conFusion!",
              author: "John Lemon"
            },
            {
              rating: 4,
              comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
              author: "Paul McVites"
            }
        ]
    }, function(err, dish) {
        if(err) throw err;
        console.log('Dish created!');
        console.log(dish);
        var id = dish._id;
        
        //Get dishes by id after a timeout
        setTimeout(function() {
            Dishes.findByIdAndUpdate(id, {
                $set: {description: 'A unique dish...updated'}
            }, {new:true})
            .exec(function(err,dish) {
                if(err) throw err;
                console.log('Updated Dish!');
                console.log(dish);
                
                dish.comments.push({
                    rating: 5,
                    comment: 'I\'m getting a sinking feeling',
                    author: 'Leonardo di Carpaccio'
                });
                
                dish.save(function(err, dish) {
                    console.log('Updated comments!');
                    console.log(dish);
                    
                    db.collection('dishes').drop(function() {
                        console.log("Dropped collection!");
                        db.close();
                    });//end drop
                }); //end dish save
            }); //end find and exec
        },3000); //end timeout
    }); //end create 
}); //end db once