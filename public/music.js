window.onload = function() {
  console.clear();
  // can have Tone.Js setup
};

$(document).ready(function() {});
/*
CHANGE MOBILE THINGS AND PUT DIFFERENT BEHAVIORS (TONE PAYBACK IN VISUALS)
loading bar on query
call js function from another page
document.onload = function ...
document.addEventListener("DOMContentLoaded", function(){
    //....
});
FADE OUT ON BUTTON CLICK
METER CUBOS NA FRENTE
SE MOBILE DEVICE ENTAO -> .VISUALS
POR O OUTRO INSTRUMENTO
CHECK DIALS
VER SE CONSIGO TER UM VISUALIZADOR PARA A OSCILAÇAO OUTRO PARA O PIANO
*/

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


// --------------------------- TOGGLE ---------------------------


var toggle = new Nexus.Toggle('#power', {
  'size': [40, 20],
  'state': false
});

toggle.on('change', function(v) {
  if (v == false) {
    droneSynth.vol.volume.rampTo(-Infinity, 1);
  }
  if (v == true) {
    droneSynth.vol.volume.rampTo(-20, 1);
  }
});

var feedbackToggle = new Nexus.Toggle('#feedbackToggle', {
  'size': [40, 20],
  'state': false
});
feedbackToggle.on('change', function(v) {
  if (v == true) {
    droneSynth.filterFeedback.chain(droneSynth.compressor, droneSynth.vol, droneSynth.verb, Tone.Master);
  } else {
    droneSynth.filterFeedback.disconnect(droneSynth.compressor, droneSynth.vol, droneSynth.verb, Tone.Master);
  }
});

var vibratoToggle = new Nexus.Toggle('#vibratoToggle', {
  'size': [40, 20],
  'state': false
});
vibratoToggle.on('change', function(v) {
  if (v == true) {
    droneSynth.vibrato.chain(droneSynth.compressor, droneSynth.vol, droneSynth.verb, Tone.Master);
  } else {
    droneSynth.vibrato.disconnect(droneSynth.compressor, droneSynth.vol, droneSynth.verb, Tone.Master);
  }
});

var ppdelayToggle = new Nexus.Toggle('#ppdelayToggle', {
  'size': [40, 20],
  'state': false
});
ppdelayToggle.on('change', function(v) {
  if (v == true) {
    droneSynth.ppdelay.chain(droneSynth.compressor, droneSynth.vol, droneSynth.verb, Tone.Master);
  } else {
    droneSynth.ppdelay.disconnect(droneSynth.compressor, droneSynth.vol, droneSynth.verb, Tone.Master);
  }
});

var autopanToggle = new Nexus.Toggle('#autopanToggle', {
  'size': [40, 20],
  'state': false
});
autopanToggle.on('change', function(v) {
  if (v == true) {
    droneSynth.autopan.chain(droneSynth.compressor, droneSynth.vol, droneSynth.verb, Tone.Master);
  } else {
    droneSynth.autopan.disconnect(droneSynth.compressor, droneSynth.vol, droneSynth.verb, Tone.Master);
  }
});



// --------------------------- SLIDERS --------------------------

var modulation = new Nexus.Slider('#modulation', {
  'size': [20, 50],
});
modulation.min = 10;
modulation.max = 20;
modulation.on('change', function(v) {
  console.log("fm slider1 modulation");
  droneSynth.fm.modulationIndex.rampTo(v, 0.1);
  droneSynth.fm2.modulationIndex.rampTo(v, 0.1);
});

var reverb_slider_um = new Nexus.Slider('#reverb_slider_um', {
  'size': [20, 50],
});
reverb_slider_um.min = 0;
reverb_slider_um.max = 0.8;
reverb_slider_um.on('change', function(v) {
  console.log("reverb slider roomsize");
  droneSynth.verb.roomSize.value = v;
});

var harmonicity = new Nexus.Slider('#harmonicity', {
  'size': [20, 50],
  'min': 0,
  'max': 1,
})
//harmonicity.min = 0;
//harmonicity.max = 10;
harmonicity.on('change', function(v) {
  console.log("fm slider1 harmonicity");
  console.log(v);
  droneSynth.fm.harmonicity.rampTo(v, 0.1);
  droneSynth.fm2.harmonicity.rampTo(v, 0.1);
})

// --------------------------- POSITIONS -------------------------

var position_one = new Nexus.Position('#position_one', {
  'size': [150, 50],
});
position_one.minX = 50;
position_one.maxX = 1400;
position_one.minY = 0;
position_one.maxY = 0.5; //see this
position_one.on('change', function(v) {
  console.log("filter slider frequency x q value y");
  droneSynth.filter.frequency.value = v.x;
  droneSynth.filter.Q.value = v.y;
});

//position_one.element.className = 'example';

var position_two = new Nexus.Position('#position_two', {
  'size': [150, 50],
  'x': 1, // initial x value
  'y': 1, // initial x value
});
position_two.minX = 0;
position_two.maxX = 1;
position_two.minY = 100;
position_two.maxY = 1000;
position_two.x = 1;
position_two.y = 1000;

position_two.on('change', function(v) {
  console.log("reverb slider wet value x damp y");
  droneSynth.verb.wet.value = v.x;
  droneSynth.verb.dampening.value = v.y;
});

// --------------------------- OSCILOSCOPE -------------------------

var oscilloscope = new Nexus.Oscilloscope('#oscilloscope', {
  'size': [400, 150]
});
oscilloscope.connect(Tone.Master);

// --------------------------- PIANO -------------------------------

var piano = new Nexus.Piano('#piano_one', {
  'size': [400, 150],
  //  size: [window.innerWidth, window.innerHeight / 15],
  'mode': 'button', // 'button', 'toggle', or 'impulse'
  'lowNote': 60, //0
  'highNote': 96 //120
});

piano.colorize("accent", "#ff0");
piano.colorize("fill", "#ff0");
//piano.colorize("dark", "#ff0"); TECLAS PRETAS
piano.colorize("light", "#a8a8a8"); //CINZENTO CLARO
piano.colorize("mediumDark", "#ff0");
piano.colorize("mediumLight", "#333"); // PARTE DE FORA

piano.on("change", function(v) {
  console.log(Tone.Frequency(v.note, "midi").toNote());
  if (v.state === true) {
    synth.triggerAttack(Tone.Frequency(v.note, "midi").toNote());
  } else if (v.state === false) {
    synth.triggerRelease(Tone.Frequency(v.note, "midi").toNote());
  }
});

/*
v.note = "C4";
synth.triggerAttack(v.note);
console.log("NOTE = " + v.note); //imprime a nota
console.log("NOTE = " + v.state); //imprime o state
*/



// --------------------------- ENVELOPE ---------------------------

var envelope = new Nexus.Envelope('#envelope_one', {
  'size': [400, 50],
  'noNewPoints': true,
  'points': [{
      x: 0.1,
      y: 0.2,
    },
    {
      x: 0.35,
      y: 0.6
    },
    {
      x: 0.65,
      y: 0.2
    },
    {
      x: 0.9,
      y: 0.4
    },
  ]
});

envelope.on('change', function(v) {
  //envelope.sortPoints();
  //droneSynth.fm.harmonicity.value = 4;
  //droneSynth.fm2.harmonicity.value = 4;
});

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
  console.log(Tone.Transport.bpm.getSecondsAtTime());
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

// --------------------------- MIDI -------------------------------

if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
    sysex: false // check what sysex is
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