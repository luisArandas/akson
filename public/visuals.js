//https://threejs.org/examples/#webgl_interactive_cubes
//https://threejs.org/examples/#webgl_clipping_advanced
//CHECK THE MODAL ON BUTTON CLICK
//DESENHAR NUM PAPEL
//VER OS FAVICONS
//MAKE AN ABOUT

$(document).ready(function() {
  $('.leftmenutrigger').on('click', function(e) {
    $('.side-nav').toggleClass("open");
    e.preventDefault();
  });
});

var camera, scene, renderer;
var geometry, material, mesh;
var data;
var glitchPass;

var pattern = ["", "A4", "A#4", "D5", "F5", "", "A2", "", "", "A4", "A#4", "D5", "E5", "", "A#2", ""];
var pattern2 = ["1", "", "", "", "", "", "", "", "1", "1", "", "", "", "", "", ""];
var synth;

var distortion = new Tone.Distortion(0.6);
var tremolo = new Tone.Tremolo().start();

var oscilador = new Tone.Oscillator({
  "frequency": 550,
  "volume": -20
}).chain(distortion, tremolo, Tone.Master);

var synth = new Tone.Synth().toMaster()




init();
animate();

function init() {

  socket = io.connect(window.location.origin);
  socket.on('mouse', newDrawing);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;

  scene = new THREE.Scene();
  //scene.fog = new THREE.Fog(0x000000, 1, 1000);

  geometry = new THREE.BoxGeometry(2, 2, 2);
  material = new THREE.MeshBasicMaterial({

    flatShading: true,
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    wireframe: true,
    wireframeLinewidth: 2,
    wireframeLinejoin: 'round',
    wireframeLinecap: 'round'
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.autoClear = false;
  document.body.appendChild(renderer.domElement);

  window.addEventListener('mousedown', onMouseDown, false);
  window.addEventListener('mouseup', onMouseUp, false);
  window.addEventListener('resize', onWindowResize, false);


  composer = new THREE.EffectComposer(renderer);
  composer.addPass(new THREE.RenderPass(scene, camera));
  glitchPass = new THREE.GlitchPass();
  glitchPass.renderToScreen = true;
  glitchPass.goWild = true;
  composer.addPass(glitchPass);

  synth = createSynthWithEffects();

  Tone.Transport.bpm.value = 67;
  Tone.Transport.start();

  var seq = new Tone.Sequence(playNote, pattern, "8n");
  seq.start();
}

function animate() {

  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  var corFundo = Math.random() * (0.15 - 0) + 0;
  scene.background = new THREE.Color(corFundo, corFundo, corFundo);
  composer.render();
  //renderer.render(scene, camera);
}

function onMouseDown(event) {

  event.preventDefault();

  var data = {
    mouseX: 0,
    mouseY: 0
  };

  mouseX = (event.clientX);
  mouseY = (event.clientY);

  socket.emit('mouse', event.clientX);

  oscilador.start();
  Tone.Master.volume.rampTo(0, 0.05);
}

function onMouseUp(event) {
  event.preventDefault();
  oscilador.stop();
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  composer.render();
  //renderer.render(scene, camera);
}

function myFunc() {
  synth.triggerAttackRelease('C4', '8n')
}

function createSynthWithEffects() {
  let vol = new Tone.Volume(-12).toMaster();

  let reverb = new Tone.Freeverb(0.9).connect(vol);
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

  return polySynth.connect(vibrato);
}

function playNote(time, note) {
  if (note != "") {
    synth.triggerAttackRelease(note, "16n");
  }
}

function newDrawing() {
  synth.triggerAttackRelease('C2', '4n');
}