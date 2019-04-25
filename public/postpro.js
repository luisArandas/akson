/* Graphics Post Production */

var w = window.innerWidth;
var h = window.innerHeight;
var fullWidth = w * 3;
var fullHeight = h * 2;

var light1 = new Nexus.Slider('#light1', {
  'size': [191, 20],
  'mode': 'absolute', // "absolute" or "relative"
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': -15
});
light1.on('change', function(e) {
  lightOne.intensity = e; //todas
  var data = {
    x: e,
    y: "lightOne"
  };
  socket.emit('uiSocketLightOne', data);
  var _v = e.toFixed(2);
  document.getElementById('n40').innerHTML = _v;
});

var light2 = new Nexus.Slider('#light2', {
  'size': [191, 20],
  'mode': 'absolute', // "absolute" or "relative"
  'min': 0,
  'max': 6,
  'step': 0.001,
  'value': 0.1
});
light2.on('change', function(e) {
  lightTwo.intensity = e;
  var data = {
    x: e,
    y: "lightTwo"
  };
  socket.emit('uiSocketLightTwo', data);
  var _v = e.toFixed(2);
  document.getElementById('n41').innerHTML = _v;
});

var light3 = new Nexus.Slider('#light3', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': 1
});
light3.on('change', function(e) {
  lightThree.intensity = e;
  var data = {
    x: e,
    y: "lightThree"
  };
  socket.emit('uiSocketLightThree', data);
  var _v = e.toFixed(2);
  document.getElementById('n42').innerHTML = _v;
});

var light4 = new Nexus.Slider('#light4', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': 1
});
light4.on('change', function(e) {
  lightFour.intensity = e;
  var data = {
    x: e,
    y: "lightFour"
  };
  socket.emit('uiSocketLightFour', data);
  var _v = e.toFixed(2);
  document.getElementById('n43').innerHTML = _v;
});

var cameraM1 = new Nexus.Slider('#cameraM1', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': -170,
  'max': 170,
  'step': 0.001,
  'value': 80
});
cameraM1.on('change', function(e) {
  camera.fov = e;
  console.log(camera.fov);
  camera.updateProjectionMatrix();
  var data = {
    x: e,
    y: "cameraM1"
  };
  socket.emit('uiSocketCameraM1', data);
  var _v = e.toFixed(2);
  document.getElementById('n46').innerHTML = _v;
});

var cameraM2 = new Nexus.Slider('#cameraM2', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0,
  'max': 2,
  'step': 0.001,
  'value': 1
});
cameraM2.on('change', function(e) {
  camera.zoom = e;
  console.log(camera.zoom);
  camera.updateProjectionMatrix();
  var data = {
    x: e,
    y: "cameraM2"
  };
  socket.emit('uiSocketCameraM2', data);
  var _v = e.toFixed(2);
  document.getElementById('n45').innerHTML = _v;
});

var cameraM3 = new Nexus.Slider('#cameraM3', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0,
  'max': 5,
  'step': 0.0001,
  'value': 1
});
cameraM3.on('change', function(e) {
  /* See this!!! */
  camera.aspect = e;
  camera.updateProjectionMatrix();
  var data = {
    x: e,
    y: "cameraM3"
  };
  socket.emit('uiSocketCameraM3', data);
  var _v = e.toFixed(2);
  document.getElementById('n44').innerHTML = _v;
});

var cameraM4 = new Nexus.Slider('#cameraM4', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 1,
  'max': 2000,
  'step': 0.001,
  'value': 1
});
cameraM4.on('change', function(e) {
  camera.near = e;
  camera.updateProjectionMatrix();
  var data = {
    x: e,
    y: "cameraM4"
  };
  socket.emit('uiSocketCameraM4', data);
  var _v = e.toFixed(2);
  document.getElementById('n47').innerHTML = _v;
});

var cameraM5 = new Nexus.Slider('#cameraM5', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0,
  'max': 5000,
  'step': 1,
  'value': 1000
});
cameraM5.on('change', function(e) {
  camera.setViewOffset(e, fullHeight, w * 1, h * 0, w, h);
  camera.updateProjectionMatrix();
  var data = {
    x: e,
    y: "cameraM5"
  };
  socket.emit('uiSocketCameraM5', data);
  var _v = e.toFixed(0);
  document.getElementById('n60').innerHTML = _v;
});

var cameraM6 = new Nexus.Slider('#cameraM6', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0,
  'max': 5000,
  'step': 1,
  'value': 1000
});
cameraM6.on('change', function(e) {
  camera.setViewOffset(fullWidth, e, w * 1, h * 0, w, h);
  camera.updateProjectionMatrix();
  var data = {
    x: e,
    y: "cameraM6"
  };
  socket.emit('uiSocketCameraM6', data);
  var _v = e.toFixed(0);
  document.getElementById('n61').innerHTML = _v;
});

var cameraM7 = new Nexus.Slider('#cameraM7', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': 1
});
cameraM7.on('change', function(e) {
  camera.setViewOffset(fullWidth, fullHeight, w * e, h * 0, w, h);
  camera.updateProjectionMatrix();
  var data = {
    x: e,
    y: "cameraM7"
  };
  socket.emit('uiSocketCameraM7', data);
  var _v = e.toFixed(2);
  document.getElementById('n62').innerHTML = _v;
});

var cameraM8 = new Nexus.Slider('#cameraM8', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': 1
});
cameraM8.on('change', function(e) {
  camera.setViewOffset(fullWidth, fullHeight, w * 1, h * e, w, h);
  camera.updateProjectionMatrix();
  var data = {
    x: e,
    y: "cameraM8"
  };
  socket.emit('uiSocketCameraM8', data);
  var _v = e.toFixed(2);
  document.getElementById('n63').innerHTML = _v;
});

var cameraM9 = new Nexus.Slider('#cameraM9', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': -5,
  'max': 5,
  'step': 0.001,
  'value': 0
});
cameraM9.on('change', function(e) {
  camera.setViewOffset(fullWidth, fullHeight, w * e, h * 0, fullWidth, fullHeight);
  camera.updateProjectionMatrix();
  var data = {
    x: e,
    y: "cameraM9"
  };
  socket.emit('uiSocketCameraM9', data);
  var _v = e.toFixed(2);
  document.getElementById('n64').innerHTML = _v;
});

var cameraM10 = new Nexus.Slider('#cameraM10', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': -5,
  'max': 5,
  'step': 0.001,
  'value': 0
});
cameraM10.on('change', function(e) {
  camera.setViewOffset(fullWidth, fullHeight, w * 0, h * e, fullWidth, fullHeight);
  camera.updateProjectionMatrix();
  var data = {
    x: e,
    y: "cameraM10"
  };
  socket.emit('uiSocketCameraM10', data);
});



function camOffsetDefault(a) {
  var data = {
    x: a,
    y: "cameraM11"
  };
  socket.emit('uiSocketCameraM11', data);

  if (a === 'set1') {
    camera.setViewOffset(fullWidth, fullHeight, w * 1, h * 0, w, h);
  }
  if (a === 'set2') {
    camera.setViewOffset(fullWidth, fullHeight, w * 0, h * 0, w, h);
  }
  if (a === 'set3') {
    camera.setViewOffset(fullWidth, fullHeight, w * 2, h * 0, w, h);
  }
  if (a === 'set4') {
    camera.setViewOffset(fullWidth, fullHeight, w * 0, h * 1, w, h);
  }
  if (a === 'set5') {
    camera.setViewOffset(fullWidth, fullHeight, w * 1, h * 1, w, h);
  }
  if (a === 'set6') {
    camera.setViewOffset(fullWidth, fullHeight, w * 2, h * 1, w, h);
  }
  if (a === 'clear') {
    camera.clearViewOffset();
  }
}

/* Net Info */

var a1 = "Effective Bandwidth Estimate: " + navigator.connection.downlink + " MB/s" + '<br>';
var a2 = "Max Download Speed: " + navigator.connection.downlinkMax + " MB/s" + '<br>';
var a3 = "Effective Connection Type: " + navigator.connection.effectiveType + " MB/s" + '<br>';
var a4 = "Estimated Effective Round-Trip: " + navigator.connection.rtt + ", rounded to the nearest multiple of 25 milliseconds" + '<br>';
var a5 = "Network Connection Type: " + navigator.connection.type + '<br>';
var a6 = "Device Language: " + navigator.language || navigator.userLanguage;

/* Audio Info */

var a7 = "AudioContext BaseLantency: " + Tone.context.baseLantency + '<br>';
var a9 = "AudioContext Channel Count: " + Tone.context.destination.channelCount + '<br>';
var a10 = "AudioContext Channel CountMode: " + Tone.context.destination.channelCountMode + '<br>';
var a11 = "AudioContext ChannelInterpretation: " + Tone.context.destination.channelInterpretation + '<br>';
var a12 = "AudioContext Inputs: " + Tone.context.destination.numberOfInputs + '<br>';
var a13 = "AudioContext SampleRate: " + Tone.context.sampleRate + '<br>';
var a14 = "AudioContext State: " + Tone.context.state + '<br>';

/* Graphics Info */
canvas = document.getElementById("glcanvas");
var gl = canvas.getContext("experimental-webgl");

var a15 = "Device Screen Width: " + screen.width + "<br>";
var a16 = "Device Screen Height: " + screen.height + "<br>";
var a17 = "Device Screen AvailWidth: " + screen.availWidth + "<br>";
var a18 = "Device Screen AvailHeight: " + screen.availHeight + "<br>";
var a19 = "Device Screen ColorDepth: " + screen.colorDepth + "<br>";
var a20 = "Device Screen PixelDepth: " + screen.pixelDepth + "<br>";
var a21 = "GL Renderer: " + gl.getParameter(gl.RENDERER) + '<br>';
var a22 = "GL Vendor: " + gl.getParameter(gl.VENDOR) + '<br>';
var a23 = "User Agent: " + navigator.userAgent + "<br>";
var a24 = "Platform Vendor: " + navigator.vendor + "<br>";
var a25 = "Platform ProductSub: " + navigator.productSub + "<br>";
var a26 = "Platform: " + navigator.platform + "<br>";
var a27 = "Navigator Languages: " + navigator.languages + "<br>";

function camNear(a) {
  if (a === 'kill') {
    camera.near = 0;
    camera.updateProjectionMatrix();
    Tone.Master.mute = true;
    var e = a;
    socket.emit('uiSocketKillScene', e);
  }
  if (a === 'born') {
    camera.near = 1;
    camera.updateProjectionMatrix();
    Tone.Master.mute = false;
    var e = a;
    socket.emit('uiSocketBornScene', e);
  }
  if (a === 'about') {
    var netinfo = "Network Info <br>";
    var _netinfo = netinfo.fontsize(15);
    var audioinfo = "<br> <br>Audio Info <br>";
    var _audioinfo = audioinfo.fontsize(15);
    var graphicsinfo = "<br> Graphics Info <br>";
    var _graphicsinfo = graphicsinfo.fontsize(15);

    document.getElementById('machineInfo').innerHTML += _netinfo + a1 + a2 + a3 + a4 + a5 + a6 + audioinfo + a7 + a9 + a10 + a11 + a12 + a13 + a14 + graphicsinfo + a15 + a16 + a17 + a18 + a19 + a20 + a21 + a22 + a23 + a24 + a25 + a26 + a27;
    WUI_Dialog.open("about_this_dialog");
  }
}

/* PostPro */

var camera1_1 = new Nexus.Slider('#camera1_1', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera1_1.on('change', function(e) {
  parentTransform.scale.x = e;
  var data = {
    x: e,
    y: "cameraScene1"
  };
  socket.emit('uiSocketScene1', data);
  var _v = e.toFixed(2);
  document.getElementById('n48').innerHTML = _v;
});

var camera1_2 = new Nexus.Slider('#camera1_2', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera1_2.on('change', function(e) {
  parentTransform.scale.y = e;
  var data = {
    x: e,
    y: "cameraScene2"
  };
  socket.emit('uiSocketScene2', data);
  var _v = e.toFixed(2);
  document.getElementById('n49').innerHTML = _v;
});

var camera1_3 = new Nexus.Slider('#camera1_3', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera1_3.on('change', function(e) {
  parentTransform.scale.z = e;
  var data = {
    x: e,
    y: "cameraScene3"
  };
  socket.emit('uiSocketScene3', data);
  var _v = e.toFixed(2);
  document.getElementById('n50').innerHTML = _v;
});

document.getElementById("cockpit_dialog").addEventListener("mouseenter", function() {
  mouseDown = 0;
});
document.getElementById("cockpit_dialog").addEventListener("mouseout", function() {
  mouseDown = 0;
});

var camera2_1 = new Nexus.Slider('#camera2_1', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera2_1.on('change', function(e) {
  parentTransformDois.scale.x = e;
  mouseDown = 0;
  var data = {
    x: e,
    y: "cameraScene4"
  };
  socket.emit('uiSocketScene4', data);
  var _v = e.toFixed(2);
  document.getElementById('n51').innerHTML = _v;
});

var camera2_2 = new Nexus.Slider('#camera2_2', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera2_2.on('change', function(e) {
  parentTransformDois.scale.y = e;
  mouseDown = 0;
  var data = {
    x: e,
    y: "cameraScene5"
  };
  socket.emit('uiSocketScene5', data);
  var _v = e.toFixed(2);
  document.getElementById('n52').innerHTML = _v;
});

var camera2_3 = new Nexus.Slider('#camera2_3', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera2_3.on('change', function(e) {
  parentTransformDois.scale.z = e;
  mouseDown = 0;
  var data = {
    x: e,
    y: "cameraScene6"
  };
  socket.emit('uiSocketScene6', data);
  var _v = e.toFixed(2);
  document.getElementById('n53').innerHTML = _v;
});

var camera3_1 = new Nexus.Slider('#camera3_1', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera3_1.on('change', function(e) {
  parentTransformTres.scale.x = e;
  mouseDown = 0;
  var data = {
    x: e,
    y: "cameraScene7"
  };
  socket.emit('uiSocketScene7', data);
  var _v = e.toFixed(2);
  document.getElementById('n54').innerHTML = _v;
});

var camera3_2 = new Nexus.Slider('#camera3_2', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera3_2.on('change', function(e) {
  parentTransformTres.scale.y = e;
  mouseDown = 0;
  var data = {
    x: e,
    y: "cameraScene8"
  };
  socket.emit('uiSocketScene8', data);
  var _v = e.toFixed(2);
  document.getElementById('n55').innerHTML = _v;
});

var camera3_3 = new Nexus.Slider('#camera3_3', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera3_3.on('change', function(e) {
  parentTransformTres.scale.z = e;
  mouseDown = 0;
  var data = {
    x: e,
    y: "cameraScene9"
  };
  socket.emit('uiSocketScene9', data);
  var _v = e.toFixed(2);
  document.getElementById('n56').innerHTML = _v;
});

var camera4_1 = new Nexus.Slider('#camera4_1', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera4_1.on('change', function(e) {
  parentTransformQuatro.scale.x = e;
  mouseDown = 0;
  var data = {
    x: e,
    y: "cameraScene10"
  };
  socket.emit('uiSocketScene10', data);
  var _v = e.toFixed(2);
  document.getElementById('n57').innerHTML = _v;
});

var camera4_2 = new Nexus.Slider('#camera4_2', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera4_2.on('change', function(e) {
  parentTransformQuatro.scale.y = e;
  mouseDown = 0;
  var data = {
    x: e,
    y: "cameraScene11"
  };
  socket.emit('uiSocketScene11', data);
  var _v = e.toFixed(2);
  document.getElementById('n58').innerHTML = _v;
});

var camera4_3 = new Nexus.Slider('#camera4_3', {
  'size': [191, 20],
  'mode': 'absolute',
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera4_3.on('change', function(e) {
  parentTransformQuatro.scale.z = e;
  mouseDown = 0;
  var data = {
    x: e,
    y: "cameraScene12"
  };
  socket.emit('uiSocketScene12', data);
  var _v = e.toFixed(2);
  document.getElementById('n59').innerHTML = _v;
});

/* Fazer 4 luzes diferentes */

// If needed
/*
var camera2 = new Nexus.Dial('#camera2', {
  'size': [40, 40],
  'interaction': 'vertical',
  'mode': 'absolute', // "absolute" or "relative"
  'min': 0.8,
  'max': 1.2,
  'step': 0.0001,
  'value': 0
});
camera2.on('change', function(e) {
  parentTransformDois.scale.x = e;
  parentTransformDois.scale.y = e;
  parentTransformDois.scale.z = e;
});

var camera3 = new Nexus.Dial('#camera3', {
  'size': [40, 40],
  'interaction': 'vertical',
  'mode': 'absolute', // "absolute" or "relative"
  'min': 0.8,
  'max': 3,
  'step': 0.0001,
  'value': 0
});
camera3.on('change', function(e) {
  parentTransformTres.scale.x = e;
  parentTransformTres.scale.y = e;
  parentTransformTres.scale.z = e;
});

var camera4 = new Nexus.Dial('#camera4', {
  'size': [40, 40],
  'interaction': 'vertical',
  'mode': 'absolute', // "absolute" or "relative"
  'min': 0.8,
  'max': 3,
  'step': 0.0001,
  'value': 0
});
camera4.on('change', function(e) {
  parentTransformQuatro.scale.x = e;
  parentTransformQuatro.scale.y = e;
  parentTransformQuatro.scale.z = e;
});

*/


/* Shaders */

/*
afterimagePass.renderToScreen = false;
     effectSobel.renderToScreen = false;
     pixelPass.renderToScreen = false;
     glitchPass.goWild = false;
     if (glitchPass.renderToScreen == false) {
       renderPostOne = true;
       glitchPass.renderToScreen = true;
     }
*/


function shaderButtons(data) {

  if (data === "shader0") {
    renderPostOne = false;
    renderPostTwo = false;
    renderPostThree = false;
    renderPostFour = false;

    scene2.remove(planek);
    scene2.remove(plane2k);

    glitchPass.goWild = false;
    glitchPass.renderToScreen = false;

    document.getElementById("shader0").style.background = "white";
    document.getElementById("shader0").style.color = "black";
    document.getElementById("shader1").style.background = "black";
    document.getElementById("shader1").style.color = "white";
    document.getElementById("shader2").style.background = "black";
    document.getElementById("shader2").style.color = "white";
    document.getElementById("shader3").style.background = "black";
    document.getElementById("shader3").style.color = "white";
    document.getElementById("shader4").style.background = "black";
    document.getElementById("shader4").style.color = "white";

  }

  if (data === "shader1") {

    renderPostOne = true;
    renderPostTwo = false;
    renderPostThree = false;
    renderPostFour = false;

    scene2.remove(planek);
    scene2.remove(plane2k);

    glitchPass.goWild = false;
    glitchPass.renderToScreen = true;
    afterimagePass.renderToScreen = false;

    document.getElementById("shader0").style.background = "black";
    document.getElementById("shader0").style.color = "white";
    document.getElementById("shader1").style.background = "white";
    document.getElementById("shader1").style.color = "black";
    document.getElementById("shader2").style.background = "black";
    document.getElementById("shader2").style.color = "white";
    document.getElementById("shader3").style.background = "black";
    document.getElementById("shader3").style.color = "white";
    document.getElementById("shader4").style.background = "black";
    document.getElementById("shader4").style.color = "white";

  }

  if (data === "shader2") {
    renderPostOne = true;
    renderPostTwo = false;
    renderPostThree = false;
    renderPostFour = false;

    scene2.remove(planek);
    scene2.remove(plane2k);

    glitchPass.goWild = true;
    glitchPass.renderToScreen = true;
    afterimagePass.renderToScreen = false;

    document.getElementById("shader0").style.background = "black";
    document.getElementById("shader0").style.color = "white";
    document.getElementById("shader1").style.background = "black";
    document.getElementById("shader1").style.color = "white";
    document.getElementById("shader2").style.background = "white";
    document.getElementById("shader2").style.color = "black";
    document.getElementById("shader3").style.background = "black";
    document.getElementById("shader3").style.color = "white";
    document.getElementById("shader4").style.background = "black";
    document.getElementById("shader4").style.color = "white";

  }

  if (data === "shader3") {
    renderPostOne = false;
    renderPostTwo = true;
    renderPostThree = false;
    renderPostFour = false;

    scene2.remove(planek);
    scene2.remove(plane2k);

    glitchPass.goWild = false;
    glitchPass.renderToScreen = false;
    afterimagePass.renderToScreen = true;

    document.getElementById("shader0").style.background = "black";
    document.getElementById("shader0").style.color = "white";
    document.getElementById("shader1").style.background = "black";
    document.getElementById("shader1").style.color = "white";
    document.getElementById("shader2").style.background = "black";
    document.getElementById("shader2").style.color = "white";
    document.getElementById("shader3").style.background = "white";
    document.getElementById("shader3").style.color = "black";
    document.getElementById("shader4").style.background = "black";
    document.getElementById("shader4").style.color = "white";

  }
  if (data === "shader4") {

    renderPostOne = false;
    renderPostTwo = false;
    renderPostThree = false;
    renderPostFour = false;

    glitchPass.goWild = false;
    glitchPass.renderToScreen = false;
    afterimagePass.renderToScreen = true;

    document.getElementById("shader0").style.background = "black";
    document.getElementById("shader0").style.color = "white";
    document.getElementById("shader1").style.background = "black";
    document.getElementById("shader1").style.color = "white";
    document.getElementById("shader2").style.background = "black";
    document.getElementById("shader2").style.color = "white";
    document.getElementById("shader3").style.background = "black";
    document.getElementById("shader3").style.color = "white";
    document.getElementById("shader4").style.background = "white";
    document.getElementById("shader4").style.color = "black";

    scene2.add(planek);
    scene2.add(plane2k);
  }
}

/* This might be important anytime soon
First scene with line buffer geometry. xCoAx maybe will need this

  var lineGeometry = new THREE.BufferGeometry();
  var points = [];
  var point = new THREE.Vector3();
  var direction = new THREE.Vector3();
  for (var i = 0; i < 150; i++) {
    direction.x = 0;
    direction.y = 0;
    direction.z = 5;
    point.add(direction);
    points.push(point.x, point.y, point.z);
  }
  lineGeometry.addAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  var material = new THREE.LineBasicMaterial({
    color: 0xffffff
  });
  for (var i = 0; i < 150; i++) {
    var object;
    object = new THREE.Line(lineGeometry, material);
    object.position.x = 1;
    object.position.y = 1; //Math.floor(Math.random() * 6) + 1;
    object.position.z = Math.random() * 400 - 200;
    object.rotation.x = 1;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;
    parentTransformSete.add(object);
  }*/
