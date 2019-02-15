/**
 * @author Luis Arandas  http://luisarandas.org
 */



var instrumentOne = false;
var instrumentTwo = false;
var instrumentThree = false;
var instrumentFour = false;

var connectSoundVisuals = false;

//EQUALIZE THE MASTER
//STOP THE VISUALS
//CRIAR O BOTAO DE SEPARATE AUDIO FROM VISUALS
//SET PRESETS
//TOCAR MAIS QUE UMA NOTA QUANDO EU onMouseDown
//https://tonejs.github.io/docs/r13/CtrlMarkov
//STREAM OS CONTROLOS

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

Tone.Transport.bpm.value = 20;
Tone.Transport.start();

var noiseOne = new Tone.Noise("pink");
var autoFilterOne = new Tone.AutoFilter({
  "frequency": "8m",
  "min": 800,
  "max": 15000
}).connect(Tone.Master);
noiseOne.connect(autoFilterOne);
autoFilterOne.start();
noiseOne.volume.value = -99;
noiseOne.start();
noiseOne.volume.rampTo(-10, 10);

vol = new Tone.Volume(-5).toMaster();

compressor = new Tone.Compressor(-25, 10).connect(vol);

reverb = new Tone.Freeverb(0.8).connect(compressor);
reverb.wet.value = 0.1;

polySynth = new Tone.PolySynth(6, Tone.Synth, {
  harmonicity: 10,
  modulationIndex: 10,
  detune: 0,
  oscillator: {
    //sawtooth6
    //triangle8
    //fmsquare
    //square
    //osc.type = 'sine2'
    //synth.set("detune", -1200);
    type: "sine",
    modulationType: 'sawtooth',
    modulationIndex: 3,
    harmonicity: 3.4
    /*
    THIS
    phase  : 0 ,
    osc.phase = 180; //flips the phase of the oscillator
    partials  : [] ,
    partialCount  : 0
    */
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.2,
    release: 4,
  },
  modulation: {
    type: "sine"
  },
  modulationEnvelope: {
    attack: 0.5,
    decay: 0,
    sustain: 1,
    release: 0.5
  },
});
polySynth.connect(reverb);



var phaser = new Tone.Phaser({
  "frequency": 500,
  "octaves": 5,
  "baseFrequency": 1000
}).toMaster();


/* ---------------------------- NEXUS ---------------------------- */


var oscilloscope = new Nexus.Oscilloscope('#oscilloscope', {
  'size': [243, 100]
});
oscilloscope.connect(Tone.Master);

//----------------------

var synthvolume = new Nexus.Dial('#synthvolume', {
  'size': [40, 40],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'absolute', // "absolute" or "relative"
  'min': -30,
  'max': 0,
  'step': 0.001,
  'value': -15
});
synthvolume.on('change', function(v) {
  polySynth.volume.value = v;
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  console.log(_v);
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "Synth volume -" + _v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
});

var backgroundvolume = new Nexus.Dial('#backgroundvolume', {
  'size': [40, 40],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'absolute', // "absolute" or "relative"
  'min': -99,
  'max': 0,
  'step': 0.001,
  'value': -15
});
backgroundvolume.on('change', function(v) {
  Tone.Master.volume.value = v;
  console.log(Tone.Master.volume.value);
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  console.log(_v);
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "Background volume -" + _v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
});

var mainvolume = new Nexus.Dial('#mainvolume', {
  'size': [40, 40],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'absolute', // "absolute" or "relative"
  'min': -50,
  'max': -10,
  'step': 0.001,
  'value': -12
});
mainvolume.on('change', function(v) {
  noiseOne.volume.value = v;
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  console.log(_v);
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "Master volume -" + _v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
});

//----------------------

var synthAttack = new Nexus.Slider('#synthAttack', {
  min: 0.01,
  max: 0.8,
  step: 0.001,
  mode: 'absolute',
  value: 0.01
});
synthAttack.on('change', function(v) {
  polySynth.set({
    "envelope": {
      "attack": v
    }
  });
});

var synthDecay = new Nexus.Slider('#synthDecay', {
  min: 0,
  max: 1,
  step: 0.01,
  mode: 'absolute',
  value: 0.1
});
synthDecay.on('change', function(v) {
  polySynth.set({
    "envelope": {
      "decay": v
    }
  });
});

var synthSustain = new Nexus.Slider('#synthSustain', {
  min: 0,
  max: 1,
  step: 0.01,
  mode: 'absolute',
  value: 0.2
});
synthSustain.on('change', function(v) {
  polySynth.set({
    "envelope": {
      "sustain": v
    }
  });
});

var synthRelease = new Nexus.Slider('#synthRelease', {
  min: 0,
  max: 10,
  step: 0.01,
  mode: 'absolute',
  value: 4
});
synthRelease.on('change', function(v) {
  polySynth.set({
    "envelope": {
      "release": v
    }
  });
});

//----------------------

var harmonicity = new Nexus.Slider('#harmonicity', {
  min: 0,
  max: 50,
  step: 0.1,
  mode: 'absolute',
  value: 10
});
harmonicity.on('change', function(v) {
  polySynth.set({
    "harmonicity": v
  });
});

var modulationindex = new Nexus.Slider('#modulationindex', {
  min: 0,
  max: 50,
  step: 0.1,
  mode: 'absolute',
  value: 10
});
modulationindex.on('change', function(v) {
  polySynth.set({
    "modulationIndex": v
  });
});

var detune = new Nexus.Slider('#detune', {
  min: 0,
  max: 5000,
  step: 0.1,
  mode: 'absolute',
  value: 0
});
detune.on('change', function(v) {
  polySynth.set({
    "detune": v
  });
});

var oscillatorModulationIndex = new Nexus.Slider('#oscillatorModulationIndex', {
  min: 0,
  max: 10,
  step: 0.01,
  mode: 'absolute',
  value: 3
});
oscillatorModulationIndex.on('change', function(v) {
  polySynth.set({
    "oscillator": {
      "modulationIndex": v
    }
  });
});

var oscillatorHarmonicity = new Nexus.Slider('#oscillatorHarmonicity', {
  min: 0,
  max: 10,
  step: 0.01,
  mode: 'absolute',
  value: 3.4
});
oscillatorHarmonicity.on('change', function(v) {
  polySynth.set({
    "oscillator": {
      "harmonicity": v
    }
  });
});

//----------------------

var modulationEnvelopeAttack = new Nexus.Slider('#modulationEnvelopeAttack', {
  min: 0.01,
  max: 0.8,
  step: 0.001,
  mode: 'absolute',
  value: 0.5
});
modulationEnvelopeAttack.on('change', function(v) {
  polySynth.set({
    "modulationEnvelope": {
      "attack": v
    }
  });
});

var modulationEnvelopeDecay = new Nexus.Slider('#modulationEnvelopeDecay', {
  min: 0.01,
  max: 0.8,
  step: 0.001,
  mode: 'absolute',
  value: 0
});
modulationEnvelopeDecay.on('change', function(v) {
  polySynth.set({
    "modulationEnvelope": {
      "decay": v
    }
  });
});

var modulationEnvelopeSustain = new Nexus.Slider('#modulationEnvelopeSustain', {
  min: 0.01,
  max: 0.8,
  step: 0.001,
  mode: 'absolute',
  value: 0.8
});
modulationEnvelopeSustain.on('change', function(v) {
  polySynth.set({
    "modulationEnvelope": {
      "sustain": v
    }
  });
});

var modulationEnvelopeRelease = new Nexus.Slider('#modulationEnvelopeRelease', {
  min: 0.01,
  max: 0.8,
  step: 0.001,
  mode: 'absolute',
  value: 0.5
});
modulationEnvelopeRelease.on('change', function(v) {
  polySynth.set({
    "modulationEnvelope": {
      "release": v
    }
  });
});


var reverbRoomSize = new Nexus.Slider('#reverbRoomSize', {
  min: 0.01,
  max: 0.8,
  step: 0.001,
  mode: 'absolute',
  value: 0.8
});
reverbRoomSize.on('change', function(v) {
  reverb.roomSize.value = v;
});

var reverbWetValue = new Nexus.Slider('#reverbWetValue', {
  min: 0.01,
  max: 0.8,
  step: 0.001,
  mode: 'absolute',
  value: 0.1
});
reverbWetValue.on('change', function(v) {
  reverb.wet.value = v;
});

var reverbDampValue = new Nexus.Slider('#reverbDampValue', {
  min: 2000,
  max: 4000,
  step: 0.1,
  mode: 'absolute',
  value: 3000
});
reverbDampValue.on('change', function(v) {
  reverb.dampening.value = v;
});


/* ------------------------- NOISE -------------------------- */

var noiseOnePlaybackRate = new Nexus.Slider('#noiseOnePlaybackRate', {
  min: 0.5,
  max: 35,
  step: 0.01,
  mode: 'absolute',
  value: 1
});
noiseOnePlaybackRate.on('change', function(v) {
  noiseOne.playbackRate = v;
});


var autoFilterFrequency = new Nexus.Slider('#autoFilterFrequency', {
  min: 500,
  max: 5000,
  step: 0.1,
  mode: 'absolute',
  value: 500
});
autoFilterFrequency.on('change', function(v) {
  autoFilterOne.set({
    "frequency": v
  });
  console.log("autoFilter Frequency" + v);
});

var autoFilterMin = new Nexus.Slider('#autoFilterMin', {
  min: 100,
  max: 1000,
  step: 0.1,
  mode: 'absolute',
  value: 3000
});
autoFilterMin.on('change', function(v) {
  noiseOne.min = v;
  console.log(noiseOne.min);
});


var autoFilterMax = new Nexus.Slider('#autoFilterMax', {
  min: 1000,
  max: 15000,
  step: 0.1,
  mode: 'absolute',
  value: 3000
});
autoFilterMax.on('change', function(v) {
  noiseOne.max = v;
  console.log(noiseOne.max);
});


var autoFilterWet = new Nexus.Slider('#autoFilterWet', {
  min: 0,
  max: 1,
  step: 0.01,
  mode: 'absolute',
  value: 0.5
});
autoFilterWet.on('change', function(v) {
  noiseOne.wet = v;
  console.log(noiseOne.wet);
});

var autoFilterDepth = new Nexus.Slider('#autoFilterDepth', {
  min: 0,
  max: 1,
  step: 0.01,
  mode: 'absolute',
  value: 1
});
autoFilterDepth.on('change', function(v) {
  noiseOne.depth = v;
  console.log(noiseOne.depth);
});

/*
depth  : 1 ,
baseFrequency  : 200 ,
octaves  : 2.6 ,
type  : lowpass ,
rolloff  : -12 ,
Q  : 1
*/

/*

check this
var player = new Tone.Player("./path/to/sample.mp3").toMaster();
  play as soon as the buffer is loaded
player.autostart = true;

var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = function() {
   console.log(2018 - this.yearOfBirth);
}

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1995, 'designer');
var mark = new Person('Mark', 1946, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();*/

/*------------------------------------------------- BUTTON FUNCTIONS -----------------------------------------------------------*/

function topBar(data) {
  if (data == "muteAudio") {
    console.log(data);
  }

  /*  if (Tone.Master.mute == false) {
      Tone.Master.mute = true;
    } else {
      Tone.Master.mute = false;
    }*/
}



function synthWave(data) {
  polySynth.set({
    "oscillator": {
      "type": data
    }
  });
  console.log(data);
}

function noiteType(data) {
  noiseOne.type = data;
  console.log(data);
}


function noiseOneFrequencyTime(data) {
  autoFilterOne.set({
    "frequency": data
  });
}