const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //Socket io initialization

const LISTEN_PORT = 8080;

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/player1', (req, res) => {
    res.sendFile(__dirname + '/public/player1.html')
})

app.get('/player2', function(req,res) {
    res.sendFile(__dirname + '/public/player2.html');
});

//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
    });

    //custom events handled by server

    socket.on('p1green', (data) => {
        console.log('p1green event')
        socketIO.sockets.emit('p1turncheckgreen', {}) //green
    })

    socket.on('p1red', (data) => {
        console.log('p1red event')
        socketIO.sockets.emit('p1turncheckred', {})
    })

    socket.on('p2green', (data) => {
        console.log('p2green event')
        socketIO.sockets.emit('p2turncheckgreen', {}) //green
    })

    socket.on('p2red', (data) => {
        console.log('p2red event')
        socketIO.sockets.emit('p2turncheckred', {})
    })

    socket.on('red', (data) => {
        console.log('Red event trigger')
        socketIO.sockets.emit('color_change', {r:255, g:0, b:0})
    })

    socket.on('blue', (data) => {
        console.log('Blue event trigger')
        socketIO.sockets.emit('color_change', {r:0, g:0, b:255})
    })
});

//start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);