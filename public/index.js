
var iswt_ = null;
$(document).ready(function() {
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (ios === true || $(window).width() < 960 || detectmob() === true) {
    $("div").remove();
    $("canvas").remove();
    iswt_ = false;
  }
  if (window.AudioContext === null) {
    alert("AudioContext is Undefined");
  }
  if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {}

  $('#welcomediv').fadeIn(3000).fadeOut(3000, function() {
      $('#welcomescreen').remove();
  });
});

setInterval(function(){
  var _e = Math.random().toString();
  var randoms = [...Array(350)].map(() => Math.floor(Math.random() * 9));
  document.getElementById("topright").innerHTML = randoms//36
}, 1500);

setInterval(function(){

  if (iswt_ == false) {
    document.body.style["background-color"] = "white";
    iswt_ = true;
  } else if (iswt_ == true) {
    document.body.style["background-color"] = "black";
    iswt_ = false;
  }

}, 1500);


/*
;(function(){
"use strict"
window.addEventListener("load", setupWebGL, false);
var gl,
  program;
function setupWebGL (evt) {
  window.removeEventListener(evt.type, setupWebGL, false);
  if (!(gl = getRenderingContext()))
    return;

  var source = document.querySelector("#vertex-shader").innerHTML;
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader,source);
  gl.compileShader(vertexShader);
  source = document.querySelector("#fragment-shader").innerHTML
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader,source);
  gl.compileShader(fragmentShader);
  program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    var linkErrLog = gl.getProgramInfoLog(program);
    cleanup();
    return;
  }

  initializeAttributes();

  gl.useProgram(program);
  gl.drawArrays(gl.POINTS, 0, 1);

  cleanup();
}

var buffer;
function initializeAttributes() {
  gl.enableVertexAttribArray(0);
  buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);
}

function cleanup() {
gl.useProgram(null);
if (buffer)
  gl.deleteBuffer(buffer);
if (program)
  gl.deleteProgram(program);
}

function getRenderingContext() {
  var canvas = document.getElementById("this");
  var gl = canvas.getContext("webgl")
    || canvas.getContext("experimental-webgl");
  if (!gl) {
    var paragraph = document.querySelector("p");
    paragraph.innerHTML = "Failed to get WebGL context."
      + "Your browser or device may not support WebGL.";
    return null;
  }
  gl.viewport(0, 0,
    gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return gl;
}
})();*/



var drawGrid = function(w, h, id) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    ctx.canvas.width  = w;
    ctx.canvas.height = h;

    var data = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse"> \
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5" /> \
            </pattern> \
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"> \
                <rect width="80" height="80" fill="url(#smallGrid)" /> \
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#smallGrid)" /> \
    </svg>';

    var DOMURL = window.URL || window.webkitURL || window;

    var img = new Image();
    var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svg);

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
    }
    img.src = url;
}
drawGrid(800, 400, "line1");









setInterval(function(){
  testPromise();
}, 1000);

  var promiseCount = 0;

function testPromise() {
  var lefttext = document.getElementById('lefttext');

  console.log(promiseCount);

  if (promiseCount == 14) {
    lefttext.innerHTML = "";
    promiseCount = 0;
  } else {
    var el = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    lefttext.innerHTML += `-Promise- = f() {} ${el} <br>`;
    promiseCount++;
  }
}


var light;
var nrSeconds = 0;
var camera, camera1,
  scene, scene1,
  container, container1,
  raycaster,
  renderer, renderer1,
  parentTransform;
var radius = 100;
var theta = 0;

var mouse = new THREE.Vector2(),
  INTERSECTED;


var color = "#0000FF";

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var isBlackSceneOne = false;
var isBlackSceneOne_ = false;
var isBlackSceneFour = false;

var currentSynthesizer = polySynth;

init();
animate();

function init() {
  socket = io.connect(window.location.origin);
  socket.on('mouse', clickStream);

  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = 1000;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x272727);
  scene.add(camera);


  /*scene1 = new THREE.Scene();
  scene1.background = new THREE.Color(0x00ff00);
  scene1.add(camera);

  camera1 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  renderer1 = new THREE.WebGLRenderer();
  renderer1.setSize($('#secondmaincanvas').width(), $('#secondmaincanvas').height());
  container1 = document.getElementById( 'secondmaincanvas' );
  document.body.appendChild(container1);
  container1.appendChild(renderer1.domElement);
  var geometry1 = new THREE.BoxGeometry();
  var material1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube1 = new THREE.Mesh( geometry1, material1 );
  scene1.add( cube1 );

  camera1.position.z = 5;*/

  raycaster = new THREE.Raycaster();
  raycaster.linePrecision = 1;

  renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: false,
  });
  renderer.depth = false;
  renderer.logarithmicDepthBuffer = true;
  renderer.setPixelRatio(window.devicePixelRatio);

  container = document.getElementById( 'maincanvas' );
  document.body.appendChild(container);
  renderer.setSize( $('#maincanvas').width(), $('#maincanvas').height());

  container.appendChild(renderer.domElement);

  parentTransform = new THREE.Object3D();
  for (var i = 0; i < 90; i++) {
    var geometry = new THREE.BoxBufferGeometry(30, 1500, 10);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true
    }));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    parentTransform.add(object);
  }

  light = new THREE.DirectionalLight(0xd3d3d3, 2);
  light.position.set(1, 1, 1).normalize();
  parentTransform.add(light);
  scene.add(parentTransform);


  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousedown', onMouseDown, false);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
}


function animate() {

  var intersects = raycaster.intersectObjects(parentTransform.children);
  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = intersects[0].object;
      INTERSECTED.material.wireframe = false;
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.wireframe = true;
    INTERSECTED = null;
  }
  requestAnimationFrame(animate);
  render();
}

var data;
var newScale = new ScalePlaying();
var scale = newScale.cMajorPentatonic();

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onMouseDown(event) {

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  event.preventDefault();
  var data = {
    x: event.clientX,
    y: event.clientY
  };
  socket.emit('mouse', data);

  var note = Math.floor(Math.random() * scale.length);

    var intersectsClick = raycaster.intersectObjects(parentTransform.children);
    if (intersectsClick.length > 0) {

      intersectsClick[0].object.wireframe = false;

      if (isBlackSceneFour == false) {
        intersectsClick[0].object.material.color.set(0x181818);
      }
      if (isBlackSceneFour == true) {
        intersectsClick[0].object.material.color.set(0xffffff);
      }
      if (isBlackSceneFour == true) {
        isBlackSceneFour = false;
      } else {
        isBlackSceneFour = true;
      }
      Tone.context.resume().then(() => {
        currentSynthesizer.triggerAttackRelease(scale[note], "4n");
        console.log(note);
      });
    }

}

function onWindowResize() {}

function clickStream(data) {

  var note = Math.floor(Math.random() * scale.length);
  console.log(note);
  currentSynthesizer.triggerAttackRelease(scale[note], "4n");

  var randomItem = parentTransform.children[Math.floor(Math.random() * parentTransform.children.length)];
  if (isBlackSceneOne_ == false) {
    randomItem.material.color.set(0x181818);
  }
  if (isBlackSceneOne_ == true) {
    randomItem.material.color.set(0xBEBEBE);
  }
}



function detectmob() {
  if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}

var textcounter = 0;
function render() {
  if (textcounter >= 100) {
    document.getElementById('firstbar').innerHTML = "";
    textcounter = 0;
  }

  theta += 0.2;
  camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
  camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
  camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));

  camera.lookAt(scene.position);
  raycaster.setFromCamera(mouse, camera);
  renderer.clear();
  renderer.render(scene, camera);
  renderer.autoClear = false;

  document.getElementById('firstbar').innerHTML += theta + '<br>';
  textcounter++;
}
