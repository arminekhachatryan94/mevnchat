/*
const app = require('./routes');

app.listen(3000, () => {
   console.log("Ready for connections");
});
*/

// use express
var express = require('express');
var app = express();  
// use socket.io
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

// mongodb
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017'; // connection url
const dbName = 'myproject'; // db name
// connect method to connect to server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
    insertDocuments(db, function() {
        client.close();
    });
});

const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ username : 'ani' }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n); // 1 document removed based on n
        console.log("Removed 1 documents with the field username equal to ani");
        callback(result);
    });
}

var messages;
const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find all documents (no query filter)
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records: " + docs.length);
      messages = docs;
      callback(docs);
    });
}

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {
            username: 'ani',
            text: 'hello',
            date: 'now'
        }
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.ops.length);
      console.log("Inserted 1 document into the collection");
      callback(result);
    });
  }
  

app.use(express.static(__dirname + '/node_modules'));  

server.listen(3000);

app.get('/messages', function(req, res, next) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
      
        const db = client.db(dbName);
          findDocuments(db, function() {
              client.close();
          });
    });
    console.log('connected');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({ messages: messages } );
});
