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

var counter = 0;
var history = new Array();

// default get method
app.get('/', function(req, res){
    // instead of serving html from a string here, load
    //  up an html file from the root directory
    res.sendFile(__dirname + '/client.html');
    console.log('connecting a client');
});

app.get('/server', function(req, res){
    // send out the index.html file which will act as the server
    res.sendFile(__dirname + '/index.html');
    console.log('connecting a server');
});

// socket.io connection event.  This fires when a client connects
io.on('connection', function(socket){
    // log the user connect
    console.log('a user has connected');
    
    // this is the first time this user has shown up, load the history.
    history.forEach(function(item){
        socket.emit('chat message', item);    
    });
    
    //socket.emit('chat message', { msg: 'welcome!', size: 'normal' });
    
    // whenever a 'chat message' is received, emit it to 
    //  all connected clients
    socket.on('chat message', function(msg){
        // emit the message back to the clients to display on 
        //  the page.
        if(msg.msg == '/clear')
        {
            history = new Array();
        }
        {
            history.push(msg);
        }
        io.emit('chat message', msg);
    });
    
    // socket.io disconnect event
    socket.on('disconnect', function(){
        // log it.
        console.log('user disconnected');
    });
});

console.log('starting the time send');

// Send a packet every second with the current date and time, to let users know the page is loading
setInterval(function() {
     tmp = new Date();
    //console.log('updating the time with: ' + tmp);
    
    io.emit('timer', tmp);
}, 1000);
    
// start the http server on port 3000
http.listen(3000, function(){
    console.log('listening on *:3000');
});


