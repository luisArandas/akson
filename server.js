const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 5000);
const portfinder = require('portfinder');

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

  socket.on('changeStream', streamState);

  function streamState(data) {
    socket.broadcast.emit('changeStream', data);
  }

  socket.on('uiSocketSynthVolume', streamUi01);
  socket.on('uiSocketBackgroundVolume', streamUi02);
  socket.on('uiSocketMainVolume', streamUi03);
  socket.on('uiSocketSynthAttack', streamUi04);
  socket.on('uiSocketSynthDecay', streamUi05);
  socket.on('uiSocketSynthSustain', streamUi06);
  socket.on('uiSocketSynthRelease', streamUi07);
  socket.on('uiSocketHarmonicity', streamUi08);
  socket.on('uiSocketModulationIndex', streamUi09);
  socket.on('uiSocketDetune', streamUi10);
  socket.on('uiSocketOscillatorModulationIndex', streamUi11);
  socket.on('uiSocketOscillatorHarmonicity', streamUi12);
  socket.on('uiSocketModulationEnvelopeAttack', streamUi13);
  socket.on('uiSocketModulationEnvelopeDecay', streamUi14);
  socket.on('uiSocketModulationEnvelopeSustain', streamUi15);
  socket.on('uiSocketModulationEnvelopeRelease', streamUi16);
  socket.on('uiSocketReverbRoomSize', streamUi17);
  socket.on('uiSocketReverbWetValue', streamUi18);
  socket.on('uiSocketReverbDampValue', streamUi19);
  socket.on('uiSocketNoiseOnePlaybackRate', streamUi20);
  socket.on('uiSocketAutoFilterFrequency', streamUi21);
  socket.on('uiSocketNoiseOneMin', streamUi22);
  socket.on('uiSocketNoiseOneMax', streamUi23);
  socket.on('uiSocketNoiseOneWet', streamUi24);
  socket.on('uiSocketNoiseOneDepth', streamUi25);
  socket.on('uiSocketNoiseQ', streamUi26);
  socket.on('uiSocketNoiseOctaves', streamUi27);
  socket.on('uiSocketAfBaseFrequency', streamUi28);
  socket.on('uiSocketEqBass', streamUi29);
  socket.on('uiSocketEqMid', streamUi30);
  socket.on('uiSocketEqHigh', streamUi31);
  socket.on('uiSocketEqLowFreq', streamUi32);
  socket.on('uiSocketEqHighFreq', streamUi33);

  function streamUi01(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketSynthVolume', data);
  }

  function streamUi02(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketBackgroundVolume', data);
  }

  function streamUi03(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketMainVolume', data);
  }

  function streamUi04(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketSynthAttack', data);
  }

  function streamUi05(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketSynthDecay', data);
  }

  function streamUi06(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketSynthSustain', data);
  }

  function streamUi07(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketSynthRelease', data);
  }

  function streamUi08(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketHarmonicity', data);
  }

  function streamUi09(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketModulationIndex', data);
  }

  function streamUi10(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketDetune', data);
  }

  function streamUi11(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketOscillatorModulationIndex', data);
  }

  function streamUi12(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketOscillatorHarmonicity', data);
  }

  function streamUi13(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketModulationEnvelopeAttack', data);
  }

  function streamUi14(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketModulationEnvelopeDecay', data);
  }

  function streamUi15(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketModulationEnvelopeSustain', data);
  }

  function streamUi16(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketModulationEnvelopeRelease', data);
  }

  function streamUi17(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketReverbRoomSize', data);
  }

  function streamUi18(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketReverbWetValue', data);
  }

  function streamUi19(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketReverbDampValue', data);
  }

  function streamUi20(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoiseOnePlaybackRate', data);
  }

  function streamUi21(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketAutoFilterFrequency', data);
  }

  function streamUi22(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoiseOneMin', data);
  }

  function streamUi23(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoiseOneMax', data);
  }

  function streamUi24(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoiseOneWet', data);
  }

  function streamUi25(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoiseOneDepth', data);
  }

  function streamUi26(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoiseQ', data);
  }

  function streamUi27(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoiseOctaves', data);
  }

  function streamUi28(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketAfBaseFrequency', data);
  }

  function streamUi29(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketEqBass', data);
  }

  function streamUi30(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketEqMid', data);
  }

  function streamUi31(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketEqHigh', data);
  }

  function streamUi32(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketEqLowFreq', data);
  }

  function streamUi33(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketEqHighFreq', data);
  }

  socket.on('oscTest', oscMessage);

  function oscMessage(data) {
    console.log("forOsc");
  }

  socket.on('noiseWaveType', noiseWaveType);

  function noiseWaveType(data) {
    socket.broadcast.emit('noiseWaveType', data);
  }

  socket.on('noiseRoloffType', noiseRoloffType);

  function noiseRoloffType(data) {
    socket.broadcast.emit('noiseRoloffType', data);
  }

  socket.on('autoFilterWaveType', autoFilterWaveType);

  function autoFilterWaveType(data) {
    socket.broadcast.emit('autoFilterWaveType', data);
  }

  socket.on('noiseOneFrequencyTimeNumber', noiseOneFrequencyTimeNumber);

  function noiseOneFrequencyTimeNumber(data) {
    socket.broadcast.emit('noiseOneFrequencyTimeNumber', data);
  }

  socket.on('synthWaveType', synthWaveType);

  function synthWaveType(data) {
    socket.broadcast.emit('synthWaveType', data);
  }

  socket.on('noisePartialCount', noisePartialCount);

  function noisePartialCount(data) {
    socket.broadcast.emit('noisePartialCount', data);
  }

  socket.on('send message', function(data) {
    var oscNum = Math.random();
    var oscMap = '/composition/video/effect3/opacity/values ' + oscNum;
    client.send('/composition/video/effect3/opacity/values', oscNum);
    console.log(oscMap);
  });
}

portfinder.getPort(function(err, port) {
  console.log("Using " + port);
});

// Configures each link to a different page.
// e.g. localhost:3000/   will load index.html
// e.g. localhost:3000/led    will load led.html
//app.get('/', function(req, res) {
//    res.sendFile(__dirname + '/public/index.html');
//});