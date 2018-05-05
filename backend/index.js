/*
const app = require('./routes');

app.listen(3000, () => {
   console.log("Ready for connections");
});
*/

 
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));  

server.listen(3000);

var info = "hello";

app.get('/messages', function(req, res, next) {
    console.log('connected');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({ messages: [ {username: 'ani', text: info, date: 'now'}, {username: 'armine', text: 'Hi', date: 'now'} ] } );
});
