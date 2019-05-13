const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 5000);
//const portfinder = require('portfinder');

app.use(express.static('public'));

console.log("It's running Akson Environment on port 5000.");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

var connections = 0;

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

  socket.on('uiSocketSynthPhase', streamUi34);
  socket.on('uiSocketSynthPartials', streamUi35);

  socket.on('uiSocketNoiseFilterGain', streamUi36);
  socket.on('uiSocketSynthVibratoFreq', streamUi37);
  socket.on('uiSocketSynthVibratoDep', streamUi38);
  socket.on('uiSocketSynthVibratoWet', streamUi39);
  socket.on('uiSocketNoisePhaserFreq', streamUi40);
  socket.on('uiSocketNoisePhaserOct', streamUi41);
  socket.on('uiSocketNoisePhaserWet', streamUi42);
  socket.on('uiSocketNoisePhaserQ', streamUi43);
  socket.on('uiSocketNoisePhaserBaseFreq', streamUi44);
  socket.on('uiSocketNoiseJcverbRoom', streamUi45);
  socket.on('uiSocketNoiseJcverbWet', streamUi46);
  socket.on('uiSocketFlipPhaseButton', streamUi47);

  //Graphs Sokets

  socket.on('uiSocketLightOne', streamUi48);
  socket.on('uiSocketLightTwo', streamUi49);
  socket.on('uiSocketLightThree', streamUi50);
  socket.on('uiSocketLightFour', streamUi51);
  socket.on('uiSocketCameraM1', streamUi52);
  socket.on('uiSocketCameraM2', streamUi53);
  socket.on('uiSocketCameraM3', streamUi54);
  socket.on('uiSocketCameraM4', streamUi55);
  socket.on('uiSocketCameraM5', streamUi56);
  socket.on('uiSocketCameraM6', streamUi57);
  socket.on('uiSocketCameraM7', streamUi58);
  socket.on('uiSocketCameraM8', streamUi59);
  socket.on('uiSocketCameraM9', streamUi60);
  socket.on('uiSocketCameraM10', streamUi61);
  socket.on('uiSocketCameraM11', streamUi62);

  socket.on('uiSocketKillScene', streamUi63);
  socket.on('uiSocketBornScene', streamUi64);

  socket.on('uiSocketScene1', streamUi65);
  socket.on('uiSocketScene2', streamUi66);
  socket.on('uiSocketScene3', streamUi67);
  socket.on('uiSocketScene4', streamUi68);
  socket.on('uiSocketScene5', streamUi69);
  socket.on('uiSocketScene6', streamUi70);
  socket.on('uiSocketScene7', streamUi71);
  socket.on('uiSocketScene8', streamUi72);
  socket.on('uiSocketScene9', streamUi73);
  socket.on('uiSocketScene10', streamUi74);
  socket.on('uiSocketScene11', streamUi75);
  socket.on('uiSocketScene12', streamUi76);

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

  /* Here */

  function streamUi34(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketSynthPhase', data);
  }

  function streamUi35(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketSynthPartials', data);
  }

  function streamUi36(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoiseFilterGain', data);
  }

  function streamUi37(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketSynthVibratoFreq', data);
  }

  function streamUi38(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketSynthVibratoDep', data);
  }

  function streamUi39(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketSynthVibratoWet', data);
  }

  function streamUi40(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoisePhaserFreq', data);
  }

  function streamUi41(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoisePhaserOct', data);
  }

  function streamUi42(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoisePhaserWet', data);
  }

  function streamUi43(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoisePhaserQ', data);
  }

  function streamUi44(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoisePhaserBaseFreq', data);
  }

  function streamUi45(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoiseJcverbRoom', data);
  }

  function streamUi46(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketNoiseJcverbWet', data);
  }

  function streamUi47(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketFlipPhaseButton', data);
  }

  function streamUi48(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketLightOne', data);
  }

  function streamUi49(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketLightTwo', data);
  }

  function streamUi50(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketLightThree', data);
  }

  function streamUi51(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketLightFour', data);
  }

  function streamUi52(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketCameraM1', data);
  }

  function streamUi53(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketCameraM2', data);
  }

  function streamUi54(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketCameraM3', data);
  }

  function streamUi55(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketCameraM4', data);
  }

  function streamUi56(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketCameraM5', data);
  }

  function streamUi57(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketCameraM6', data);
  }

  function streamUi58(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketCameraM7', data);
  }

  function streamUi59(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketCameraM8', data);
  }

  function streamUi60(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketCameraM9', data);
  }

  function streamUi61(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketCameraM10', data);
  }

  function streamUi62(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketCameraM11', data);
  }

  function streamUi63(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketKillScene', data);
  }

  function streamUi64(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketBornScene', data);
  }

  function streamUi65(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketScene1', data);
  }

  function streamUi66(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketScene2', data);
  }

  function streamUi67(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketScene3', data);
  }

  function streamUi68(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketScene4', data);
  }

  function streamUi69(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketScene5', data);
  }

  function streamUi70(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketScene6', data);
  }

  function streamUi71(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketScene7', data);
  }

  function streamUi72(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketScene8', data);
  }

  function streamUi73(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketScene9', data);
  }

  function streamUi74(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketScene10', data);
  }

  function streamUi75(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketScene11', data);
  }

  function streamUi76(data) {
    console.log(data);
    socket.broadcast.emit('uiSocketScene12', data);
  }


  socket.on('oscTest', oscMessage);

  function oscMessage(data) {
    console.log("Getting OSC Here");
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

}

/*portfinder.getPort(function(err, port) {
  console.log("Using port: " + port + " for OSC;");
});*/

// Configures each link to a different page.
// e.g. localhost:3000/   will load index.html
// e.g. localhost:3000/led    will load led.html
//app.get('/', function(req, res) {
//    res.sendFile(__dirname + '/public/index.html');
//});
