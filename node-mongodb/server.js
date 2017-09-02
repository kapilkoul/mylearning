var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var dboper = require('./operations');

var url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, function(err, db) {
    assert.equal(err, null);
    console.log("Connected successfully to the server at " + url);
    
    dboper.insertDocument(db, {name: "Vadonut", description: "test"}, "dishes",
                         function (result) {
        console.log("Inserted document: ");
        console.log(result.ops);
        
        dboper.findDocuments(db, "dishes", function(docs) {
            console.log("Found: ")
            console.log(docs);
            
            dboper.updateDocument(db, {name:"Vadonut"}, {description: "Update Test"}, "dishes",
                                 function (result) {
                console.log("Updated:");
                console.log(result.result);
                
                dboper.findDocuments(db, "dishes", function(docs) {
                    console.log("Found updated:");
                    console.log(docs);
                    
                    db.dropCollection("dishes", function (result) {
                        console.log("Dropped:");
                        console.log(result);
                        
                        db.close();
                    }); //end drop collection
                }); //end find updated documents
            }); //end update document
        }); //find inserted document
    }); //end insert document
}); //end mongo connect