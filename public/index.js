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

//A CENA DO RUI OUTSIDE CONTROLS
//RAMPAS NO VOLUME
//TRIGGER THE NOISE ON MOUSEDOWN
//ADD THE NOISE IN THE SHADERS
//I STILL GET CRACKS ON THE SPEAKERS
//SCENE TRANSITIONS

var container;
var camera,
  scene,
  raycaster,
  renderer,
  parentTransform,
  parentTrasformDois,
  parentTransformQuatro,
  sphereInter;
var radius = 100;
var theta = 0;
var teclaQ = false,
  teclaW = false,
  teclaE = false,
  teclaR = false,
  teclaT = false,
  teclaY = false,
  teclaU = false,
  teclaI = false,
  teclaO = false,
  teclaP = false;
var sideBar = false;
var mouse = new THREE.Vector2(),
  INTERSECTED;

var glitchPass = new THREE.GlitchPass();
var afterimagePass = new THREE.AfterimagePass();
var effectSobel;
var pixelPass, params;

var composerOne;
var composerTwo;
var composerThree;
var composerFour;

var parentTransformTres = new THREE.Object3D();

var whichVisuals;
//ESTAMOS EM PENTATONICA MAIOR
var sequenceOfNotesC = ['C2', 'D2', 'E2', 'G2', 'A2', 'C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5', 'C6'];
var sequenceOfNotesD = ['D2', 'E2', 'F#2', 'A2', 'B2', 'D3', 'E3', 'F#3', 'A3', 'B3', 'D4', 'E4', 'F#4', 'A4', 'B4', 'D5', 'E5', 'F#5', 'A5', 'B5', 'D6'];
var sequenceOfNotesE = ['E2', 'F#2', 'G#2', 'B2', 'C#2', 'E3', 'F#3', 'G#3', 'B3', 'C#3', 'E4', 'F#4', 'G#4', 'B4', 'C#4', 'E5', 'F#5', 'G#5', 'B5', 'C#5', 'E6'];
var sequenceOfNotesF = ['F2', 'G2', 'A2', 'C2', 'D2', 'F3', 'G3', 'A3', 'C3', 'D3', 'F4', 'G4', 'A4', 'C4', 'D4', 'F5', 'G5', 'A5', 'C5', 'D5', 'F6'];
var sequenceOfNotesG = ['G2', 'A2', 'B2', 'D2', 'E2', 'G3', 'A3', 'B3', 'D3', 'E3', 'G4', 'A4', 'B4', 'D4', 'E4', 'G5', 'A5', 'B5', 'D5', 'E5', 'G6'];
var sequenceOfNotesA = ['A2', 'B2', 'C#2', 'E2', 'F#2', 'A3', 'B3', 'C#3', 'E3', 'F#3', 'A4', 'B4', 'C#4', 'E4', 'F#4', 'A5', 'B5', 'C#5', 'E5', 'F#5', 'A6'];
var sequenceOfNotesB = ['B2', 'C#2', 'D#2', 'F#2', 'G#2', 'B3', 'C#3', 'D#3', 'F#3', 'G#3', 'B4', 'C#4', 'D#4', 'F#4', 'G#4', 'B5', 'C#5', 'D#5', 'F#5', 'G#5', 'B6'];
var scalePlaying;

var hideShow = false;
var currentSynth;

var glitchVarOne;
var glitchVarTwo;
var glitchVarThree;

var renderPostOne = false;
var renderPostTwo = false;
var renderPostThree = false;
var renderPostFour = false;

var randomSequenceOfNotes;

init();
animate();

function init() {

  socket = io.connect(window.location.origin);
  socket.on('mouse', newDrawing);
  socket.on('socketid', function(socketid) {
    console.log(socketid + ' Key');
    var div = document.getElementById('botRightPage');
    div.innerHTML += 'Key - ' + socketid + '<br>' + '//////////////////////////' + '<br>';
  });
  socket.on('socketnumber', function(connections) {
    console.log("There are currently " + connections + " connections");
    var div = document.getElementById('botRightPage');
    div.innerHTML += "There are currently " + connections + " connections" + '<br>' + '//////////////////////////' + '<br>';
  });

  container = document.createElement('div');
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
  //camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
  camera.position.z = 1000;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
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
  //scene.add(parentTransform);

  raycaster = new THREE.Raycaster();
  raycaster.linePrecision = 3;

  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);



  for (var i = 0; i < 90; i++) {
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
  scene.add(parentTransformTres);

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
  effectSobel = new THREE.ShaderPass(THREE.SobelOperatorShader);
  effectSobel.uniforms.resolution.value.x = window.innerWidth;
  effectSobel.uniforms.resolution.value.y = window.innerHeight;
  composerThree.addPass(effectSobel);

  composerFour = new THREE.EffectComposer(renderer);
  composerFour.addPass(new THREE.RenderPass(scene, camera));
  pixelPass = new THREE.ShaderPass(THREE.PixelShader);
  pixelPass.uniforms.resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
  pixelPass.uniforms.resolution.value.multiplyScalar(window.devicePixelRatio);
  params = {
    pixelSize: 16,
    postprocessing: true
  };
  pixelPass.uniforms.pixelSize.value = params.pixelSize;
  composerFour.addPass(pixelPass);


  glitchPass.renderToScreen = false;
  afterimagePass.renderToScreen = false;
  effectSobel.renderToScreen = false;
  pixelPass.renderToScreen = false;

  //METER OS IFS SE FUNCIONA CARREGAR DUAS VEZES
  /*
  Q_81 W_87 E_69 R_82 T_84 Y_89 U_85 I_73 O_79 P_80
  32 == SPACE
  */

  var div = document.getElementById('botLeftPage');
  div.innerHTML += "We are currently in C" + '<br>';
  scalePlaying = sequenceOfNotesC;

  document.addEventListener("keydown", function(event) {
    if (event.which == "32") {
      if (sideBar == false) {
        document.getElementById("mySidenav").style.width = '100%';
        document.getElementById("mySidenav").style.backgroundColor = 'rgb(0, 0, 0, 0.5)';
        console.log(scene.children);
        console.log(false);
      }
      if (sideBar == true) {
        document.getElementById("mySidenav").style.width = '0%';

        document.getElementById("mySidenav").style.backgroundColor = 'rgb(0, 0, 0, 0)';
        console.log(true);
      }
      if (sideBar == true) {
        sideBar = false;
      } else {
        sideBar = true;
      }
    }
    if (event.which == "81") {
      console.log("Q");
      if (teclaQ == false) {
        scene.remove(parentTransformTres);
      }
      if (teclaQ == true) {
        scene.add(parentTransformTres);
      }
      if (teclaQ == true) {
        teclaQ = false;
      } else {
        teclaQ = true;
      }
    }
    if (event.which == "87") {
      console.log("W");
      if (teclaW == false) {}
      if (teclaW == true) {}
      if (teclaW == true) {
        teclaW = false;
      } else {
        teclaW = true;
      }
    }
    if (event.which == "69") {
      console.log("E");
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
      if (teclaP == false) {
        scene.add(parentTransform);
        scene.remove(parentTransformTres);
      }
      if (teclaP == true) {
        scene.remove(parentTransform);
        scene.add(parentTransformTres);
      }
      if (teclaP == true) {
        teclaP = false;
      } else {
        teclaP = true;
      }
    }

    /*
    SEGUNDA
    A_65 S_83 D_68 F_70 G_71 H_72 J_74 K_75 L_76 Ç_186
    */
    if (event.which == "65") {
      console.log("A");
      afterimagePass.renderToScreen = false;
      effectSobel.renderToScreen = false;
      pixelPass.renderToScreen = false;
      glitchPass.goWild = true;
      if (glitchPass.renderToScreen == false) {
        noiseOne.start();
        renderPostOne = true;
        glitchPass.renderToScreen = true;
      } else if (glitchPass.renderToScreen == true) {
        renderPostOne = false;
        noiseOne.stop();
        glitchPass.renderToScreen = false;
      }
      console.log(glitchVarOne);
    }
    if (event.which == "83") {
      console.log("S");
      afterimagePass.renderToScreen = false;
      effectSobel.renderToScreen = false;
      pixelPass.renderToScreen = false;
      glitchPass.goWild = false;
      if (glitchPass.renderToScreen == false) {
        renderPostOne = true;
        glitchPass.renderToScreen = true;
      } else if (glitchPass.renderToScreen == true) {
        renderPostOne = false;
        glitchPass.renderToScreen = false;
      }
    }
    if (event.which == "68") {
      console.log("D");
      glitchPass.renderToScreen = false;
      pixelPass.renderToScreen = false;
      effectSobel.renderToScreen = false;
      if (afterimagePass.renderToScreen == false) {
        renderPostTwo = true;
        afterimagePass.renderToScreen = true;
      } else if (afterimagePass.renderToScreen == true) {
        renderPostTwo = true;
        afterimagePass.renderToScreen = false;
      }
    }
    if (event.which == "70") {
      console.log("F");
      glitchPass.renderToScreen = false;
      afterimagePass.renderToScreen = false;
      pixelPass.renderToScreen = false;
      if (effectSobel.renderToScreen == false) {
        renderPostThree = true;
        effectSobel.renderToScreen = true;
      } else if (effectSobel.renderToScreen == true) {
        renderPostThree = false;
        effectSobel.renderToScreen = false;
      }
    }
    if (event.which == "71") {
      console.log("G");
      glitchPass.renderToScreen = false;
      afterimagePass.renderToScreen = false;
      effectSobel.renderToScreen = false;

      if (pixelPass.renderToScreen == false) {
        renderPostFour = true;
        pixelPass.renderToScreen = true;
      } else if (pixelPass.renderToScreen == true) {
        renderPostFour = false;
        pixelPass.renderToScreen = false;
      }
    }
    if (event.which == "72") {
      console.log("H");
      currentSynth = polySynthUm;
    }
    if (event.which == "74") {
      console.log("J");
      currentSynth = polySynthDois;
    }
    if (event.which == "75") {
      console.log("K");
      currentSynth = polySynthTres;
    }
    if (event.which == "76") {
      console.log("L");
      currentSynth = polySynthQuatro;
    }
    if (event.which == "186") {
      console.log("Ç");
      currentSynth = polySynthCinco;
    }

    /*
    TERCEIRA
    Z_90 X_88 C_67 V_86 B_66 N_78 M_77
    , and . are not yet
    */
    if (event.which == "90") {
      console.log("Z");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in C ";
      scalePlaying = sequenceOfNotesC;
    }
    if (event.which == "88") {
      console.log("X");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in D ";
      scalePlaying = sequenceOfNotesD;
    }
    if (event.which == "67") {
      console.log("C");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in E ";
      scalePlaying = sequenceOfNotesE;
    }
    if (event.which == "86") {
      console.log("V");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in F ";
      scalePlaying = sequenceOfNotesF;
    }
    if (event.which == "66") {
      console.log("B");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in G ";
      scalePlaying = sequenceOfNotesG;
    }
    if (event.which == "78") {
      console.log("N");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in A ";
      scalePlaying = sequenceOfNotesA;
    }
    if (event.which == "77") {
      console.log("M");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in B ";
      scalePlaying = sequenceOfNotesB;
    }

    //-------- MENOS
    if (event.which == "189") {
      if (hideShow == false) {
        document.getElementById("topLeftPage").style.color = 'rgba(0,0,0,0)';
        document.getElementById("topRightPage").style.color = 'rgba(0,0,0,0)';
        document.getElementById("botLeftPage").style.color = 'rgba(0,0,0,0)';
        document.getElementById("botRightPage").style.color = 'rgba(0,0,0,0)';
      }
      if (hideShow == true) {
        document.getElementById("topLeftPage").style.color = 'rgba(255,255,255,1)';
        document.getElementById("topRightPage").style.color = 'rgba(255,255,255,1)';
        document.getElementById("botLeftPage").style.color = 'rgba(255,255,255,1)';
        document.getElementById("botRightPage").style.color = 'rgba(255,255,255,1)';
      }
      if (hideShow == true) {
        hideShow = false;
      } else {
        hideShow = true;
      }
    }
  });
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


Tone.Transport.bpm.value = 20;
Tone.Transport.start();

var compressor = new Tone.Compressor(-50, 30);

var polySynthUm = new Tone.PolySynth(3, Tone.Synth, {
  "oscillator": {
    "type": "sawtooth6"
  }
}).chain(compressor, Tone.Master);

var distortion = new Tone.Distortion(0.6);
var tremolo = new Tone.Tremolo().start();

var polySynthDois = new Tone.PolySynth(4, Tone.Synth).chain(distortion, tremolo, Tone.Master);

var polySynthTres = new Tone.Synth({
  oscillator: {
    type: 'triangle8'
  },
  envelope: {
    attack: 2,
    decay: 1,
    sustain: 0.4,
    release: 4
  }
}).chain(distortion, tremolo, Tone.Master);

var polySynthQuatro = new Tone.Synth({
  oscillator: {
    type: 'fmsquare',
    modulationType: 'sawtooth',
    modulationIndex: 3,
    harmonicity: 3.4
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0.1,
    release: 0.1
  }
}).chain(distortion, tremolo, Tone.Master);

var polySynthCinco = new Tone.FMSynth({
  harmonicity: 10,
  modulationIndex: 10,
  detune: 0,
  oscillator: {
    type: "sine"
  },
  envelope: {
    attack: 0.01,
    decay: 0.01,
    sustain: 1,
    release: 3
  },
  modulation: {
    type: "sine"
  },
  modulationEnvelope: {
    attack: 0.5,
    decay: 0,
    sustain: 1,
    release: 0.5
  }
}).toMaster();
var limiter = new Tone.Limiter(-90);


var noiseOne = new Tone.Noise("pink");

var autoFilterOne = new Tone.AutoFilter({
  "frequency": "8m",
  "min": 800,
  "max": 15000
}).connect(Tone.Master);
noiseOne.connect(autoFilterOne);
autoFilterOne.start();

var noiseDois = new Tone.Noise("brown").toMaster();
//noiseDois.start();

polySynthSeis = createSynthWithEffects();

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

currentSynth = polySynthSeis;





// --------------------------- OSCILOSCOPE GAIN AND VOL -------------------------

var oscilloscope = new Nexus.Oscilloscope('#oscilloscope', {
  'size': [250, 100]
});
oscilloscope.connect(Tone.Master);

var dialVolume = new Nexus.Dial('#volumedial', {
  'size': [40, 40],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': -30,
  'max': 0,
  'step': 0.01,
  'value': -15
});
dialVolume.on('change', function(v) {
  polySynth.volume.value = v;
});

var dialGain = new Nexus.Dial('#gaindial', {
  'size': [40, 40],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
});
dialGain.on('change', function(v) {
  console.log(v);
});


// ------------------------- SOCKETS -------------------------------

var data;

function onMouseDown(event) {

  event.preventDefault();
  var data = {
    x: event.clientX,
    y: event.clientY
  };

  socket.emit('mouse', data);

  randomSequenceOfNotes = Math.floor(Math.random() * scalePlaying.length);
  console.log(randomSequenceOfNotes);

  var intersectsClick = raycaster.intersectObjects(parentTransformTres.children);
  if (intersectsClick.length > 0) {
    currentSynth.triggerAttackRelease(scalePlaying[randomSequenceOfNotes], "4n");
    //playNote("4n", scalePlaying[randomSequenceOfNotes]);
    var div = document.getElementById('botLeftPage');
    div.innerHTML += scalePlaying[randomSequenceOfNotes] + '/ ';
  } else {}
}

function onMouseUp(event) {
  event.preventDefault();
}

function onWindowResize() {}

function myFunc() {}

function newDrawing(data) {
  //THIS IS WHAT HAPPENS IN ANOTHER CLIENT
  console.log(data.x);
  console.log(data.y);
  randomSequenceOfNotes = Math.floor(Math.random() * scalePlaying.length);
  currentSynth.triggerAttackRelease(scalePlaying[randomSequenceOfNotes], "4n");
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


function render() {
  var corFundo = Math.random() * (0.15 - 0) + 0;
  //if I want glitch cinzentos
  //scene.background = new THREE.Color(corFundo, corFundo, corFundo);
  theta += 0.2;
  camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
  camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta)); //check sin and cos
  camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
  camera.lookAt(scene.position);
  camera.updateMatrixWorld();

  raycaster.setFromCamera(mouse, camera);
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

  renderer.render(scene, camera);

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
}