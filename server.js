/**
 * @author Luis Arandas ; http://luisarandas.org
 * @author José Alberto Gomes ; http://jasg.net/Home.html
 * @author Rui Penha ; http://ruipenha.pt/
 *
 *  All this code was done under the context of a research
 *  between Braga Media Arts and the University of Porto © 2019
 */

const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 5000);
app.use(express.static('public'));

//const portfinder = require('portfinder');
console.log("It's running Akson Environment on port 5000");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

var connections = 0;

function newConnection(socket) {

  console.log("New " + io.sockets.clients());
  connections++;
  console.log("New Connection: " + socket.id);
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
}
