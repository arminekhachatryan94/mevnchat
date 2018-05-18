/*
const app = require('./routes');

app.listen(3000, () => {
   console.log("Ready for connections");
});
*/

/*
NOTES
ps ax | grep mongod // check if mongo instances are running
sudo kill -9 <processnumbr> // kill instance <processnumber>
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
const usersDB = 'users'; // users db name
const messagesDB = 'messages'; // messages db name

var moment = require('moment');

/*
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
  
    const db = client.db(messagesDB);
    removeMessage(db, function() {
        client.close();
    });
});
*/

/* MESSAGES TABLE FUNCTIONS */

/*
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
    collection.deleteOne( { sender : 'armine' }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n); // 1 document removed based on n
        console.log("Removed 1 message with the field username equal to ani");
        callback(result);
    });
}
*/

/* USERS FUNCTIONS */



/* PAGES & HTTP REQUESTS */

// login
app.post('/login', function(req, res) {
    var username=req.body.username;
    var password=req.body.password;
    console.log(username + " " + password);
    
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
            if( users.length == 1 && users[0].username == username && users[0].password == password ){
                // successfully logged in
                res.status(200).send(username);
                client.close();
            } else {
                res.status(401).send('Invalid credentials');
                client.close();
            }
        });
    });
});

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
                        res.status(200).send( username );
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

// get all users
app.get('/users', function(req, res) {
    // get all users
    var users;
    const findUsers = function(db, callback) {
        const collection = db.collection('documents');
        // no query filter
        collection.find({}).sort( {username: 1} )
        .toArray(function(err, docs) {
          assert.equal(err, null);
          users = docs;
          callback(docs);
        });
    }
    mongo.connect(url, function(err, client) {
        assert.equal(null, err);
      
        const db = client.db(usersDB);
        findUsers(db, function() {
            // send users
            res.status(200).send(users);
            client.close();
        });
    });
});

// create new message
io.on('connection', function(socket) {
    app.post('/newmessage', function(req, res) {
        var sender=req.body.sender;
        var recipient=req.body.recipient;
        var text=req.body.text;
        var r = "sender: " + sender + ", recipient: " + recipient + ", text: " + text;
        if( sender.length != 0 && recipient.length != 0 && text.length !== 0 ){
            // check if recipient exists
            let exists;
            const checkRecipient = function(db, callback) {
                // Get the documents collection
                const collection = db.collection('documents');
                // Find all documents (no query filter)
                collection.find({ username : recipient }).toArray(function(err, docs) {
                    assert.equal(err, null);
                    console.log("Found the following records: " + docs.length);
                    exists = (docs.length == 0 ? false : true);
                    callback(docs);
                });
            }

            const insertMessage = function(db, callback) {
                // Get the documents collection
                const collection = db.collection('documents');
                // Insert some documents
                collection.insertMany([
                    {
                        sender: sender,
                        recipient: recipient,
                        text: text,
                        date: (moment(new Date())).toString()
                    }
                ], function(err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.ops.length);
                    console.log("Inserted 1 message into the collection");
                    callback(result);
                });
            }

            mongo.connect(url, function(err, client) {
                assert.equal(null, err);
                const db = client.db(usersDB);
                const db2 = client.db(messagesDB);

                checkRecipient(db, function() {
                    if( exists ){
                        insertMessage(db2, function() {
                            res.status(200).send({});
                            io.emit('newmsg', {sender: sender, recipient: recipient, text: text});
                            client.close();
                        });
                    } else {
                        res.status(400).send("Recipient doesn't exist");
                        client.close();
                    }
                });
            });
        } else {
            res.status(400).send("Empty fields are invalid");
        }
    });
});


// get messages
app.get('/messages/:username', function(req, res) {
    var username = req.params.username;
    
    var messages;
    const findMessages = function(db, callback) {
        // Get the documents collection
        const collection = db.collection('documents');
        // Find all documents (no query filter)
        collection.find( { $or: [ { sender: username }, { recipient: username } ] } )
        .sort({ date: -1 }).limit(50)
        .toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records: " + docs.length);
            messages = docs;
            // console.log(messages);
            callback(docs);
        });
    }
    mongo.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
      
        const db = client.db(messagesDB);
        findMessages(db, function() {
            res.send({ messages: messages } );
            client.close();
        });
    });   
});

// find all conversation with distinct users
app.get('/convos/:username', function(req, res) {
    var username = req.params.username;

    var messages;
    const findConvos = function(db, callback) {
        // Get the documents collection
        const collection = db.collection('documents');
        // Find all documents (no query filter)
        collection.find( {
            $or: [
                { sender: username },
                { recipient: username }
        ]} )
        .sort({ date: -1 })
        .toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records: " + docs.length);
            messages = docs;
            callback(docs);
        });
    }

    var getUniques = function(messages, username){
        var newmsgs = [];
        var names = [];
        for( var i = 0; i < messages.length; i++ ){
            if( messages[i].recipient == username ){
                if( !(names.includes(messages[i].sender)) ){
                    names.push(messages[i].sender);
                    newmsgs.push(messages[i]);
                }
            } else if( messages[i].sender == username ){
                if( !(names.includes(messages[i].recipient)) ){
                    names.push(messages[i].recipient);
                    newmsgs.push(messages[i]);
                }
            }
        }
        return newmsgs;
    }

    mongo.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(messagesDB);
        findConvos(db, function() {
            var results = getUniques(messages, username);
            res.send({ messages: results } );
            client.close();
        });
    });
});

// get conversation with another user
app.get('/messages/:username/:user2', function(req, res) {
    /*
    username = logged in user
    user2 = who logged in user conversed with
    */
    var username = req.params.username;
    var user2 = req.params.user2;

    var messages;
    const findConversation = function(db, callback) {
        // Get the documents collection
        const collection = db.collection('documents');
        // Find all documents (no query filter)
        collection.find( {
            $or: [
                { $and: [
                    { sender: username },
                    { recipient: user2 } 
                ]},
                { $and: [
                    { sender: user2 },
                    { recipient: username }
                ]}
        ]} ).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records: " + docs.length);
            messages = docs;
            // console.log(messages);
            callback(docs);
        });
    }
    mongo.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(messagesDB);
        findConversation(db, function() {
            res.send({ messages: messages } );
            client.close();
        });
    });  
});

server.listen(3000);
