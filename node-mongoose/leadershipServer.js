var mongoose = require('mongoose'), assert = require('assert');

var Leaders = require('./models/leadership');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

//Event handling
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected successfully to " + url);
    
    Leaders.create({
        name: "Peter Pan",
        image: "images/alberto.png",
        designation: "Chief Epicurious Officer",
        abbr: "CEO",
        description: "Our CEO, Peter, . . ."
    }, function(err, leader) {
        if(err) throw err;
        console.log('leader created!');
        console.log(leader);
        var id = leader._id;
        
        //Get dishes by id after a timeout
        setTimeout(function() {
            Leaders.findByIdAndUpdate(id, {
                $set: {description: 'Our CEO, Peter, . . .updated'}
            }, {new:true})
            .exec(function(err,leader) {
                if(err) throw err;
                console.log('Updated promotion!');
                console.log(leader);
                    
                db.collection('leaders').drop(function() {
                    console.log("Dropped collection!");
                    db.close();
                });//end drop

            }); //end find and exec
        },3000); //end timeout
    }); //end create 
}); //end db once