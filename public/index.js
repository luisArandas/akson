/**
 * @author Luis Arandas  http://luisarandas.org
 */

$(document).ready(function() {
  if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
  }
  if (detectmob() === false) { //&& onMouseDown() === true) {
  }
});

//http://urmston.xyz/Tone.Editor/examples/midi.html
//HOW TO USE MANY PAGES AND CALL FUNCTIONS WITHOUT HTML /INCLUDE
//OPEN THE TONE EDITOR OTHER PAGE
//INCLUDE OTHER JS HERE
//change scenes and add widgets
//RAMPAS NO VOLUME

var container;
var camera,
  scene,
  raycaster,
  renderer,
  parentTransform,
  parentTrasformDois,
  sphereInter;
var radius = 100;
var theta = 0;
var teclaUm = false,
  teclaDois = false,
  teclaTres = false,
  teclaQuatro = false,
  teclaCinco = false,
  teclaSeis = false,
  teclaSete = false,
  teclaOito = false,
  teclaNove = false,
  teclaDez = false;
var sideBar = false;
var mouse = new THREE.Vector2(),
  INTERSECTED;

var glitchPass = new THREE.GlitchPass();
var afterimagePass = new THREE.AfterimagePass();

var effectBloom = new THREE.BloomPass(0.5);
var effectFilm = new THREE.FilmPass(0.35, 0.025, 648, false);
var effectFilmBW = new THREE.FilmPass(0.35, 0.5, 2048, true);
var effectDotScreen = new THREE.DotScreenPass(new THREE.Vector2(0, 0), 0.5, 0.8);


var composerOne;
var composerTwo;
var composerThree;
var parentTransformTres = new THREE.Object3D();

var whichVisuals;


init();
animate();

function init() {

  socket = io.connect(window.location.origin);
  socket.on('mouse', newDrawing);

  container = document.createElement('div');
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  //camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);


  var planosCamara = new THREE.BoxGeometry(1, 10, 1);
  var materialum = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  var planoCamaraUm = new THREE.Mesh(planosCamara, materialum);
  var planoCamaraDois = new THREE.Mesh(planosCamara, materialum);
  var planoCamaraTres = new THREE.Mesh(planosCamara, materialum);
  scene.add(camera);

  var material = new THREE.LineBasicMaterial({
    color: 0xffffff
  });

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

  parentTransform = new THREE.Object3D();

  for (var i = 0; i < 150; i++) {
    var object;
    object = new THREE.Line(lineGeometry, material);
    object.position.x = 1;
    object.position.y = 1; //Math.floor(Math.random() * 6) + 1;
    object.position.z = Math.random() * 400 - 200;
    object.rotation.x = 1;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;
    parentTransform.add(object);
  }
  scene.add(parentTransform);

  var materialPainel = new THREE.LineBasicMaterial({
    color: 0xffffff
  });

  parentTransformDois = new THREE.Object3D();

  for (var i = 0; i < 5; i++) {
    var painel;
    painel = new THREE.PlaneGeometry(5, 400, 0);
    var plane = new THREE.Mesh(painel, materialPainel);
    plane.position.set(Math.floor(Math.random() * 100) + 1, -100, 1);
    parentTransformDois.add(plane);
  }
  scene.add(parentTransformDois);

  raycaster = new THREE.Raycaster();
  raycaster.linePrecision = 3;

  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);


  for (var i = 0; i < 100; i++) {
    var geometry = new THREE.BoxGeometry(10, 1500, 10);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0x5f5f5f,
      //wireframe: true
    }));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    //  object.rotation.y = Math.random() * 2 * Math.PI;
    //  object.rotation.z = Math.random() * 2 * Math.PI;
    parentTransformTres.add(object);
  }

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('webgl2');
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    context: context,
    antialias: true
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousedown', onMouseDown, false);
  window.addEventListener("touchstart", handleStart, false);
  document.addEventListener('mousemove', onDocumentMouseMove, false);

  /*effectBleach.uniforms["opacity"].value = 0.95;
  effectSepia.uniforms["amount"].value = 0.9;
  effectVignette.uniforms["offset"].value = 0.95;
  effectVignette.uniforms["darkness"].value = 1.6;
*/


  composerOne = new THREE.EffectComposer(renderer);
  composerOne.addPass(new THREE.RenderPass(scene, camera));
  composerOne.addPass(glitchPass);


  composerTwo = new THREE.EffectComposer(renderer);
  composerTwo.addPass(new THREE.RenderPass(scene, camera));
  composerTwo.addPass(afterimagePass);

  composerThree = new THREE.EffectComposer(renderer);
  composerThree.addPass(new THREE.RenderPass(scene, camera));
  composerThree.addPass(effectFilm);

  glitchPass.renderToScreen = false;
  afterimagePass.renderToScreen = false;

  //METER OS IFS SE FUNCIONA CARREGAR DUAS VEZES
  /*
  Q_81 W_87 E_69 R_82 T_84 Y_89 U_85 I_73 O_79 P_80
  32 == SPACE
  */

  document.addEventListener("keydown", function(event) {
    if (event.which == "32") {
      if (sideBar == false) {
        document.getElementById("mySidenav").style.width = "250px";
        console.log(scene.children);
      }
      if (sideBar == true) {
        document.getElementById("mySidenav").style.width = "0px";
      }
      if (sideBar == true) {
        sideBar = false;
      } else {
        sideBar = true;
      }
    }
    if (event.which == "81") {
      console.log("Q");
      if (teclaUm == false) {
        camera.add(planoCamaraUm);
        planoCamaraUm.position.set(0, 0, -3);
        parentTransform.children.forEach(function(v) {
          v.rotation.y = 1;
        });
        whichVisuals = event.which;
        socket.emit('visuals', whichVisuals);
      }
      if (teclaUm == true) {
        camera.remove(planoCamaraUm);
        planoCamaraUm.position.set(0, 0, 10);
        parentTransform.children.forEach(function(v) {
          v.rotation.y = Math.random() * 2 * Math.PI;
        });
      }
      if (teclaUm == true) {
        teclaUm = false;
      } else {
        teclaUm = true;
      }
    }
    if (event.which == "87") {
      console.log("W");
      if (teclaDois == false) {
        camera.add(planoCamaraDois);
        planoCamaraDois.scale.x = 6;
        planoCamaraDois.position.set(0, 4.5, -3);
      }
      if (teclaDois == true) {
        camera.remove(planoCamaraDois);
        planoCamaraDois.position.set(0, 0, 10);
        parentTransform.children.forEach(function(v) {
          v.rotation.y = Math.random() * 2 * Math.PI;
        });
      }
      if (teclaDois == true) {
        teclaDois = false;
      } else {
        teclaDois = true;
      }
    }
    if (event.which == "69") {
      console.log("E");
      if (teclaTres == false) {
        scene.remove(parentTransform);
        scene.add(parentTransformTres);
      }
      if (teclaTres == true) {
        scene.add(parentTransform);
        scene.remove(parentTransformTres);
      }
      if (teclaTres == true) {
        teclaTres = false;
      } else {
        teclaTres = true;
      }
    }
    if (event.which == "82") {
      console.log("R");
    }
    if (event.which == "84") {
      console.log("T");
    }
    if (event.which == "89") {
      console.log("Y");
    }
    if (event.which == "85") {
      console.log("U");
    }
    if (event.which == "73") {
      console.log("I");
    }
    if (event.which == "79") {
      console.log("O");
    }
    if (event.which == "80") {
      console.log("P");
      parentTransformDois.children.forEach(function(v) {
        v.position.set(Math.floor(Math.random() * 100) + 1, -100, 1);
      });
    }
    /*
    SEGUNDA
    A_65 S_83 D_68 F_70 G_71 H_72 J_74 K_75 L_76 Ç_186
    */
    if (event.which == "65") {
      console.log("A");
      afterimagePass.renderToScreen = false;
      glitchPass.goWild = true;
      if (glitchPass.renderToScreen == false) {
        glitchPass.renderToScreen = true;
      } else if (glitchPass.renderToScreen == true) {
        glitchPass.renderToScreen = false;
      }
    }
    if (event.which == "83") {
      console.log("S");
      afterimagePass.renderToScreen = false;
      glitchPass.goWild = false;
      if (glitchPass.renderToScreen == false) {
        glitchPass.renderToScreen = true;
      } else if (glitchPass.renderToScreen == true) {
        glitchPass.renderToScreen = false;
      }
    }
    if (event.which == "68") {
      console.log("D");
      glitchPass.renderToScreen = false;
      if (afterimagePass.renderToScreen == false) {
        afterimagePass.renderToScreen = true;
      } else if (afterimagePass.renderToScreen == true) {
        afterimagePass.renderToScreen = false;
      }
    }
    if (event.which == "70") {
      console.log("F");
      effectBloom.renderToScreen = true;
      /*  if (afterimagePass.renderToScreen == false) {
          afterimagePass.renderToScreen = true;
        } else if (afterimagePass.renderToScreen == true) {
          afterimagePass.renderToScreen = false;
        }*/
    }
    if (event.which == "71") {
      console.log("G");
    }
    if (event.which == "72") {
      console.log("H");
    }
    if (event.which == "74") {
      console.log("J");
    }
    if (event.which == "75") {
      console.log("K");
    }
    if (event.which == "76") {
      console.log("L");
    }
    if (event.which == "186") {
      console.log("Ç");
    }
  });

  var geometry = new THREE.SphereBufferGeometry(5);
  var material = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });
  sphereInter = new THREE.Mesh(geometry, material);
  sphereInter.visible = false;
  scene.add(sphereInter);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function render() {
  var corFundo = Math.random() * (0.15 - 0) + 0;
  parentTransformDois.children.forEach(function(v) {
    v.material.color.setRGB(corFundo, corFundo, corFundo);
  });
  //scene.background = new THREE.Color(corFundo, corFundo, corFundo);
  theta += 0.2;
  camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
  camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta)); //check sin and cos
  camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
  camera.lookAt(scene.position);
  camera.updateMatrixWorld();

  raycaster.setFromCamera(mouse, camera);
  //parentTransform.children
  var intersects = raycaster.intersectObjects(parentTransformTres.children);
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

  /*
  RAYCASTER
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(parentTransformDois.children, true);
  if (intersects.length > 0) {
    sphereInter.visible = true;
    sphereInter.position.copy(intersects[0].point);
  } else {
    sphereInter.visible = false;
  }*/

  renderer.render(scene, camera);
  composerOne.render();
  composerTwo.render();
  composerThree.render();
}

function newDrawing() {}

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
//              MUSIC
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------


Nexus.context = Tone.context;
Nexus.clock.start();
Nexus.colors.accent = "#ffffff";
Nexus.colors.fill = "#000000";

/*nx.onload = function() {
  nx.sendsTo("node");
  // nx.sendsTo(function(data){
  //     socket.emit('nx', { id: this.canvasID, data: data });
  // });
}*/

// --------------------------- SYNTH ---------------------------

//WORKS THE PLAYER

var pattern = ["", "A4", "A#4", "D5", "F5", "", "A2", "", "", "A4", "A#4", "D5", "E5", "", "A#2", ""];
var pattern2 = ["1", "", "", "", "", "", "", "", "1", "1", "", "", "", "", "", ""];
var synth;

synth = createSynthWithEffects();

Tone.Transport.bpm.value = 20;
Tone.Transport.start();
//console.log(Tone.Transport.bpm.value);



//var seq = new Tone.Sequence(playNote, pattern, "8n");
//seq.start();



function createSynthWithEffects() {
  vol = new Tone.Volume(-15).toMaster();

  compressor = new Tone.Compressor(-30, 30).toMaster(); //CHECK THE COMPRESSOR

  reverb = new Tone.Freeverb(1.0).connect(vol);
  reverb.wet.value = 0.1;

  delay = new Tone.FeedbackDelay(0.304, 0.5).connect(reverb);
  delay.wet.value = 0.1;

  vibrato = new Tone.Vibrato(5, 0.2).connect(delay);

  polySynth = new Tone.PolySynth(3, Tone.Synth, {
    "oscillator": {
      "type": "sine"
    },
    "envelope": {
      "attack": 0.01,
      "decay": 0.1,
      "sustain": 0.2,
      "release": 4,
    }
  });
  return polySynth.connect(vibrato, compressor);
}

function playNote(time, note) {
  if (note != "") {
    synth.triggerAttackRelease(note, "16n");
  }
}

playNote("16n", "A3");

// --------------------------- OSCILOSCOPE -------------------------
/*
var oscilloscope = new Nexus.Oscilloscope('#oscilloscope', {
  'size': [400, 150]
});
oscilloscope.connect(Tone.Master);
*/
// ------------------------- SOCKETS -------------------------------

socket = io.connect(window.location.origin);
socket.on('mouse', newDrawing);
socket.on('visuals', broadCastVisuals);


var data;

function onMouseDown(event) {
  event.preventDefault();
  var data = {
    mouseX: 0,
    mouseY: 0
  };
  mouseX = (event.clientX);
  mouseY = (event.clientY);
  socket.emit('mouse', event.clientX);
  console.log("teste");

  var intersectsClick = raycaster.intersectObjects(parentTransformTres.children);
  if (intersectsClick.length > 0) {
    playNote("16n", "A4");
  } else {}
}

function onMouseUp(event) {
  event.preventDefault();
}

function onWindowResize() {}

function myFunc() {}

function newDrawing() {
  //FUNCIONA E ISTO QUE TENHO DE MANDAR
  console.log("okok");
}

// ---------------------- LAPTOP KEYBOARD -------------------------

//(Z o-) (X o+) linha do meio CDEFGABCDEF
//link here https://github.com/kylestetz/AudioKeys

var keyboard = new AudioKeys();

keyboard.down(function(note) {
  //note.keyCode, note.frequency, note.velocity, note.isActive, note.note;
  //piano.toggleKey(note.note, true);
});

keyboard.up(function(note) {
  //piano.toggleKey(note.note, false);
});

// --------------------------- MIDI -------------------------------

if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
    sysex: false
  }).then(onMIDISuccess, onMIDIFailure);
} else {
  alert("No MIDI support in your browser.");
}

function onMIDISuccess(midiAccess) {
  midi = midiAccess;

  var inputs = midi.inputs.values();
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
    input.value.onmidimessage = onMIDIMessage;
  }
  console.log('MIDI Access Object', midiAccess);
}

function onMIDIMessage(event) {
  data = event.data;
  midiValOne = data[0];
  midiValTwo = data[1];
  midiValThree = data[2];

  if (midiValOne == 176 && midiValTwo == 8) {
    console.log(midiValThree);
    reverb_slider_um.value = midiValThree;
    harmonicity.value = midiValThree;
    modulation.value = midiValThree;
  }
}

function onMIDIFailure(e) {
  console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. " + e);
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

function handleStart() {
  scene.background = new THREE.Color(0xffffff);
}