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

    //Initial Setup of indicator light
    let clicks = 0;

    socket.on('countclick', () => {
        console.log('reached click function')
        if(clicks % 2 == 0){
            socketIO.sockets.emit('disable_p2');
            socketIO.sockets.emit('p1turncheckgreen', {r:0, g:255, b:0}),
            socketIO.sockets.emit('p2turncheckred', {r:255, g:0, b:0}),
            console.log('%2 == 0')
        } else if (clicks % 2 == 1){
            socketIO.sockets.emit('enable_p2')
            socketIO.sockets.emit('p2turncheckgreen', {r:0, g:255, b:0}),
            socketIO.sockets.emit('p1turncheckred', {r:255, g:0, b:0}),
            console.log('%2 == 1')
        }
        clicks ++; 
    })

    //p2 handlers
    socket.on('red1', (data) => {
        console.log('emitting')
        socketIO.sockets.emit('color_red1', {r:240, g:0, b:0})
    })
    socket.on('red2', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_red2', {r:240, g:0, b:0})
    })
    socket.on('red3', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_red3', {r:240, g:0, b:0})
    })
    socket.on('red4', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_red4', {r:240, g:0, b:0})
    })
    socket.on('red5', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_red5', {r:240, g:0, b:0})
    })
    socket.on('red6', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_red6', {r:240, g:0, b:0})
    })
    socket.on('red7', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_red7', {r:240, g:0, b:0})
    })
    socket.on('red8', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_red8', {r:240, g:0, b:0})
    })
    socket.on('red9', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_red9', {r:240, g:0, b:0})
    })

    //p1 handlers
    socket.on('blue1', (data) => {
        socketIO.sockets.emit('color_blue1', {r:0, g:0, b:255})
    })
    socket.on('blue2', (data) => {
        socketIO.sockets.emit('color_blue2', {r:0, g:0, b:255})
    })
    socket.on('blue3', (data) => {
        socketIO.sockets.emit('color_blue3', {r:0, g:0, b:255})
    })
    socket.on('blue4', (data) => {
        socketIO.sockets.emit('color_blue4', {r:0, g:0, b:255})
    })
    socket.on('blue5', (data) => {
        socketIO.sockets.emit('color_blue5', {r:0, g:0, b:255})
    })
    socket.on('blue6', (data) => {
        socketIO.sockets.emit('color_blue6', {r:0, g:0, b:255})
    })
    socket.on('blue7', (data) => {
        socketIO.sockets.emit('color_blue7', {r:0, g:0, b:255})
    })
    socket.on('blue8', (data) => {
        socketIO.sockets.emit('color_blue8', {r:0, g:0, b:255})
    })
    socket.on('blue9', (data) => {
        socketIO.sockets.emit('color_blue9', {r:0, g:0, b:255})
    })

    //Winner logic
    socket.on('p1winner', (data) => {
        
    })

    socket.on('p2winner', (data) => {

    })
});

//start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);