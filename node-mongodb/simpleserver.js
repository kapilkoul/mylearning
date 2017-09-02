var MongoClient = require('mongodb').MongoClient, assert=require('assert');

//Connection URL
var url = 'mongodb://localhost:27017/conFusion';

//Connect method
MongoClient.connect(url, function(err,db) {
    assert.equal(err, null);
    console.log("Connected correctly to "+url);
    
    var collection = db.collection("dishes");
    
    //Insert a document
    collection.insertOne({
        name:"Uthapizza",
        description: "test"
    }, function(err, result) {
        assert.equal(err,null);
        console.log("After Insert:");
        console.log(result.ops);
        
        //Find and print all the documents
        collection.find({}).toArray(function(err,docs) {
            assert.equal(err,null);
            console.log("Found:");
            console.log(docs);
            
            db.dropCollection("dishes", function(err, result) {
                assert.equal(err, null);
                db.close();
            }); //end drop collection callback
        }); //end collection call back
    }); //end result call back
}); //End mongo client connect