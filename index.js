var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    //res.send('<h1>Hello World</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    //socket.broadcast.emit('A user has joined');
    
    console.log('a user has connected');
    
    socket.on('chat message', function(msg){
        //console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

