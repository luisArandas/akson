

$(document).ready(function() {
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  //if (detectmob() === true) {};
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (ios === true) {}
  if (window.AudioContext === null) {
    alert("AudioContext is Undefined");
  }
  if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {}

  $('#welcomediv').fadeIn(3000).fadeOut(3000, function() {
      $('#welcomescreen').remove();
  });
});

setInterval(function(){
  console.log("Hello");
  var _e = Math.random().toString();
  var randoms = [...Array(350)].map(() => Math.floor(Math.random() * 9));
  document.getElementById("topright").innerHTML = randoms//36
}, 2500);

/* squares */

//var tileWidth  = Math.round(canvas.width / columns),
//    tileHeight = Math.round(canvas.height / rows);
/*

var light;
var nrSeconds = 0;
var camera,
  scene,
  container,
  raycaster,
  renderer,
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
  scene.background = new THREE.Color(0x000000);
  scene.add(camera);

  raycaster = new THREE.Raycaster();
  raycaster.linePrecision = 1;

  renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: false,
  });
  renderer.depth = false;
  renderer.logarithmicDepthBuffer = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

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


function render() {

  theta += 0.2;
  camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
  camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
  camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));

  camera.lookAt(scene.position);
  raycaster.setFromCamera(mouse, camera);
  renderer.clear();
  renderer.render(scene, camera);
  renderer.autoClear = false;
}*/
