/**
 * @author Luis Arandas  http://luisarandas.org
 * @author José Alberto Gomes  http://jasg.net/Home.html
 * @author Rui Penha  http://ruipenha.pt/
 *
 *  All this code was done under the context of a research
 *  between Braga Media Arts and the University of Porto © 2019
 */

/* Startup Functions */

$(document).ready(function() {
  console.clear();
  console.log("%cWelcome to Akson", "background:black ; color: white ; font-size:25px");
  if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
  };
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (isChrome === true){
    console.log("%c" + "Running Chromium", 'background: #000; color: #fff')
  } else {
    console.log("%c" + "Not running Chromium", 'background: #000; color: #fff')
  }
  doStuff();
  if (detectmob() === true) {};
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (ios === true) {}
  if (window.AudioContext === null) {
    alert("AudioContext is Undefined");
  }
  var v = document.querySelectorAll("#c2, #d2, #e2, #g2, #a2, #c3, #d3, #e3, #g3, #a3, #c4, #d4, #e4, #g4, #a4, #c5, #d5, #e5, #g5, #a5");
  v.forEach(function(v) {
    v.style.background = "white";
    v.style.color = "black";
  });
  if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
    //Try alert.
  }

});

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

var afterimagePass = new THREE.AfterimagePass();
var composer;

var whichScene; // Stream to the mobile phone.

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
  socket.on('scene', changeScene);

  socket.on('socketid', function(socketid) {
    var logs = document.getElementById('logs'),
      output_node = document.createElement("div");
    output_node.innerHTML = 'A new user connected to Akson' + '<br>';
    logs.appendChild(output_node);
    logs.scrollTop = logs.scrollHeight;
  });

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = 1000;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.add(camera);

  raycaster = new THREE.Raycaster();
  raycaster.linePrecision = 1;

  renderer = new THREE.WebGLRenderer({
    //preserveDrawingBuffer: false,
  });
  //renderer.depth = false;
  renderer.logarithmicDepthBuffer = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.body.appendChild(renderer.domElement);

  /* First Scene Setup */

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

  parentTransform.frustumCulled = false;

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousedown', onMouseDown, false);

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  composer = new THREE.EffectComposer(renderer);
  composer.addPass(new THREE.RenderPass(scene, camera));
  composer.addPass(afterimagePass);

  afterimagePass.renderToScreen = true;

  document.addEventListener("keydown", function(event) {

    if (event.which == "221") {
      document.body.requestPointerLock();
      console.log(document.body.requestPointerLock());
    }
    if (event.which == "220") {
      document.exitPointerLock();
      console.log(document.exitPointerLock());
    }
  });

}

/* Scheduling the Rendering */

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* Animation Function */

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

  //markovNote(); // console logs next chain note
  event.preventDefault();
  var data = {
    x: event.clientX,
    y: event.clientY
  };
  socket.emit('mouse', data);

  var note = Math.floor(Math.random() * scale.length);

    var intersectsClick = raycaster.intersectObjects(parentTransform.children);
    if (intersectsClick.length > 0) {
      console.log(intersectsClick[0].object.material.color);
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

  console.log(data.x);
  console.log(data.y);

  if (isAlocatingSynth != true){
    var note = Math.floor(Math.random() * scale.length);
    currentSynthesizer.triggerAttackRelease(scale[note], "4n");
    console.log(note);
  }

  var randomItem = parentTransform.children[Math.floor(Math.random() * parentTransform.children.length)];
  if (isBlackSceneOne_ == false) {
    randomItem.material.color.set(0x181818);
  }
  if (isBlackSceneOne_ == true) {
    randomItem.material.color.set(0xBEBEBE);
  }
  if (isBlackSceneOne_ == true) {
    isBlackSceneOne_ = false;
  } else {
    isBlackSceneOne_ = true;
  }
}

function changeScene(data) {
  /* Mobile scene changer stream */
  if (detectmob() === true) {
    Tone.context.resume().then(() => {
      var evt = new KeyboardEvent('keydown', {
        'keyCode': data,
        'which': data
      });
      document.dispatchEvent(evt);
    });
  }
}

/* Device Type Check */

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

/* Main Render Function */

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

  composer.render();

}

function doStuff() {
  nrSeconds++;
  console.log("%c" + "Second [" + nrSeconds + "]", 'background: #000; color: #fff');
  /*if (nrSeconds === 10)
   topBar('refresh');
   50000 is 50 seconds, not 5 minutes. 5 minutes would be 5 * 60 * 1000 = 300000
   Here to refresh automatically.*/
}
