var express = require('express');
var app = express();
var server = app.listen(5000);

app.use(express.static('public'))

console.log("Porta 5000");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log("new connection: " + socket.id);

  //ao conectar (na função newConnection, e se receberes algo chamado 'mouse' faz a funcao mouseMsg)
  socket.on('mouse', mouseMsg);
  //next work would be make another socket.on function

  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data);
    //goes to everyone including the actual client
    //io.sockets.emit('mouse', data);
    console.log(data);
  }
}