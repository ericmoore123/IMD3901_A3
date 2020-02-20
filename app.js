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

    let clicks = 0;
    socket.on('countclick', () => {
        if(clicks % 2 == 0){
            socketIO.sockets.emit('p1turncheckgreen', {r:0, g:255, b:0});
            socketIO.sockets.emit('p2turncheckred', {r:255, g:0, b:0});
        } else if (clicks % 2 == 1){
            socketIO.sockets.emit('p2turncheckgreen', {r:0, g:255, b:0});
            socketIO.sockets.emit('p1turncheckred', {r:255, g:0, b:0});
        }
        clicks ++; 
    })

    // socket.on('p1green', (data) => {
    //     console.log('p1green event')
    //     socketIO.sockets.emit('p1turncheckgreen', {r:0, g:255, b:0}) //green
    // })

    // socket.on('p1red', (data) => {
    //     console.log('p1red event')
    //     socketIO.sockets.emit('p1turncheckred', {r:255, g:0, b:0})
    // })

    // socket.on('p2green', (data) => {
    //     console.log('p2green event')
    //     socketIO.sockets.emit('p2turncheckgreen', {r:0, g:255, b:0}) //green
    // })

    // socket.on('p2red', (data) => {
    //     console.log('p2red event')
    //     socketIO.sockets.emit('p2turncheckred', {r:255, g:0, b:0})
    // })


    socket.on('red1', (data) => {
        console.log('emitting')
        socketIO.sockets.emit('color_change1', {r:255, g:0, b:0})
    })
    socket.on('red2', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_change2', {r:255, g:0, b:0})
    })
    socket.on('red3', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_change3', {r:255, g:0, b:0})
    })
    socket.on('red4', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_change4', {r:255, g:0, b:0})
    })
    socket.on('red5', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_change5', {r:255, g:0, b:0})
    })
    socket.on('red6', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_change6', {r:255, g:0, b:0})
    })
    socket.on('red7', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_change7', {r:255, g:0, b:0})
    })
    socket.on('red8', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_change8', {r:255, g:0, b:0})
    })
    socket.on('red9', (data) => {
        console.log(data)
        socketIO.sockets.emit('color_change9', {r:255, g:0, b:0})
    })

    socket.on('blue', (data) => {
        console.log('Blue event trigger')
        socketIO.sockets.emit('color_change', {r:0, g:0, b:255})
    })
});

//start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);