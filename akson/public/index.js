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
  placeGraphicalInterface();
  fadeIn();
  Move();
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
  document.getElementById("topBar").style.display = "none";
  WUI_Dialog.close("master_dialog");
  WUI_Dialog.close("cockpit_dialog");
  WUI_Dialog.close("logs_dialog");
  if (detectmob() === true) {
    document.getElementById("topBar").style.display = "none";
    WUI_Dialog.close("master_dialog");
    WUI_Dialog.close("cockpit_dialog");
    WUI_Dialog.close("logs_dialog");
  };
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (ios === true) {
    WUI_Dialog.close("master_dialog");
    WUI_Dialog.close("cockpit_dialog");
    WUI_Dialog.close("logs_dialog");
    var element = document.getElementById("remove");
    element.parentNode.removeChild(element);
  }
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
  /* This works
  var elem = document.querySelector('#cockpit_dialog');
  elem.style.position = 'absolute';
  elem.style.bottom = '0px';*/
});

/* Place the GUI */

function placeGraphicalInterface(){
  $('.wui-dialog-btn').trigger('click');
  $('.wui-dialog-minimize').trigger('click');
}

var lightOne;
var lightTwo;
var lightThree;
var lightFour;
var nrSeconds = 0;
var camera,
  scene,
  container,
  raycaster,
  raycasterTwo,
  renderer,
  parentTransform,
  parentTransformDois,
  parentTransformTres,
  parentTransformQuatro,
  sphereInter;
var radius = 100;
var theta = 0;
var sideBar = false;
var mouse = new THREE.Vector2(),
  INTERSECTED;

var glitchPass = new THREE.GlitchPass();
var afterimagePass = new THREE.AfterimagePass();

var effectHBlur = new THREE.ShaderPass(THREE.HorizontalBlurShader);
var whichScene; // Stream to the mobile phone.

var composerOne;
var composerTwo;
var composerThree;
var composerFour;
var whichVisuals;

var r = 450;
//https://github.com/jbaicoianu/threecap
var capturer = new CCapture({
  format: 'webm'
});

var camera2;
var scene2;

var isSceneOne = true;
var isSceneTwo = false;
var isSceneThree = false;
var isSceneFour = false;

var hideShow = false;

var color = "#0000FF";

var glitchVarOne;
var glitchVarTwo;
var glitchVarThree;

var renderPostOne = false;
var renderPostTwo = false;
var renderPostThree = false;
var renderPostFour = false;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var isBlackSceneOne = false;
var isBlackSceneOne_ = false;
var isBlackSceneFour = false;

var planek;
var plane2k;

var vertices = new THREE.DodecahedronGeometry(50).vertices;

var targetRotationX = 0;
var targetRotationOnMouseDownX = 0;
var targetRotationY = 0;
var targetRotationOnMouseDownY = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var mouseY = 0;
var mouseYOnMouseDown = 0;
var finalRotationY;
var mouseDown = 0;

var currentSynthesizer;
currentSynthesizer = polySynth;

var strDownloadMime = "image/octet-stream";

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

  /* To print Connections counter
  socket.on('socketnumber', function(connections) {
    console.log("#");
  }); */

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = 1000;
  camera2 = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
  camera2.position.z = 1000;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.add(camera);
  scene2 = new THREE.Scene();
  scene2.add(camera2);

  raycaster = new THREE.Raycaster();
  raycaster.linePrecision = 3;

  renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: false,
  });
  //renderer.depth = false;
  renderer.logarithmicDepthBuffer = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.body.appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', (x) => {
    render();
    orbitControls(x);
  });
  document.getElementById("shot").addEventListener('click', takeScreenshot);
  document.getElementById("save").addEventListener('click', saveAsImage);

  function orbitControls(x) {
    //console.log(x);
  }
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = true;
  controls.minDistance = 100;
  controls.maxDistance = 600;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enabled = false;

  /* First Scene Setup */

  parentTransform = new THREE.Object3D();
  for (var i = 0; i < 90; i++) {
    var geometry = new THREE.BoxBufferGeometry(10, 1500, 10);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0x5f5f5f,
    }));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    parentTransform.add(object);
  }

  lightOne = new THREE.DirectionalLight(0xd3d3d3, 1.1);
  lightOne.position.set(1, 1, 1).normalize();
  parentTransform.add(lightOne);
  scene.add(parentTransform);

  /* Second Scene Setup */

  parentTransformDois = new THREE.Object3D();
  for (var i = 0; i < vertices.length; i++) {
    vertices[i].add(randomPoint().multiplyScalar(20));
  }
  var pointsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
    alphaTest: 0.5
  });
  var pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
  var points = new THREE.Points(pointsGeometry, pointsMaterial);
  parentTransformDois.add(points);

  var meshMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    opacity: 0.5,
    transparent: true
  });
  var meshGeometry = new THREE.ConvexBufferGeometry(vertices);
  var mesh = new THREE.Mesh(meshGeometry, meshMaterial);
  mesh.material.side = THREE.BackSide;
  mesh.renderOrder = 0;
  parentTransformDois.add(mesh);
  var mesh = new THREE.Mesh(meshGeometry, meshMaterial.clone());
  mesh.material.side = THREE.FrontSide;
  mesh.renderOrder = 1;
  parentTransformDois.add(mesh);
  lightTwo = new THREE.DirectionalLight(0xd3d3d3, 1);
  lightTwo.position.set(1, 1, 1).normalize();
  parentTransformDois.add(lightTwo);

  /* Third Scene Setup */

  parentTransformTres = new THREE.Object3D();
  for (var i = 0; i < 50; i++) {
    var geometry = new THREE.BoxBufferGeometry(50, 500, 50);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0x1E1E1E,
      //wireframe: true
    }));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    parentTransformTres.add(object);
  }
  lightThree = new THREE.DirectionalLight(0xd3d3d3, 2);
  lightThree.position.set(1, 1, 1).normalize();
  parentTransformTres.add(lightThree);

  /* Fourth Scene Setup */

  parentTransformQuatro = new THREE.Object3D();
  for (var i = 0; i < 90; i++) {
    var geometry = new THREE.BoxBufferGeometry(30, 1500, 30);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true
    }));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    parentTransformQuatro.add(object);
  }

  lightFour = new THREE.DirectionalLight(0xd3d3d3, 2);
  lightFour.position.set(1, 1, 1).normalize();
  parentTransformQuatro.add(lightFour);

  parentTransform.frustumCulled = false;
  parentTransformDois.frustumCulled = false;
  parentTransformTres.frustumCulled = false;
  parentTransformQuatro.frustumCulled = false;

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousedown', onMouseDown, false);
  window.addEventListener('mouseup', onMouseUp, false);
  window.addEventListener("focus", function(event) {
    mouseDown = 0;
  }, false);
  window.addEventListener("blur", function(event) {
  }, false);

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  /* Shader Composer Setup */

  composerOne = new THREE.EffectComposer(renderer);
  composerOne.addPass(new THREE.RenderPass(scene, camera));
  composerOne.addPass(glitchPass);

  composerTwo = new THREE.EffectComposer(renderer);
  composerTwo.addPass(new THREE.RenderPass(scene, camera));
  composerTwo.addPass(afterimagePass);

  composerThree = new THREE.EffectComposer(renderer);
  composerThree.addPass(new THREE.RenderPass(scene, camera));
  composerThree.addPass(effectHBlur);

  glitchPass.renderToScreen = false;
  effectHBlur.renderToScreen = false;
  afterimagePass.renderToScreen = false;

  document.addEventListener("keydown", function(event) {

    var toast = document.querySelector('.iziToast');
    if (toast != null){
      toast.remove();
    }

    if (event.which == "32") {
      triggerGUI();
    }
    if (event.which == "221") {
      document.body.requestPointerLock();
      console.log(document.body.requestPointerLock());
    }
    if (event.which == "220") {
      document.exitPointerLock();
      console.log(document.exitPointerLock());
    }
    if (event.which == "81") {

      /* Audio First Scene Feedback

      console.log("Q");
      currentSynthesizer.volume.value = 0;
      UI.synthvolume._value.update(0);
      UI.synthvolume.render();
      noiseOne.volume.value = -10;
      UI.backgroundvolume._value.update(-10);
      UI.backgroundvolume.render();
      autoFilterOne.set({
        "baseFrequency": 200
      });
      autoFilterOne.set({
        "filter": {
          "rolloff": -12
        }
      });
      autoFilterOne.set({
        "frequency": "8m"
      });
      autoFilterOne.set({
        "octaves": 2.6
      });
      noiseOne.playbackRate = 1;
      UI.noiseOnePlaybackRate._value.update(1);
      UI.noiseOnePlaybackRate.render();
      noiseOne.playbackRate = 1;

      UI.vibratoFrequency._value.update(0);
      UI.vibratoFrequency.render();
      vibrato.frequency.value = 0;

      UI.vibratoDepth._value.update(0);
      UI.vibratoDepth.render();
      vibrato.depth.value = 0;
      */

      isSceneOne = true;
      isSceneTwo = false;
      isSceneThree = false;
      isSceneFour = false;

      var whichScene = 81;
      socket.emit('scene', whichScene);

      controls.enabled = false;

      scene.add(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformTres);
      scene.remove(parentTransformQuatro);
    }
    if (event.which == "87") {

      /* Audio Second Scene Feedback

      console.log("W");
      currentSynthesizer.volume.value = -22.5;
      UI.synthvolume._value.update(-22.5);
      UI.synthvolume.render();
      noiseOne.volume.value = 0;
      UI.backgroundvolume._value.update(0);
      UI.backgroundvolume.render();
      autoFilterOne.set({
        "baseFrequency": 150
      });
      autoFilterOne.set({
        "filter": {
          "rolloff": -24
        }
      });
      autoFilterOne.set({
        "frequency": "4m"
      });
      autoFilterOne.set({
        "octaves": 2.6
      });
      noiseOne.playbackRate = 1;
      UI.noiseOnePlaybackRate._value.update(1);
      UI.noiseOnePlaybackRate.render();
      noiseOne.playbackRate = 1;
      UI.vibratoFrequency._value.update(0);
      UI.vibratoFrequency.render();
      vibrato.frequency.value = 0;
      UI.vibratoDepth._value.update(0);
      UI.vibratoDepth.render();
      vibrato.depth.value = 0;
      */

      camera.position.x = 54;
      camera.position.y = 54;
      camera.position.z = 150;

      mouseDown = 0;
      isSceneOne = false;
      isSceneTwo = true;
      isSceneThree = false;
      isSceneFour = false;

      var whichScene = 87;
      socket.emit('scene', whichScene);

      controls.enabled = true;

      scene.add(parentTransformDois);
      scene.remove(parentTransform);
      scene.remove(parentTransformTres);
      scene.remove(parentTransformQuatro);
    }

    if (event.which == "69") {

      /* Audio Third Scene Feedback

      console.log("E");
      currentSynthesizer.volume.value = -22.5;
      UI.synthvolume._value.update(-22.5);
      UI.synthvolume.render();
      noiseOne.volume.value = 0;
      UI.backgroundvolume._value.update(0);
      UI.backgroundvolume.render();
      autoFilterOne.set({
        "baseFrequency": 150
      });
      autoFilterOne.set({
        "filter": {
          "rolloff": -96
        }
      });
      autoFilterOne.set({
        "frequency": "2n"
      });
      UI.noiseOnePlaybackRate._value.update(1);
      UI.noiseOnePlaybackRate.render();
      noiseOne.playbackRate = 1;
      UI.vibratoFrequency._value.update(0);
      UI.vibratoFrequency.render();
      vibrato.frequency.value = 0;
      UI.vibratoDepth._value.update(0);
      UI.vibratoDepth.render();
      vibrato.depth.value = 0;
      currentSynthesizer.volume.value = -22.5;
      UI.synthvolume._value.update(-22.5);
      UI.synthvolume.render();
      noiseOne.volume.value = 0;
      UI.backgroundvolume._value.update(0);
      UI.backgroundvolume.render();
      autoFilterOne.set({
        "baseFrequency": 150
      });
      autoFilterOne.set({
        "filter": {
          "rolloff": -24
        }
      });
      */
      isSceneOne = false;
      isSceneTwo = false;
      isSceneThree = true;
      isSceneFour = false;
      controls.enabled = false;
      var whichScene = 69;
      socket.emit('scene', whichScene);
      scene.add(parentTransformTres);
      scene.remove(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformQuatro);
    }

    if (event.which == "82") {

      /* Audio Second Scene Feedback

      console.log("R");
      currentSynthesizer.volume.value = 0;
      UI.synthvolume._value.update(0);
      UI.synthvolume.render();
      noiseOne.volume.value = -10;
      UI.backgroundvolume._value.update(-10);
      UI.backgroundvolume.render();
      UI.noiseOnePlaybackRate._value.update(15);
      UI.noiseOnePlaybackRate.render();
      noiseOne.playbackRate = 15;
      UI.vibratoFrequency._value.update(2.5);
      UI.vibratoFrequency.render();
      vibrato.frequency.value = 2.5;
      UI.vibratoDepth._value.update(0.2);
      UI.vibratoDepth.render();
      vibrato.depth.value = 0.2;
      autoFilterOne.set({
        "octaves": 2.6
      });
      noiseOne.playbackRate = 1;
      */

      isSceneOne = false;
      isSceneTwo = false;
      isSceneThree = false;
      isSceneFour = true;
      var whichScene = 82;
      socket.emit('scene', whichScene);
      controls.enabled = false;
      scene.add(parentTransformQuatro);
      scene.remove(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformTres);
    }

    /* Interaction Model Keyboard Trigger */

    if (event.which == "72") {
      changeState("descenter");
      printPhraseDialog("Changed to <i>descenter</i> mode");
    }
    if (event.which == "74") {
      changeState("streamed");
      printPhraseDialog("Changed to <i>streamed</i> mode");
    }
    if (event.which == "75") {
      changeState("alocate");
      printPhraseDialog("Changed to <i>allocate</i> mode");
    }
    if (event.which == "76") {
      changeState("alone");
      printPhraseDialog("Changed to <i>alone</i> mode");
    }

    /* Shader Keyboard Trigger */

    if (event.which == "67") {
      $('#shader0').trigger('click');
      printPhraseDialog("No shader is currently being used as Post-Processing");
    }
    if (event.which == "86") {
      $('#shader1').trigger('click');
      printPhraseDialog("Currently using <i>Glitch</i> shader");
    }
    if (event.which == "66") {
      $('#shader2').trigger('click');
      printPhraseDialog("Currently using <i>Noise</i> shader");
    }
    if (event.which == "78") {
      $('#shader3').trigger('click');
      printPhraseDialog("Currently using <i>Reverb</i> shader");
    }
    if (event.which == "77") {
      $('#shader4').trigger('click');
    printPhraseDialog("Currently using <i>Vignette</i> shader");
    }

    /* Preset Keyboard Trigger */

    if (event.which == "65") {
      $('#preset1').trigger('click');
      printPhraseDialog("Using the first instrument preset");
    }
    if (event.which == "83") {
      $('#preset2').trigger('click');
      printPhraseDialog("Using the second instrument preset");
    }
    if (event.which == "68") {
      $('#preset3').trigger('click');
      printPhraseDialog("Using the third instrument preset");
    }
    if (event.which == "70") {
      $('#preset4').trigger('click');
      printPhraseDialog("Using the fourth instrument preset");
    }
    if (event.which == "71") {
      $('#preset5').trigger('click');
      printPhraseDialog("Using the fifth instrument preset");
    }

    /* Preset Keyboard Trigger */

    if (event.which == "89") {
      $('#top1').trigger('click');
      printPhraseDialog("Triggered the top bar first button");
    }
    if (event.which == "85") {
      $('#top2').trigger('click');
      printPhraseDialog("Triggered the top bar second button");
    }
    if (event.which == "73") {
      $('#top3').trigger('click');
      printPhraseDialog("Triggered the top bar third button");
    }
    if (event.which == "79") {
      $('#top4').trigger('click');
      printPhraseDialog("Triggered the top bar fourth button");
    }
    if (event.which == "80") {
      $('#top5').trigger('click');
      printPhraseDialog("Triggered the top bar fifth button");
    }

    /* On/Off Keyboard Trigger */

    if (event.which == "90") {
      $('#close1').trigger('click');
      printPhraseDialog("Closed the Scene by the Keyboard.");
    }
    if (event.which == "88") {
      $('#open1').trigger('click');
      printPhraseDialog("Opened the Scene by the Keyboard");
    }

    /* Scales Keyboard Trigger  */

    if (event.which == "192") {
      $('#scalesButton1').trigger('click');
      printPhraseDialog("Triggered the top bar fifth button");
    }
    if (event.which == "49") {
      $('#penta1').trigger('click');
      printPhraseDialog("Using C Major Pentatonic");
    }
    if (event.which == "50") {
      $('#penta2').trigger('click');
      printPhraseDialog("Using C Minor Pentatonic");
    }
    if (event.which == "51") {
      $('#major1').trigger('click');
      printPhraseDialog("Using C Major");
    }
    if (event.which == "52") {
      $('#major2').trigger('click');
      printPhraseDialog("Using C Minor");
    }
    if (event.which == "53") {
      $('#harmonic').trigger('click');
      printPhraseDialog("Using C Harmonic Minor");
    }
    if (event.which == "54") {
      $('#melodic').trigger('click');
      printPhraseDialog("Using C Melodic Minor");
    }
    if (event.which == "55") {
      $('#ionian').trigger('click');
      printPhraseDialog("Using C Ionian");
    }
    if (event.which == "56") {
      $('#locrian').trigger('click');
      printPhraseDialog("Using C Locrian");
    }
    if (event.which == "57") {
      $('#adonai').trigger('click');
      printPhraseDialog("Using C Adonai");
    }
    if (event.which == "48") {
      $('#hirajoshi').trigger('click');
      printPhraseDialog("Using C Hirajoshi");
    }
    if (event.which == "222") {
      $('#hungarian').trigger('click');
      printPhraseDialog("Using C Hungarian");
    }
    if (event.which == "189") {
      $('#about1').trigger('click');
    }

  /* Testing Planes on fourth Shader */

  });
  var geometryk = new THREE.PlaneGeometry((windowWidth * 10), 450, 3);
  var materialk = new THREE.MeshBasicMaterial({
    color: 0x000000,
  });
  planek = new THREE.Mesh(geometryk, materialk);
  var geometry2k = new THREE.PlaneGeometry((windowHeight * 10), 450, 3);
  var material2k = new THREE.MeshBasicMaterial({
    color: 0x000000,
  });
  plane2k = new THREE.Mesh(geometry2k, material2k);
  planek.position.set(0, -670, 0);
  plane2k.position.set(0, 670, 0);
}

/* Scheduling the Rendering */

setInterval( function () {
  if ( ! document.webkitHidden ) requestAnimationFrame(animate);
}, 1000 / 55 );

/* Enable/Disable GUI */

function triggerGUI(){
  if (sideBar == false) {
    document.getElementById("topBar").style.display = "inline";
    WUI_Dialog.open("master_dialog");
    WUI_Dialog.open("cockpit_dialog");
    WUI_Dialog.open("logs_dialog");
  }
  if (sideBar == true) {
    document.getElementById("topBar").style.display = "none";
    WUI_Dialog.close("master_dialog");
    WUI_Dialog.close("cockpit_dialog");
    WUI_Dialog.close("logs_dialog");
    WUI_Dialog.close("savesettings_dialog");
    WUI_Dialog.close("alocate_dialog");
    WUI_Dialog.close("about_this_dialog");
  }
  if (sideBar == true) {
    sideBar = false;
  } else {
    sideBar = true;
  }
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* Animation Function */

function animate() {
  parentTransformDois.rotation.y += 0.005;
  parentTransformDois.rotation.x += 0.005;
  parentTransformDois.rotation.z += 0.005;

  if (isSceneOne === true){
    var intersects = raycaster.intersectObjects(parentTransform.children);
    if (intersects.length > 0) {
      if (INTERSECTED != intersects[0].object) {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED = intersects[0].object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex(0xffffff);
      }
    } else {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = null;
    }
  }

  if (isSceneFour === true){
    var intersects1 = raycaster.intersectObjects(parentTransformQuatro.children);
    if (intersects1.length > 0) {
      if (INTERSECTED != intersects1[0].object) {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED = intersects1[0].object;
        INTERSECTED.material.wireframe = false;
      }
    } else {
      if (INTERSECTED) INTERSECTED.material.wireframe = true;
      INTERSECTED = null;
    }
  }
  //requestAnimationFrame(animate);
  render();
}

/* Sockets and Musical Interaction */

var data;
var newScale = new ScalePlaying();
var scale = newScale.cMajorPentatonic();

document.body.onmousedown = function() {
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
  if (mouseDown) {
    targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.01;
    targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.01;
  }
  if (isSceneThree === true){
    _mouseX = mouseX.map(0, window.innerWidth, 5, 15);
    _mouseY = mouseY.map(0, window.innerHeight, 5, 35);
    //noiseOne.playbackRate = _mouseX + 10;
  }
}

function onMouseDown(event) {

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  mouseXOnMouseDown = event.clientX - windowHalfX;
  targetRotationOnMouseDownX = targetRotationX;
  mouseYOnMouseDown = event.clientY - windowHalfY;
  targetRotationOnMouseDownY = targetRotationY;
  //markovNote(); // console logs next chain note
  event.preventDefault();
  var data = {
    x: event.clientX,
    y: event.clientY
  };
  socket.emit('mouse', data);

  var note = Math.floor(Math.random() * scale.length);

  if (isSceneOne == true) {
    var intersectsClick = raycaster.intersectObjects(parentTransform.children);
    if (intersectsClick.length > 0) {
      if (isBlackSceneOne == false) {
        intersectsClick[0].object.material.color.set(0x181818);
      }
      if (isBlackSceneOne == true) {
        intersectsClick[0].object.material.color.set(0xffffff);
      }
      if (isBlackSceneOne == true) {
        isBlackSceneOne = false;
      } else {
        isBlackSceneOne = true;
      }
      StartAudioContext(Tone.context).then(function() {
        currentSynthesizer.triggerAttackRelease(scale[note], "4n");
        console.log(note);
        printPhraseDialog(scale[note]);
      })
      //Tone.context.resume().then(() => {
      //playNote("4n", scalePlaying[randomSequenceOfNotes]);
      /*var logs = document.getElementById('monitor_dialog'),
        output_node = document.createElement("div");
      output_node.innerHTML = scale[note];
      logs.appendChild(output_node);
      logs.scrollTop = logs.scrollHeight;*/
      //});
    } else {}
  }
  if (isSceneFour == true) {
    var intersectsClick = raycaster.intersectObjects(parentTransformQuatro.children);
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
        //playNote("4n", scalePlaying[randomSequenceOfNotes]);
        printPhraseDialog(scale[note]);
      });
    }
  }
}

function onMouseUp(event) {
  event.preventDefault();
  if (isSceneTwo === true){
    var e = Math.floor(Math.random() * 1) + 1;
    parentTransformDois.rotation.y += (e - parentTransformDois.rotation.y) * 0.001;
    e = (e - parentTransformDois.rotation.x);
    var i = [
    '4m',
    '8m',
    '16m',
    '32m',
    '2n',
    '4n',
    '8n',
    '16n',
    '32n',
    '2t',
    '4t',
    '8t',
    '16t',
    '32t',
    ];
    var randomVel = Math.floor(Math.random()*i.length);
    var randomElement = i[randomVel]
    noiseOneFrequencyTime(randomElement);
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
  stats1.update();
  stats2.update();
  stats3.update();
  theta += 0.2;
  if (isSceneOne == true || isSceneFour == true) {
    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
  }
  camera.lookAt(scene.position);
  raycaster.setFromCamera(mouse, camera);
  renderer.clear();
  renderer.render(scene, camera);
  renderer.clearDepth();
  renderer.render(scene2, camera2);
  renderer.autoClear = false;
  document.getElementById('save3d').addEventListener('click', save3d);

  if (renderPostOne == true) {
    composerOne.render();
  }
  if (renderPostTwo == true) {
    composerTwo.render();
  }
  if (renderPostThree == true) {
    composerThree.render();
  }
  if (renderPostFour == true) {
    composerFour.render();
  }
  if (isSceneThree === true) {
    var time = Date.now() * 0.001;
    var rx = Math.sin(time * 0.7) * 0.5,
      ry = Math.sin(time * 0.3) * 0.5,
      rz = Math.sin(time * 0.2) * 0.5;
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    /*autoFilterOne.set({
      "octaves": rx + 1
    });*/
    camera.lookAt(scene.position);
    parentTransformTres.rotation.x = rx;
    parentTransformTres.rotation.y = ry;
    parentTransformTres.rotation.z = rz;
  }

  parentTransformDois.rotation.y += (targetRotationX - parentTransformDois.rotation.y) * 0.1;
  finalRotationY = (targetRotationY - parentTransformDois.rotation.x);

  if (parentTransformDois.rotation.x <= 1 && parentTransformDois.rotation.x >= -1) {
    parentTransformDois.rotation.x += finalRotationY * 0.1;
  }
  if (parentTransformDois.rotation.x > 1) {
    parentTransformDois.rotation.x = 1
  } else if (parentTransformDois.rotation.x < -1) {
    parentTransformDois.rotation.x = -1
  }
}

/* Dynamic Scale Control */

var customScale;
customScale = scale;
var _customScale;
var __customScale;

function customScaleCortex(data) {
  if (data) {
    var e = data.toUpperCase();
    var a = e.replace('S', '#');
    if (scale.includes(a) === true) {
      for (var i = scale.length - 1; i >= 0; i--) {
        if (scale[i] === a) {
          scale.splice(i, 1);
        }
      }
    } else {
      scale.push(a);
      printPhraseDialog("Added " + a + " to the scale Vector" );
    }
    //console.log(scale);
  }
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}

function randomPoint() {
  return new THREE.Vector3(THREE.Math.randFloat(-1, 1), THREE.Math.randFloat(-1, 1), THREE.Math.randFloat(-1, 1));
}

$(document).mouseleave(function() {
  mouseDown = 0;
});

/* Scheduling Printing */

function doStuff() {
  nrSeconds++;
  console.log("%c" + "Second [" + nrSeconds + "]", 'background: #000; color: #fff');
  /*if (nrSeconds === 10)
   topBar('refresh');
   50000 is 50 seconds, not 5 minutes. 5 minutes would be 5 * 60 * 1000 = 300000
   Here to refresh automatically.*/
}
setInterval(doStuff, 10000);

/* Startup Animation */

function Move() {
  var elem = document.getElementById("myBar");
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
    }
    if (width === 100) {
      document.getElementById("myProgress1").classList.add('hidden');
      document.getElementById("myProgress").classList.add('hidden');
      document.getElementById("myBar").classList.add('hidden');
      document.getElementById("start").classList.add('hidden');
    }
    if (width === 99) {
      loadWarning();
    }
  }
}

function fadeIn() {
  document.getElementById("myProgress1").style.display = "block";
  document.getElementById("myProgress").style.display = "block";
  document.getElementById("myBar").style.display = "block";
}

function loadWarning(v) {
  if (detectmob() === false) {
    iziToast.info({
      title: '',
      backgroundColor: 'rgba(10,10,10,1)',
      messageColor: 'white',
      progressBarColor: 'white',
      titleColor: 'white',
      class: '',
      position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      close: true,
      zindex: 99999,
      message: 'Press Space Bar for GUI',
    });
  }
}

/* Download Engine */

function takeScreenshot() {
  var w = window.open('', '');
  w.document.title = "Screenshot";
  //w.document.body.style.backgroundColor = "red";
  var img = new Image();
  // Without 'preserveDrawingBuffer' set to true, we must render now
  renderer.render(scene, camera);
  img.src = renderer.domElement.toDataURL();
  w.document.body.appendChild(img);
  printPhraseDialog("Opened a tab with a Screenshot of the Camera");
}

function saveScreenshot() {
  renderer.domElement.toDataURL('image/png');
}

function saveAsImage() {
  var imgData, imgNode;
  try {
    var strMime = "image/jpeg";
    imgData = renderer.domElement.toDataURL(strMime);
    saveFile(imgData.replace(strMime, strDownloadMime), "akson.jpg");
  } catch (e) {
    console.log(e);
    return;
  }
  printPhraseDialog("Saved to disk a Screenshot of the Camera");
}

var saveFile = function(strData, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    document.body.appendChild(link); //Firefox requires the link to be in the body
    link.download = filename;
    link.href = strData;
    link.click();
    document.body.removeChild(link); //remove the link when done
  } else {
    location.replace(uri);
  }
}

function save3d() {
  var equiManaged = new CubemapToEquirectangular(renderer, true);
  equiManaged.update(camera, scene);
  printPhraseDialog("Saved to disk a 360 field of the Camera");
}
