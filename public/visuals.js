$(document).ready(function() {
  if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
  }
});


//http://urmston.xyz/Tone.Editor/examples/midi.html
//HOW TO USE MANY PAGES AND CALL FUNCTIONS WITHOUT HTML /INCLUDE
//OPEN THE TONE EDITOR OTHER PAGE
//INCLUDE OTHER JS HERE

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
var mouse = new THREE.Vector2();
var glitchPass = new THREE.GlitchPass();
var shaderBleach = THREE.BleachBypassShader;
var shaderSepia = THREE.SepiaShader;
var shaderVignette = THREE.VignetteShader;
var effectBleach = new THREE.ShaderPass(shaderBleach);
var effectSepia = new THREE.ShaderPass(shaderSepia);
var effectVignette = new THREE.ShaderPass(shaderVignette);
var effectBloom = new THREE.BloomPass(0.5);
var effectFilm = new THREE.FilmPass(0.35, 0.025, 648, false);
var effectFilmBW = new THREE.FilmPass(0.35, 0.5, 2048, true);
var effectDotScreen = new THREE.DotScreenPass(new THREE.Vector2(0, 0), 0.5, 0.8);
var composer;

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
  document.addEventListener('mousemove', onDocumentMouseMove, false);

  glitchPass.renderToScreen = false;
  composer = new THREE.EffectComposer(renderer);
  composer.renderToScreen = true;

  composer.addPass(new THREE.RenderPass(scene, camera));
  composer.addPass(glitchPass);

  //METER OS IFS SE FUNCIONA CARREGAR DUAS VEZES
  /*
  Q_81 W_87 E_69 R_82 T_84 Y_89 U_85 I_73 O_79 P_80
  */

  document.addEventListener("keydown", function(event) {
    if (event.which == "32") {
      if (sideBar == false) {
        document.getElementById("mySidenav").style.width = "250px";
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

      }
      if (teclaTres == true) {

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
      glitchPass.goWild = true;
      if (glitchPass.renderToScreen == false) {
        glitchPass.renderToScreen = true;
      } else if (glitchPass.renderToScreen == true) {
        glitchPass.renderToScreen = false;
      }
    }
    if (event.which == "83") {
      console.log("S");
      glitchPass.goWild = false;
      if (glitchPass.renderToScreen == false) {
        glitchPass.renderToScreen = true;
      } else if (glitchPass.renderToScreen == true) {
        glitchPass.renderToScreen = false;
      }
    }
    if (event.which == "79") {
      console.log("D");
    }
    if (event.which == "80") {
      console.log("F");
    }
    if (event.which == "65") {
      console.log("G");
    }
    if (event.which == "83") {
      console.log("H");
    }
    if (event.which == "79") {
      console.log("J");
    }
    if (event.which == "80") {
      console.log("K");
    }
    if (event.which == "79") {
      console.log("L");
    }
    if (event.which == "80") {
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
//change render context dinamically

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
  composer.render();
}

function newDrawing() {}

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
//MUSIC
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------


Nexus.context = Tone.context;
Nexus.clock.start();
Nexus.colors.accent = "#ff0";
Nexus.colors.fill = "#333";

/*nx.onload = function() {
  nx.sendsTo("node");
  // nx.sendsTo(function(data){
  //     socket.emit('nx', { id: this.canvasID, data: data });
  // });
}*/

droneSynth = {
  fm: new Tone.FMOscillator(100, "sine", "sine").start(),
  fm2: new Tone.FMOscillator(112.5, "sine", "sine").start(),
  vol: new Tone.Volume(-Infinity),
  filter: new Tone.Filter(100, "bandpass"),
  filterFeedback: new Tone.FeedbackCombFilter(0, 0), //default é 0.1 e 0.5 delayTime e Resonance nao ha nada mais interessante neste
  vibrato: new Tone.Vibrato(5, 0.1), //default maxDelay 0.0.5 frequency 5 depth 0.1 e type sine;
  ppdelay: new Tone.PingPongDelay(0.25, 1), //defaults delayTime 0.25 maxDelayTime 1;
  verb: new Tone.Freeverb(),
  autopan: new Tone.AutoPanner(), //frequency 1 default sine  default depth 1
  compressor: new Tone.Compressor(-30, 10)
}

droneSynth.fm.connect(droneSynth.filter);
droneSynth.fm2.connect(droneSynth.filter);
droneSynth.fm.connect(droneSynth.filterFeedback);
droneSynth.fm2.connect(droneSynth.filterFeedback);
droneSynth.fm.connect(droneSynth.vibrato);
droneSynth.fm2.connect(droneSynth.vibrato);
droneSynth.fm.connect(droneSynth.ppdelay);
droneSynth.fm2.connect(droneSynth.ppdelay);
droneSynth.fm.connect(droneSynth.autopan);
droneSynth.fm2.connect(droneSynth.autopan);
droneSynth.filter.chain(droneSynth.compressor, droneSynth.vol, droneSynth.verb, Tone.Master);
droneSynth.vol.volume.rampTo(-20, 1); //IF I WANT TO CHANGE STARTUP
droneSynth.fm.harmonicity.value = 4;
droneSynth.fm2.harmonicity.value = 4;

// --------------------------- SYNTH ---------------------------

//WORKS THE PLAYER

var pattern = ["", "A4", "A#4", "D5", "F5", "", "A2", "", "", "A4", "A#4", "D5", "E5", "", "A#2", ""];
var pattern2 = ["1", "", "", "", "", "", "", "", "1", "1", "", "", "", "", "", ""];
var synth;

synth = createSynthWithEffects();

Tone.Transport.bpm.value = 20;
Tone.Transport.start();
//console.log(Tone.Transport.bpm.value);


var seq = new Tone.Sequence(playNote, pattern, "8n");
seq.start();

function createSynthWithEffects() {
  let vol = new Tone.Volume(-15).toMaster();

  var compressor = new Tone.Compressor(-30, 30).toMaster(); //CHECK THE COMPRESSOR

  let reverb = new Tone.Freeverb(1.0).connect(vol);
  reverb.wet.value = 0.1;

  let delay = new Tone.FeedbackDelay(0.304, 0.5).connect(reverb);
  delay.wet.value = 0.1;

  let vibrato = new Tone.Vibrato(5, 0.2).connect(delay);

  let polySynth = new Tone.PolySynth(3, Tone.Synth, {
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

// --------------------------- OSCILOSCOPE -------------------------

var oscilloscope = new Nexus.Oscilloscope('#oscilloscope', {
  'size': [400, 150]
});
oscilloscope.connect(Tone.Master);

// ------------------------- SOCKETS -------------------------------

socket = io.connect(window.location.origin);
socket.on('mouse', newDrawing);
window.addEventListener('mousedown', onMouseDown, false);

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
  piano.toggleKey(note.note, true);
});

keyboard.up(function(note) {
  piano.toggleKey(note.note, false);
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

// --------------------------------------------------------------------

function functionSliderOne(val) {
  //droneSynth.filter.frequency.value = val;
  synth.set({
    "envelope": {
      "attack": val
    }
  });
}

function functionSliderTwo(val) {
  synth.set({
    "envelope": {
      "decay": val
    }
  });
}

function functionSliderThree(val) {
  synth.set({
    "envelope": {
      "sustain": val
    }
  });
}

function functionSliderFour(val) {
  synth.set({
    "envelope": {
      "release": val
    }
  });
}
//ADD FLOATS INSTEAD OF INTEGERS

/*droneSynth.vol.volume.rampTo(-Infinity, 1); //-20
droneSynth.filter.frequency.value = v.x;
droneSynth.filter.Q.value = v.y;
droneSynth.verb.roomSize.value = v;
droneSynth.fm.modulationIndex.rampTo(v, 0.1);
droneSynth.fm2.modulationIndex.rampTo(v, 0.1);
droneSynth.verb.wet.value = v.x;
droneSynth.verb.dampening.value = v.y;
droneSynth.fm.harmonicity.rampTo(v, 0.1);
droneSynth.fm2.harmonicity.rampTo(v, 0.1);*/