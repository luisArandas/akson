$(document).ready(function() {
  $('.leftmenutrigger').on('click', function(e) {
    $('.side-nav').toggleClass("open");
    e.preventDefault();
  });
});

Nexus.context = Tone.context;

var osc = Nexus.context.createOscillator()
osc.connect(Nexus.context.destination)
osc.start(0)
osc.stop(0.1)
Nexus.clock.start();


Nexus.colors.accent = "#2cc";

droneSynth = {
  fm: new Tone.FMOscillator(100, "sawtooth", "sawtooth").start(),
  fm2: new Tone.FMOscillator(112.5, "sawtooth", "sawtooth").start(),
  vol: new Tone.Volume(-Infinity),
  pan: new Tone.Panner(0),
  filter: new Tone.Filter(100, "bandpass"),
  verb: new Tone.Freeverb(),
  compressor: new Tone.Compressor(-30, 10)
}

droneSynth.fm.connect(droneSynth.filter)
droneSynth.fm2.connect(droneSynth.filter);
droneSynth.filter.chain(droneSynth.compressor, droneSynth.vol, droneSynth.pan, droneSynth.verb, Tone.Master)


droneSynth.fm.harmonicity.value = 4
droneSynth.fm2.harmonicity.value = 4

var toggle = new Nexus.Toggle('#power', {
  'size': [40, 20],
  'state': false
})

toggle.on('change', function(v) {
  if (v) {
    droneSynth.vol.volume.rampTo(-20, 1)
  } else {
    droneSynth.vol.volume.rampTo(-Infinity, 1)
  }
})


var timbre_slider = new Nexus.Slider('#timbre_slider', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
})
timbre_slider.min = 10;
timbre_slider.max = 20;
timbre_slider.on('change', function(v) {
  droneSynth.fm.modulationIndex.rampTo(v, 0.1)
  droneSynth.fm2.modulationIndex.rampTo(v, 0.1)
})
timbre_slider.value = 0


var pan_slider = new Nexus.Slider('#pan_slider', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
})
pan_slider.on('change', function(v) {
  droneSynth.pan.pan.value = v.value;
})


var filter_slider = new Nexus.Position('#filter_slider', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
})
filter_slider.minX = 0;
filter_slider.maxX = 1400;
filter_slider.minY = 0;
filter_slider.maxY = 10;
filter_slider.on('change', function(v) {
  droneSynth.filter.frequency.value = v.x;
  droneSynth.filter.Q.value = v.y;
})


droneSynth.verb.wet.value = 0.2

var oscilloscope = new Nexus.Oscilloscope('#oscilloscope', {
  'size': [300, 150]
})
oscilloscope.connect(Tone.Master);


/*
Tone.context = Nexus.context;
Tone.Transport.bpm.value = 20;
Tone.Transport.start();


var pattern = ["", "A4", "A#4", "D5", "F5", "", "A2", "", "", "A4", "A#4", "D5", "E5", "", "A#2", ""];
var pattern2 = ["1", "", "", "", "", "", "", "", "1", "1", "", "", "", "", "", ""];

var polySynth = new Tone.PolySynth(3, Tone.Synth, {
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

var synth = new Tone.Synth().toMaster();
synth = createSynthWithEffects();

socket = io.connect(window.location.origin);
socket.on('mouse', newDrawing);


var seq = new Tone.Sequence(playNote, pattern, "8n");
seq.start();

window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('resize', onWindowResize, false);

var masterCompressor = new Tone.Compressor({
  "threshold": -6,
  "ratio": 3,
  "attack": 0.5,
  "release": 0.1
});
//give a little boost to the lows
var lowBump = new Tone.Filter(200, "lowshelf");
//route everything through the filter
//and compressor before going to the speakers
Tone.Master.chain(lowBump, masterCompressor);


function createSynthWithEffects() {
  let vol = new Tone.Volume(-15).toMaster();

  let compressor = new Tone.Compressor(-50, 0);

  let filter = new Tone.Filter(100, "bandpass");

  let reverb = new Tone.Freeverb(1.0).connect(vol);
  reverb.wet.value = 0.1;

  let delay = new Tone.FeedbackDelay(0.304, 0.5).connect(reverb);
  delay.wet.value = 0.9;

  let vibrato = new Tone.Vibrato(5, 0.2).connect(delay);

  polySynth.chain(compressor);
  return polySynth.connect(vibrato);
}


//CHECK MIDI ON THE WEB
//CHECK SYSTEM PREFERENCES
//BOTOES PARA PHASER E ASSIM
/*
  container = document.createElement('div');
  document.body.appendChild(container);
  var info = document.createElement('div');
  info.style.position = 'absolute';
  info.style.top = '10px';
  info.style.width = '100%';
  info.style.textAlign = 'center';
  info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - interactive lines';
  container.appendChild(info);

  drone.power.on('change',function(v) {
    if (v) {
      droneSynth.vol.volume.rampTo(-20,1)
    } else {
      droneSynth.vol.volume.rampTo(-Infinity,1)
    }
  })



// --------------------------- ENVELOPE ---------------------------

var envelope = new Nexus.Envelope('#envelope_one', {
  'size': [400, 150]
});
envelope.value = 0.5;
envelope.colorize("accent", "#ff0");
envelope.colorize("fill", "#000000");


// --------------------------- SLIDERS2D ---------------------------


var position = new Nexus.Position('#position_one', {
  'size': [150, 150],
  'x': 0.5, // initial x value
  'minX': 0,
  'maxX': 50,
  'stepX': 0,
  'y': 0.5, // initial y value
  'minY': 0,
  'maxY': 1,
  'stepY': 0
});
position.colorize("accent", "#ff0");
position.colorize("fill", "#333");
position.on('change', function(v) {
  console.log(v.x);
  polySynth.set({
    "vibrato": {
      "frequency": v.x
    }
  });
});
var position_two = new Nexus.Position('#position_two', {
  'size': [150, 150],
  'x': 0.5, // initial x value
  'minX': 0,
  'maxX': 1,
  'stepX': 0,
  'y': 0.5, // initial y value
  'minY': 0,
  'maxY': 1,
  'stepY': 0
});
position_two.colorize("accent", "#ff0");
position_two.colorize("fill", "#333");


// --------------------------- PIANO ---------------------------


var piano = new Nexus.Piano('#piano_one', {
  'size': [400, 150],
  'mode': 'button', // 'button', 'toggle', or 'impulse'
  'lowNote': 24,
  'highNote': 60
});

piano.colorize("accent", "#ff0");
piano.colorize("fill", "#ff0");
//piano.colorize("dark", "#ff0"); TECLAS PRETAS
piano.colorize("light", "#a8a8a8"); //CINZENTO CLARO
piano.colorize("mediumDark", "#ff0");
piano.colorize("mediumLight", "#333"); // PARTE DE FORA

piano.on('change', function(v) {
  if (v.state == true) {
    oscilador_piano.frequency.value = (v.note + 400);
    console.log(oscilador_piano.frequency.value);
    oscilador_piano.start();
  }
  if (v.state == false) {
    oscilador_piano.stop();
  }
  /*v.note = "C4";
  synth.triggerAttack(v.note);
  console.log("NOTE = " + v.note); //imprime a nota
  console.log("NOTE = " + v.state); //imprime o state*/
/*
});
var oscilador_piano = new Tone.Oscillator({
  "frequency": 440,
  "volume": -10
}).toMaster();


// --------------------------- DIALS ---------------------------

var dial = new Nexus.Dial('#dial_one', {
  'size': [75, 75],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
});
var dial_one_number = new Nexus.Number('#dial_one_number', {
  'size': [60, 30],
});
dial_one_number.link(dial);
dial_one_number.colorize("fill", "#333");
dial_one_number.colorize("dark", "#ff0");
dial.value = 0.5;
dial.colorize("accent", "#ff0");
dial.colorize("fill", "#333");

dial.on('change', function(v) {
  polySynth.set({
    "envelope": {
      "attack": v
    }
  });
});

// ------------------------ OSCILLOSCOPE ------------------------


var oscilloscope = new Nexus.Oscilloscope('#oscilloscope', {
  'size': [400, 150]
})
oscilloscope.value = 0.5;
oscilloscope.colorize("accent", "#ff0");
oscilloscope.colorize("fill", "#333");
oscilloscope.connect(Tone.Master);


// ------------------------------------------------------------


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
}

function onMouseUp(event) {
  event.preventDefault();
}

function onWindowResize() {

  //camera.aspect = window.innerWidth / window.innerHeight;
  //camera.updateProjectionMatrix();
  //renderer.setSize(window.innerWidth, window.innerHeight);
  //composer.setSize(window.innerWidth, window.innerHeight);
  //composer.render();
  //renderer.render(scene, camera);
  //oscilloscope.resize(20, 20);
}

function myFunc() {
  synth.triggerAttackRelease('C4', '8n')
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
  synth.triggerAttackRelease('C3', '10n');
}*/