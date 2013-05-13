/*
 Do not include in front end html. This is the backend server file that has to be run through node.js
 cmd: sudo node server.js
 this file runs on port 81
 */
var app = require('http').createServer();
var io = require('socket.io').listen(app);

app.listen(81);

io.sockets.on('connection', function(socket) {
    socket.on('news', function(msg) {
        socket.broadcast.emit('news', {data: msg.data});
    });

    socket.on('ds', function(msg) {
        socket.broadcast.emit('ds', {data: msg.data});
    });

});
