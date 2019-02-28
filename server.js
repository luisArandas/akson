var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 5000);

app.use(express.static('public'))

console.log("It's running Akson Environment on port 5000.");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

var connections = 0;

//https://github.com/guergana/socket-tone/blob/master/index.js
//https://github.com/zoutepopcorn/audio_socket/blob/master/html/index.html

function newConnection(socket) {
  connections++;
  console.log("new connection: " + socket.id);
  console.log("There are currently " + connections + " connections");
  var socketid = socket.id;
  socket.broadcast.emit('socketid', socket.id);
  socket.broadcast.emit('socketnumber', connections);

  //ao conectar (na função newConnection, e se receberes algo chamado 'mouse' faz a funcao mouseMsg)
  //enviar só numeros <- {object, object}

  socket.on('mouse', mouseMsg);

  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data);
    //goes to everyone including the actual client
    //io.sockets.emit('mouse', data);
    console.log(data);
    //MUST RESTART THE SERVER
  }
  socket.on('disconnect', function() {
    connections--;
    console.log("There are currently " + connections + " connections");
  });

  socket.on('scene', mobileScene);

  function mobileScene(data) {
    socket.broadcast.emit('scene', data);
    console.log(data);
  }

  socket.on('uisocket', streamUi);

  function streamUi(data) {
    console.log(data);
    socket.broadcast.emit('uisocket', data);
  }
}