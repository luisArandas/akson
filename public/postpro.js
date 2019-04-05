/* Graphics Post Production */

var w = window.innerWidth;
var h = window.innerHeight;
var fullWidth = w * 3;
var fullHeight = h * 2;

var light1 = new Nexus.Slider('#light1', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': -15
});
light1.on('change', function(e) {
  lightOne.intensity = e; //todas
  console.log(lightOne);
  /*light2.intensity = e; //quatro
  light7.intensity = e; //3
  directionalLight5.intensity = e; //dois
  directionalLight7.intensity = e; //3
  ambientLight.intensity = e; //todas
  ambientLight2.intensity = e; //quatro
  ambientLight5.intensity = e;
  ambientLight7.intensity = e; //3
  light1._value.update(e);
  light1.render();*/
});

var light2 = new Nexus.Slider('#light2', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 6,
  'step': 0.001,
  'value': 0.1
});
light2.on('change', function(e) {
  lightTwo.intensity = e;

});

var light3 = new Nexus.Slider('#light3', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': 1
});
light3.on('change', function(e) {
  lightThree.intensity = e;
});

var light4 = new Nexus.Slider('#light4', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': 1
});
light4.on('change', function(e) {
  lightFour.intensity = e;
});


var cameraM1 = new Nexus.Slider('#cameraM1', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': -170,
  'max': 170,
  'step': 0.001,
  'value': 80
});
cameraM1.on('change', function(e) {
  camera.fov = e;
  console.log(camera.fov);
  camera.updateProjectionMatrix();
});

var cameraM2 = new Nexus.Slider('#cameraM2', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 2,
  'step': 0.001,
  'value': 1
});
cameraM2.on('change', function(e) {
  camera.zoom = e;
  console.log(camera.zoom);
  camera.updateProjectionMatrix();
});

var cameraM3 = new Nexus.Slider('#cameraM3', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5,
  'step': 0.0001,
  'value': 1
});
cameraM3.on('change', function(e) {
  /* See this!!! */
  camera.aspect = e;
  camera.updateProjectionMatrix();
});

var cameraM4 = new Nexus.Slider('#cameraM4', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 1,
  'max': 2000,
  'step': 0.001,
  'value': 1
});
cameraM4.on('change', function(e) {
  camera.near = e;
  camera.updateProjectionMatrix();
});

var cameraM5 = new Nexus.Slider('#cameraM5', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5000,
  'step': 0.001,
  'value': 1000
});
cameraM5.on('change', function(e) {
  camera.setViewOffset(e, fullHeight, w * 1, h * 0, w, h);
  camera.updateProjectionMatrix();
});

var cameraM6 = new Nexus.Slider('#cameraM6', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5000,
  'step': 0.001,
  'value': 1000
});
cameraM6.on('change', function(e) {
  camera.setViewOffset(fullWidth, e, w * 1, h * 0, w, h);
  camera.updateProjectionMatrix();
});

var cameraM7 = new Nexus.Slider('#cameraM7', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': 1
});
cameraM7.on('change', function(e) {
  camera.setViewOffset(fullWidth, fullHeight, w * e, h * 0, w, h);
  camera.updateProjectionMatrix();
});

var cameraM8 = new Nexus.Slider('#cameraM8', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': 1
});
cameraM8.on('change', function(e) {
  camera.setViewOffset(fullWidth, fullHeight, w * 1, h * e, w, h);
  camera.updateProjectionMatrix();
});

var cameraM9 = new Nexus.Slider('#cameraM9', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': -5,
  'max': 5,
  'step': 0.001,
  'value': 0
});
cameraM9.on('change', function(e) {
  camera.setViewOffset(fullWidth, fullHeight, w * e, h * 0, fullWidth, fullHeight);
  camera.updateProjectionMatrix();
});

var cameraM10 = new Nexus.Slider('#cameraM10', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': -5,
  'max': 5,
  'step': 0.001,
  'value': 0
});
cameraM10.on('change', function(e) {
  camera.setViewOffset(fullWidth, fullHeight, w * 0, h * e, fullWidth, fullHeight);
  camera.updateProjectionMatrix();
});



function camOffsetDefault(a) {
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

/* Machine Info */

var a1 = "Network effective bandwidth estimate " + navigator.connection.downlink + " MB/s" + '<br>';
var a2 = "Max download speed " + navigator.connection.downlinkMax + " MB/s" + '<br>';
var a3 = "Effective connection type " + navigator.connection.effectiveType + " MB/s" + '<br>';
var a4 = "estimated effective round-trip " + navigator.connection.rtt + " rounded to the nearest multiple of 25 milliseconds" + '<br>';
var a5 = "network connection type " + navigator.connection.type + '<br>';
var a6 = navigator.language || navigator.userLanguage;
var a7 = "- Device Screen Width_" + screen.width + "<br>";
var a8 = "- Device Screen Height_" + screen.height + "<br>";
var a9 = "- Device Screen availWidth_" + screen.availWidth + "<br>";
var a10 = "- Device Screen availHeight_" + screen.availHeight + "<br>";
var a11 = "- Device Screen colorDepth_" + screen.colorDepth + "<br>";
var a12 = "- Device Screen pixelDepth_" + screen.pixelDepth + "<br>";
var a13 = "- User Agent_" + navigator.userAgent + "<br>";
var a14 = "- Vendor_" + navigator.vendor + "<br>";
var a15 = "- ProductSub_" + navigator.productSub + "<br>";
var a16 = "- Platform_" + navigator.platform + "<br>";
var a17 = "- Navigator_Languages_" + navigator.languages + "<br>";

canvas = document.getElementById("glcanvas");
var gl = canvas.getContext("experimental-webgl");

var a18 = "- GL RENDERER " + gl.getParameter(gl.RENDERER) + '<br>';
var a19 = "- GL VENDOR " + gl.getParameter(gl.VENDOR) + '<br>';
var a20 = "AudioContext baseLantency: " + Tone.context.baseLantency + '<br>';
var a21 = "AudioContext currentTime: " + Tone.context.currentTime + '<br>';
var a22 = "AudioContext channelCount: " + Tone.context.destination.channelCount + '<br>';
var a23 = "AudioContext channelCountMode: " + Tone.context.destination.channelCountMode + '<br>';
var a24 = "AudioContext channelInterpretation: " + Tone.context.destination.channelInterpretation + '<br>';
var a25 = "AudioContext Inputs: " + Tone.context.destination.numberOfInputs + '<br>';
var a26 = "AudioContext sampleRate: " + Tone.context.sampleRate + '<br>';
var a27 = "AudioContext State: " + Tone.context.state + '<br>';

console.log(Tone.context);

function camNear(a) {
  if (a === 'kill') {
    camera.near = 0;
    camera.updateProjectionMatrix();
    Tone.Master.mute = true;
  }
  if (a === 'born') {
    camera.near = 1;
    camera.updateProjectionMatrix();
    Tone.Master.mute = false;
  }
  if (a === 'about') {
    document.getElementById('machineInfo').innerHTML += a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11 + a12 + a13 + a14 + a15 + a16 + a17 + a18 + a19 + a20 + a21 + a22 + a23 + a24 + a25 + a26 + a27;
    WUI_Dialog.open("about_this_dialog");
  }
}




//4 lights

/* PostPro */

var camera1_1 = new Nexus.Slider('#camera1_1', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera1_1.on('change', function(e) {
  parentTransform.scale.x = e;
  //parentTransform.scale.y = e;
  //parentTransform.scale.z = e;
});

var camera1_2 = new Nexus.Slider('#camera1_2', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera1_2.on('change', function(e) {
  parentTransform.scale.y = e;
});

var camera1_3 = new Nexus.Slider('#camera1_3', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera1_3.on('change', function(e) {
  parentTransform.scale.z = e;
});

document.getElementById("cockpit_dialog").addEventListener("mouseenter", function() {
  mouseDown = 0;
});
document.getElementById("cockpit_dialog").addEventListener("mouseout", function() {
  mouseDown = 0;
});

var camera2_1 = new Nexus.Slider('#camera2_1', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera2_1.on('change', function(e) {
  parentTransformDois.scale.x = e;
  mouseDown = 0;
});

var camera2_2 = new Nexus.Slider('#camera2_2', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera2_2.on('change', function(e) {
  parentTransformDois.scale.y = e;
  mouseDown = 0;
});

var camera2_3 = new Nexus.Slider('#camera2_3', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera2_3.on('change', function(e) {
  parentTransformDois.scale.z = e;
  mouseDown = 0;
});

var camera3_1 = new Nexus.Slider('#camera3_1', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera3_1.on('change', function(e) {
  parentTransformTres.scale.x = e;
  mouseDown = 0;
});

var camera3_2 = new Nexus.Slider('#camera3_2', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera3_2.on('change', function(e) {
  parentTransformTres.scale.y = e;
  mouseDown = 0;
});

var camera3_3 = new Nexus.Slider('#camera3_3', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera3_3.on('change', function(e) {
  parentTransformTres.scale.z = e;
  mouseDown = 0;
});

var camera4_1 = new Nexus.Slider('#camera4_1', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera4_1.on('change', function(e) {
  parentTransformQuatro.scale.x = e;
  mouseDown = 0;
});

var camera4_2 = new Nexus.Slider('#camera4_2', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera4_2.on('change', function(e) {
  parentTransformQuatro.scale.y = e;
  mouseDown = 0;
});

var camera4_3 = new Nexus.Slider('#camera4_3', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera4_3.on('change', function(e) {
  parentTransformQuatro.scale.z = e;
  mouseDown = 0;
});

/* Fazer 4 luzes diferentes */

// change
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

  }

  if (data === "shader1") {
    renderPostOne = true;
    renderPostTwo = false;
    renderPostThree = false;
    renderPostFour = false;

    glitchPass.goWild = false;
    glitchPass.renderToScreen = true;
    document.getElementById("shader0").style.background = "black";
    document.getElementById("shader0").style.color = "white";
    document.getElementById("shader1").style.background = "white";
    document.getElementById("shader1").style.color = "black";
    document.getElementById("shader2").style.background = "black";
    document.getElementById("shader2").style.color = "white";
    document.getElementById("shader3").style.background = "black";
    document.getElementById("shader3").style.color = "white";
  }

  if (data === "shader2") {
    renderPostOne = true;
    renderPostTwo = false;
    renderPostThree = false;
    renderPostFour = false;

    glitchPass.goWild = true;
    glitchPass.renderToScreen = true;

    document.getElementById("shader0").style.background = "black";
    document.getElementById("shader0").style.color = "white";
    document.getElementById("shader1").style.background = "black";
    document.getElementById("shader1").style.color = "white";
    document.getElementById("shader2").style.background = "white";
    document.getElementById("shader2").style.color = "black";
    document.getElementById("shader3").style.background = "black";
    document.getElementById("shader3").style.color = "white";
  }

  if (data === "shader3") {
    /*renderPostThree = true;
    document.getElementById("shader2").style.background = "black";
    document.getElementById("shader2").style.color = "white";
    document.getElementById("shader3").style.background = "black";
    document.getElementById("shader3").style.color = "white";
*/

  }
}