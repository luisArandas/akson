Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var kickSyn = new Tone.MembraneSynth().toMaster();


var autoFilterOne = new Tone.AutoFilter({
  "frequency": "16m",
  "min": 800,
  "max": 15000
}).connect(Tone.Master);

var jcreverb = new Tone.JCReverb(0.0).connect(autoFilterOne);
jcreverb.wet.value = 0;
jcreverb.roomSize.value = 0;

var phaser = new Tone.Phaser({
  "frequency": 15,
  "octaves": 5,
  "baseFrequency": 1000
}).connect(jcreverb);

var noiseOne = new Tone.Noise("pink");
noiseOne.connect(phaser);

autoFilterOne.start();
noiseOne.volume.value = -99;
noiseOne.start();
noiseOne.volume.rampTo(-10, 10);

var eq = new Tone.EQ3(0, 0, 0);
eq.connect(Tone.Master);

vol = new Tone.Volume(-5).connect(eq);
compressor = new Tone.Compressor(-25, 10).connect(vol);

reverb = new Tone.Freeverb(1.5).connect(compressor);
reverb.wet.value = 0.9;

vibrato = new Tone.Vibrato(0, 0).connect(reverb);

polySynth = new Tone.PolySynth(6, Tone.Synth, {
  harmonicity: 10,
  modulationIndex: 10,
  detune: 0,
  oscillator: {
    type: "sine",
    modulationType: 'sawtooth',
    modulationIndex: 3,
    harmonicity: 3.4
    /*
    phase: 0 ,
    osc.phase: 180; //flips the phase of the oscillator
    */
  },
  envelope: {
    attack: 0.4,
    decay: 0.4,
    sustain: 0.4,
    release: 100,
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
polySynth.connect(vibrato);


/* Sonic Properties Variables */

function synthWave(data) {
  polySynth.set({
    "oscillator": {
      "type": data
    }
  });
  typeofOsc = data;
  socket.emit('synthWaveType', data);
  if (data === "sine"){
    printPhraseDialog("Changed Oscillator Wave to Sine");
  }
  if (data === "sawtooth"){
    printPhraseDialog("Changed Oscillator Wave to Saw");
  }
  if (data === "square"){
    printPhraseDialog("Changed Oscillator Wave to Square");
  }
  if (data === "triangle"){
    printPhraseDialog("Changed Oscillator Wave to Triangle");
  }
}

function noiseType(data) {
  noiseOne.type = data;
  if (data == 'white') {
    noiseOne.volume.value = -10;
  }
  socket.emit('noiseWaveType', data);
  if (data === "white"){
    printPhraseDialog("Changed Noise Generator Wave to White");
  }
  if (data === "brown"){
    printPhraseDialog("Changed Noise Generator Brown to White");
  }
  if (data === "pink"){
    printPhraseDialog("Changed Noise Generator Pink to White");
  }
}

function noiseOneFrequencyTime(data) {
  autoFilterOne.set({
    "frequency": data
  });
  socket.emit('noiseOneFrequencyTimeNumber', data);
  printPhraseDialog("Changed AutoFilter Frequency to: " + data);
}

function partialCount(data) {
  polySynth.set({
    "oscillator": {
      "type": typeofOsc + data
    }
  });
  socket.emit('noisePartialCount', data);
  printPhraseDialog("Changed Oscillator Partials to: " + data);
}

function noiseRoloff(data) {
  autoFilterOne.set({
    "filter": {
      "rolloff": data
    }
  });
  socket.emit('noiseRoloffType', data);
  printPhraseDialog("Changed Filter Rolloff to: " + data);
}

function autofilterWave(data) {
  autoFilterOne.set({
    "type": data
  });
  socket.emit('autoFilterWaveType', data);
  if (data === "sine"){
    printPhraseDialog("Changed AutoFilter Wave to Sine");
  }
  if (data === "sawtooth"){
    printPhraseDialog("Changed AutoFilter Wave to Saw");
  }
  if (data === "square"){
    printPhraseDialog("Changed AutoFilter Wave to Square");
  }
  if (data === "triangle"){
    printPhraseDialog("Changed AutoFilter Wave to Triangle");
  }
}


function flipPhase(a) {
  if (a == '90') {
    polySynth.set({
      "oscillator": {
        "phase": 90
      }
    });
  }
  if (a == '180') {
    polySynth.set({
      "oscillator": {
        "phase": 180
      }
    });
  }
  if (a == '270') {
    polySynth.set({
      "oscillator": {
        "phase": 270
      }
    });
  }
  if (a == '360') {
    polySynth.set({
      "oscillator": {
        "phase": 360
      }
    });
  }
  var data = a;
}


/* Preset Sonic Qualities */

function postPresets(v){
  if (v === "1"){
    vibrato.frequency.value = 3.4;
    vibrato.depth.value = 0.2;
    polySynth.volume.value = -3;
    polySynth.set({
      "envelope": {
        "attack": 0.8,
        "decay": 1,
        "sustain": 1,
        "release": 10
      }
    });
    $("#harmonic").click();
    printPhraseDialog("Currently Using Preset One");
  }
  if (v === "2"){
    vibrato.frequency.value = 3.4;
    vibrato.depth.value = 0.2;
    polySynth.volume.value = -30;
    autoFilterOne.set({
      "frequency": 4700
    });
    $("#melodic").click();
    printPhraseDialog("Currently Using Preset Two");
  }
  if (v === "3"){
    lightOne.intensity = 5;
    lightTwo.intensity = 5;
    lightThree.intensity = 5;
    lightFour.intensity = 5;
    $("#hungarian").click();
    printPhraseDialog("Currently Using Preset Three");
  }
  if (v === "4"){
    camera.fov = 152;
    $("#melodic").click();
    printPhraseDialog("Currently Using Preset Four");
  }
  if (v === "5"){
    $("#shader4").click();
    $("#hirajoshi").click();
    printPhraseDialog("Currently Using Preset Five");
  }
}
