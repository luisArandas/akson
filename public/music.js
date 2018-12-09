$(document).ready(function() {
  $('.leftmenutrigger').on('click', function(e) {
    $('.side-nav').toggleClass("open");
    e.preventDefault();
  });
});

Nexus.context = Tone.context;

var camera, scene, renderer;
var geometry, material, mesh;
var data;

var envelope = new Nexus.Envelope('#envelope_one', {
  'size': [400, 150]
});

envelope.value = 0.5;
envelope.colorize("accent", "#ff0");
envelope.colorize("fill", "#333");

var dial = new Nexus.Dial('#dial_one', {
  'size': [75, 75],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
});

dial.value = 0.5
dial.colorize("accent", "#ff0")
dial.colorize("fill", "#333")

var oscilloscope = new Nexus.Oscilloscope('#oscilloscope', {
  'size': [400, 150]
})
oscilloscope.value = 0.5;
oscilloscope.colorize("accent", "#ff0");
oscilloscope.colorize("fill", "#333");
oscilloscope.connect(Tone.Master);

var pattern = ["", "A4", "A#4", "D5", "F5", "", "A2", "", "", "A4", "A#4", "D5", "E5", "", "A#2", ""];
var pattern2 = ["1", "", "", "", "", "", "", "", "1", "1", "", "", "", "", "", ""];
var synth;

var distortion = new Tone.Distortion(2.5);
var tremolo = new Tone.Tremolo().start();


var oscilador = new Tone.Oscillator({
  "frequency": 550,
  "volume": -20
}).chain(distortion, tremolo, Tone.Master);

var synth = new Tone.Synth().toMaster()

_init();
//_init_animate();

function _init() {

  socket = io.connect(window.location.origin);
  socket.on('mouse', newDrawing);

  synth = createSynthWithEffects();

  Tone.Transport.bpm.value = 20;
  Tone.Transport.start();

  var seq = new Tone.Sequence(playNote, pattern, "8n");
  seq.start();

  window.addEventListener('mousedown', onMouseDown, false);
  window.addEventListener('mouseup', onMouseUp, false);
  window.addEventListener('resize', onWindowResize, false);

}

/*function _init_animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}*/

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
  let vol = new Tone.Volume(-15).toMaster();

  var compressor = new Tone.Compressor(-99, -50); //CHECK THIS

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
  polySynth.chain(compressor);
  return polySynth.connect(vibrato);
}

function playNote(time, note) {
  if (note != "") {
    synth.triggerAttackRelease(note, "16n");
  }
}

function myFunc() {
  synth.triggerAttackRelease('C8', '8n');
}

function newDrawing() {
  synth.triggerAttackRelease('C6', '10n');
}