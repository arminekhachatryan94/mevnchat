/*
const app = require('./routes');

app.listen(3000, () => {
   console.log("Ready for connections");
});
*/

// use express
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// date format
// var dateFormat = require('dateformat');

// use socket.io
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

// mongodb
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017'; // connection url
const usersDB = 'users';
const messagesDB = 'messages'; // db name

server.listen(3000);

const findUsers = function(db, callback) {
    const collection = db.collection('documents');
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records: " + docs.length);
        console.log(docs);
        callback(docs);
    });
}

const removeUsers = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ username : null }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n); // 1 document removed based on n
        console.log("Removed 1 message with the field username equal to ani");
        callback(result);
    });
}

mongo.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(usersDB);
    findUsers(db, function() {
        client.close();
    });
});

/* MESSAGES TABLE FUNCTIONS */
const insertMessages = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {
            username: 'ani',
            text: 'hello',
            date: new Date()
        }
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.ops.length);
        console.log("Inserted 1 message into the collection");
        callback(result);
    });
}

const removeMessage = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ username : 'ani' }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n); // 1 document removed based on n
        console.log("Removed 1 message with the field username equal to ani");
        callback(result);
    });
}

var messages;
const findMessages = function(db, callback) {
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

/* USERS FUNCTIONS */



/* PAGES & HTTP REQUESTS */

/*
// login
app.get('/login', function(req, res) {
    ;
});
*/

// register
app.post('/register', (req, res) => {
    var username=req.body.username;
    var password=req.body.password;
    console.log("username: " + username + ", password: " + password);

    var users;
    const findUser = function(db, callback) {
        const collection = db.collection('documents');
        collection.find(
            { username : username }
        ).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records: " + docs.length);
            users = docs;
            callback(docs);
        });
    }

    mongo.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
      
        const db = client.db(usersDB);
        findUser(db, function() {
            if( users.length == 0 ){
                // create new user
                const insertUser = function(db, callback) {
                    // Get the documents collection
                    const collection = db.collection('documents');
                    // Insert some documents
                    collection.insertMany([
                        {
                            username: username,
                            password: password
                        }
                    ], function(err, result) {
                        assert.equal(err, null);
                        assert.equal(1, result.ops.length);
                        console.log("Inserted 1 message into the collection");
                        callback(result);
                    });
                }
                if( username.length != 0 || password.length != 0 ){
                    // insertUser
                    insertUser(db, function() {
                        res.status(200).send( 'Successfully created user.' );
                        client.close();
                    });
                }
                else {
                    res.status(401).send( 'Empty input is invalid.' );
                    client.close();
                }
            } else {
                // user exists
                res.status(401).send( 'Username already exists.' );
                client.close();
            }
        });
    });
});

// messages
app.get('/messages', function(req, res) {
    // add socket code here?
    mongo.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
      
        const db = client.db(messagesDB);
        findMessages(db, function() {
            client.close();
        });
    });
    console.log('connected');
    res.send({ messages: messages } );
});
