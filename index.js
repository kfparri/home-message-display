/*
 * Name: Home Message Display
 * 
 * Description: This is a simple app that I'm using as a simple
 *  app to learn about using socket.io and node.js
 * 
 * Author: Kyle Parrish
 * 
 * Changelog:
 *  2.27.2016 v0.0.1 - This is my frist build of the application
 *      it's little more than the getting started guild on socket.io's 
 *      website.    
 * */
 
 // Setup the required information, here we need express,
 //  http and socket.io to run the app
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// default get method
app.get('/', function(req, res){
    // instead of serving html from a string here, load
    //  up an html file from the root directory
    res.sendFile(__dirname + '/index.html');
});

// socket.io connection event.  This fires when a client connects
io.on('connection', function(socket){
    // log the user connect
    console.log('a user has connected');
    
    // whenever a 'chat message' is received, emit it to 
    //  all connected clients
    socket.on('chat message', function(msg){
        // emit the message back to the clients to display on 
        //  the page.
        io.emit('chat message', msg);
    });
    
    // socket.io disconnect event
    socket.on('disconnect', function(){
        // log it.
        console.log('user disconnected');
    });
});

// start the http server on port 3000
http.listen(3000, function(){
    console.log('listening on *:3000');
});

