/*
 Do not include in front end html. This is the backend server file that has to be run through node.js
 cmd: sudo node server.js
 this file runs on port 81
 */
var app = require('http').createServer(handler)
        , io = require('socket.io').listen(app)
        , fs = require('fs')

app.listen(81);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
            function(err, data) {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading index.html');
                }

                res.writeHead(200);
                res.end(data);
            });
}

io.sockets.on('connection', function(socket) {
    socket.on('news', function(msg) {
        socket.broadcast.emit('news', {data: msg.data});
    });
});
