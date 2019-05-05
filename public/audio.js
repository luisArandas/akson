/**
 * @author Luis Arandas  http://luisarandas.org
 */

var spanAbout = document.getElementsByClassName("closeAbout")[0];
var spanMode = document.getElementsByClassName("closeMode")[0];
var spanScale = document.getElementsByClassName("closeScale")[0];
var modalAbout = document.getElementById('modalAbout');
var modalMode = document.getElementById('modalMode');
var modalScale = document.getElementById('modalScale');

var instrumentOne = false;
var instrumentTwo = false;
var instrumentThree = false;
var instrumentFour = false;
var typeofOsc = "sine";

var connectSoundVisuals = false;

Nexus.context = Tone.context;
Nexus.clock.start();
Nexus.colors.accent = "rgba(255,255,255,1)";
Nexus.colors.fill = "rgba(15,15,15,1)";
Nexus.colors.dark = "#ffffff";
Nexus.colors.light = "#ff66ff";
Nexus.colors.mediumDark = "#ff66ff";
Nexus.colors.mediumLight = "#ff66ff";

Tone.context.resume();
Tone.Transport.bpm.value = 20;
Tone.Transport.start();

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var UI = {
  oscilloscope: new Nexus.Oscilloscope('#oscilloscope', {
    'size': [222, 96]
  }),
  synthvolume: new Nexus.Dial('#synthvolume', {
    'size': [46, 45],
    'interaction': 'vertical',
    'mode': 'absolute', // "absolute" or "relative"
    'min': -30,
    'max': 0,
    'step': 0.1,
    'value': 0
  }),
  backgroundvolume: new Nexus.Dial('#backgroundvolume', {
    'size': [46, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -40,
    'max': 4,
    'step': 0.1,
    'value': -15
  }),
  mainvolume: new Nexus.Dial('#mainvolume', {
    'size': [46, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -50,
    'max': 0,
    'step': 0.1,
    'value': -12
  }),
  eqbass: new Nexus.Dial('#eqbass', {
    'size': [46, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -50,
    'max': 5,
    'step': 0.1,
    'value': -12
  }),
  eqmid: new Nexus.Dial('#eqmid', {
    'size': [46, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -50,
    'max': 5,
    'step': 0.1,
    'value': -10
  }),
  eqhigh: new Nexus.Dial('#eqhigh', {
    'size': [46, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -50,
    'max': 5,
    'step': 0.1,
    'value': 0
  }),
  lowfreq: new Nexus.Dial('#lowfreq', {
    'size': [46, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': 20,
    'max': 2000,
    'step': 1,
    'value': 400
  }),
  highfreq: new Nexus.Dial('#highfreq', {
    'size': [46, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': 20,
    'max': 2000,
    'step': 1,
    'value': 2500
  }),
  synthAttack: new Nexus.Slider('#synthAttack', {
    size: [191, 20],
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0.4
  }),
  synthDecay: new Nexus.Slider('#synthDecay', {
    size: [191, 20],
    min: 0,
    max: 1,
    step: 0.01,
    mode: 'absolute',
    value: 0.4
  }),
  synthSustain: new Nexus.Slider('#synthSustain', {
    size: [191, 20],
    min: 0,
    max: 1,
    step: 0.01,
    mode: 'absolute',
    value: 0.3
  }),
  synthRelease: new Nexus.Slider('#synthRelease', {
    size: [191, 20],
    min: 0,
    max: 10,
    step: 0.1,
    mode: 'absolute',
    value: 4
  }),
  harmonicity: new Nexus.Slider('#harmonicity', {
    size: [191, 20],
    min: 0,
    max: 50,
    step: 0.1,
    mode: 'absolute',
    value: 10
  }),
  modulationindex: new Nexus.Slider('#modulationindex', {
    size: [191, 20],
    min: 0,
    max: 50,
    step: 0.1,
    mode: 'absolute',
    value: 10
  }),
  detune: new Nexus.Slider('#detune', {
    size: [191, 20],
    min: 0,
    max: 5000,
    step: 0.1,
    mode: 'absolute',
    value: 0
  }),
  oscillatorModulationIndex: new Nexus.Slider('#oscillatorModulationIndex', {
    size: [191, 20],
    min: 0,
    max: 10,
    step: 0.01,
    mode: 'absolute',
    value: 3
  }),
  oscillatorHarmonicity: new Nexus.Slider('#oscillatorHarmonicity', {
    size: [191, 20],
    min: 0,
    max: 10,
    step: 0.01,
    mode: 'absolute',
    value: 3.4
  }),
  modulationEnvelopeAttack: new Nexus.Slider('#modulationEnvelopeAttack', {
    size: [191, 20],
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0.5
  }),
  modulationEnvelopeDecay: new Nexus.Slider('#modulationEnvelopeDecay', {
    size: [191, 20],
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0
  }),
  modulationEnvelopeSustain: new Nexus.Slider('#modulationEnvelopeSustain', {
    size: [191, 20],
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0.8
  }),
  modulationEnvelopeRelease: new Nexus.Slider('#modulationEnvelopeRelease', {
    size: [191, 20],
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0.5
  }),
  reverbRoomSize: new Nexus.Slider('#reverbRoomSize', {
    size: [191, 20],
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0.8
  }),
  reverbWetValue: new Nexus.Slider('#reverbWetValue', {
    size: [191, 20],
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0.1
  }),
  reverbDampValue: new Nexus.Slider('#reverbDampValue', {
    size: [191, 20],
    min: 2000,
    max: 4000,
    step: 0.1,
    mode: 'absolute',
    value: 3000
  }),
  noiseOnePlaybackRate: new Nexus.Slider('#noiseOnePlaybackRate', {
    size: [191, 20],
    min: 0.5,
    max: 35,
    step: 0.01,
    mode: 'absolute',
    value: 1
  }),
  noiseq: new Nexus.Slider("#noiseq", {
    size: [191, 20],
    min: 0,
    max: 10,
    step: 0.01,
    mode: 'absolute',
    value: 1
  }),
  noiseoctaves: new Nexus.Slider("#noiseoctaves", {
    size: [191, 20],
    min: -2.5,
    max: 8,
    step: 0.01,
    mode: 'absolute',
    value: 2.6
  }),

  autoFilterFrequency: new Nexus.Slider('#autoFilterFrequency', {
    size: [191, 20],
    min: 500,
    max: 5000,
    step: 0.1,
    mode: 'absolute',
    value: 500
  }),
  noiseMin: new Nexus.Slider('#noiseMin', {
    size: [191, 20],
    min: 100,
    max: 1000,
    step: 0.1,
    mode: 'absolute',
    value: 4000
  }),
  noiseMax: new Nexus.Slider('#noiseMax', {
    size: [191, 20],
    min: 1000,
    max: 15000,
    step: 0.1,
    mode: 'absolute',
    value: 3000
  }),
  autoFilterWet: new Nexus.Slider('#autoFilterWet', {
    size: [191, 20],
    min: 0,
    max: 1,
    step: 0.01,
    mode: 'absolute',
    value: 0.5
  }),
  autoFilterDepth: new Nexus.Slider('#autoFilterDepth', {
    size: [191, 20],
    min: 0,
    max: 1,
    step: 0.01,
    mode: 'absolute',
    value: 1
  }),
  afbasefrequency: new Nexus.Slider('#afbasefrequency', {
    size: [191, 20],
    min: 100,
    max: 1000,
    step: 0.01,
    mode: 'absolute',
    value: 200
  }),
  synthPhase: new Nexus.Slider('#synthPhase', {
    size: [191, 20],
    min: 0,
    max: 360,
    step: 1,
    mode: 'absolute',
    value: 180
  }),
  synthPartials: new Nexus.Slider('#synthPartials', {
    size: [191, 20],
    min: 0,
    max: 32,
    step: 1,
    mode: 'absolute',
    value: 2
  }),
  noisefiltergain: new Nexus.Slider('#noisefiltergain', {
    size: [191, 20],
    min: -99,
    max: 5,
    step: 0.01,
    mode: 'absolute',
    value: 1
  }),
  vibratoFrequency: new Nexus.Slider('#vibratoFrequency', {
    size: [191, 20],
    min: 0,
    max: 15,
    step: 0.01,
    mode: 'absolute',
    value: 0
  }),
  vibratoDepth: new Nexus.Slider('#vibratoDepth', {
    size: [191, 20],
    min: 0,
    max: 1,
    step: 0.001,
    mode: 'absolute',
    value: 0.1
  }),
  vibratoWet: new Nexus.Slider('#vibratoWet', {
    size: [191, 20],
    min: 0,
    max: 1,
    step: 0.001,
    mode: 'absolute',
    value: 0.5
  }),
  phaserFreq: new Nexus.Slider('#phaserFreq', {
    size: [191, 20],
    min: 0,
    max: 1,
    step: 0.001,
    mode: 'absolute',
    value: 0.5
  }),
  phaserOct: new Nexus.Slider('#phaserOct', {
    size: [191, 20],
    min: 0,
    max: 10,
    step: 0.001,
    mode: 'absolute',
    value: 3
  }),
  phaserWet: new Nexus.Slider('#phaserWet', {
    size: [191, 20],
    min: 0,
    max: 1,
    step: 0.001,
    mode: 'absolute',
    value: 0.5
  }),
  phaserQ: new Nexus.Slider('#phaserQ', {
    size: [191, 20],
    min: 0,
    max: 50,
    step: 0.001,
    mode: 'absolute',
    value: 10
  }),
  phaserBaseFreq: new Nexus.Slider('#phaserBaseFreq', {
    size: [191, 20],
    min: 0,
    max: 1000,
    step: 0.001,
    mode: 'absolute',
    value: 350
  }),
  jcreverbWet: new Nexus.Slider('#jcreverbWet', {
    size: [191, 20],
    min: 0,
    max: 1,
    step: 0.001,
    mode: 'absolute',
    value: 0
  }),
  jcreverbRoomsize: new Nexus.Slider('#jcreverbRoomsize', {
    size: [191, 20],
    min: 0,
    max: 1,
    step: 0.001,
    mode: 'absolute',
    value: 0
  }),
}

var number = new Nexus.Number('#number', {
  'size': [46, 18],
});
number.link(UI.synthvolume);
var number1 = new Nexus.Number('#number1', {
  'size': [46, 18],
});
number1.link(UI.backgroundvolume);
var number2 = new Nexus.Number('#number2', {
  'size': [46, 18],
});
number2.link(UI.mainvolume);
var number3 = new Nexus.Number('#number3', {
  'size': [46, 18],
});
number3.link(UI.eqbass);
var number4 = new Nexus.Number('#number4', {
  'size': [46, 18],
});
number4.link(UI.eqmid);
var number5 = new Nexus.Number('#number5', {
  'size': [46, 18],
});
number5.link(UI.eqhigh);
var number6 = new Nexus.Number('#number6', {
  'size': [46, 18],
});
number6.link(UI.lowfreq);
var number7 = new Nexus.Number('#number7', {
  'size': [46, 18],
});
number7.link(UI.highfreq);

for (var key in UI) {
  UI[key].on('change', function(value) {
    // Everytime an element triggers.
  });
}

var autoFilterOne = new Tone.AutoFilter({
  "frequency": "8m",
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

reverb = new Tone.Freeverb(0.8).connect(compressor);
reverb.wet.value = 0.1;

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
    THIS
    phase  : 0 ,
    osc.phase = 180; //flips the phase of the oscillator
    */
  },
  envelope: {
    attack: 0.4,
    decay: 0.4,
    sustain: 0.4,
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
polySynth.connect(vibrato);


/* ---------------------------- NEXUS ---------------------------- */

UI.oscilloscope.connect(Tone.Master);

UI.synthvolume.on('change', function(v) {
  polySynth.volume.value = v;
  var data = {
    x: v,
    y: "synthVolume"
  };
  socket.emit('uiSocketSynthVolume', data);
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  printLogsDialog("Synthesizer Volume : ", _v);

});
UI.backgroundvolume.on('change', function(v) {
  noiseOne.volume.value = v;
  var data = {
    x: v,
    y: "backgroundVolume"
  };
  socket.emit('uiSocketBackgroundVolume', data);
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  printLogsDialog("Background Volume : ", _v);

});
UI.mainvolume.on('change', function(v) {
  Tone.Master.volume.value = v;
  var data = {
    x: v,
    y: "mainVolume"
  };
  socket.emit('uiSocketMainVolume', data);
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  printLogsDialog("Master Volume : ", _v);

  /*__v = v.map(-50, 0, 0, 5);
  lightOne.intensity = __v;
  lightTwo.intensity = __v;
  lightThree.intensity = __v;
  lightFour.intensity = __v;*/
});

UI.synthAttack.on('change', function(v) {
  var data = {
    x: v,
    y: "synthAttack"
  };
  socket.emit('uiSocketSynthAttack', data);
  socket.emit('oscTest', v);
  polySynth.set({
    "envelope": {
      "attack": v
    }
  });
  printLogsDialog("Synthesizer Attack : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n1').innerHTML = _v;

});
UI.synthDecay.on('change', function(v) {
  var data = {
    x: v,
    y: "synthDecay"
  };
  socket.emit('uiSocketSynthDecay', data);
  polySynth.set({
    "envelope": {
      "decay": v
    }
  });
  printLogsDialog("Synthesizer Decay : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n2').innerHTML = _v;

});
UI.synthSustain.on('change', function(v) {
  var data = {
    x: v,
    y: "synthSustain"
  };
  socket.emit('uiSocketSynthSustain', data);
  polySynth.set({
    "envelope": {
      "sustain": v
    }
  });
  printLogsDialog("Synthesizer Sustain : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n3').innerHTML = _v;
});
UI.synthRelease.on('change', function(v) {
  var data = {
    x: v,
    y: "synthRelease"
  };
  socket.emit('uiSocketSynthRelease', data);
  polySynth.set({
    "envelope": {
      "release": v
    }
  });
  printLogsDialog("Synthesizer Release : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n4').innerHTML = _v;
});

UI.harmonicity.on('change', function(v) {
  var data = {
    x: v,
    y: "harmonicity"
  };
  socket.emit('uiSocketHarmonicity', data);
  polySynth.set({
    "harmonicity": v
  });
  printLogsDialog("Synthesizer Harmonicity : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n7').innerHTML = _v;
});
UI.modulationindex.on('change', function(v) {
  var data = {
    x: v,
    y: "modulationIndex"
  };
  socket.emit('uiSocketModulationIndex', data);
  polySynth.set({
    "modulationIndex": v
  });
  printLogsDialog("Synthesizer Modulation Index : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n9').innerHTML = _v;
});
UI.detune.on('change', function(v) {
  var data = {
    x: v,
    y: "detune"
  };
  socket.emit('uiSocketDetune', data);
  polySynth.set({
    "detune": v
  });
  printLogsDialog("Synthesizer Detune : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n8').innerHTML = _v;
});
UI.oscillatorModulationIndex.on('change', function(v) {
  var data = {
    x: v,
    y: "oscillatorModulationIndex"
  };
  socket.emit('uiSocketOscillatorModulationIndex', data);
  polySynth.set({
    "oscillator": {
      "modulationIndex": v
    }
  });
  printLogsDialog("Synthesizer Osc Modulation Index : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n10').innerHTML = _v;
});
UI.oscillatorHarmonicity.on('change', function(v) {
  var data = {
    x: v,
    y: "oscillatorHarmonicity"
  };
  socket.emit('uiSocketOscillatorHarmonicity', data);
  polySynth.set({
    "oscillator": {
      "harmonicity": v
    }
  });
  printLogsDialog("Synthesizer Osc Harmonicity : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n11').innerHTML = _v;
});

UI.modulationEnvelopeAttack.on('change', function(v) {
  var data = {
    x: v,
    y: "modulationEnvelopeAttack"
  };
  socket.emit('uiSocketModulationEnvelopeAttack', data);
  polySynth.set({
    "modulationEnvelope": {
      "attack": v
    }
  });
  printLogsDialog("Synthesizer Modulation Envelope Attack : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n12').innerHTML = _v;
});
UI.modulationEnvelopeDecay.on('change', function(v) {
  var data = {
    x: v,
    y: "modulationEnvelopeDecay"
  };
  socket.emit('uiSocketModulationEnvelopeDecay', data);
  polySynth.set({
    "modulationEnvelope": {
      "decay": v
    }
  });
  printLogsDialog("Synthesizer Modulation Envelope Decay : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n13').innerHTML = _v;
});
UI.modulationEnvelopeSustain.on('change', function(v) {
  var data = {
    x: v,
    y: "modulationEnvelopeSustain"
  };
  socket.emit('uiSocketModulationEnvelopeSustain', data);
  polySynth.set({
    "modulationEnvelope": {
      "sustain": v
    }
  });
  printLogsDialog("Synthesizer Modulation Envelope Sustain : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n14').innerHTML = _v;
});
UI.modulationEnvelopeRelease.on('change', function(v) {
  var data = {
    x: v,
    y: "modulationEnvelopeRelease"
  };
  socket.emit('uiSocketModulationEnvelopeRelease', data);
  polySynth.set({
    "modulationEnvelope": {
      "release": v
    }
  });
  printLogsDialog("Synthesizer Modulation Envelope Release : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n15').innerHTML = _v;
});

UI.reverbRoomSize.on('change', function(v) {
  reverb.roomSize.value = v;
  var data = {
    x: v,
    y: "reverbRoomSize"
  };
  socket.emit('uiSocketReverbRoomSize', data);
  printLogsDialog("Reverb Roomsize : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n16').innerHTML = _v;
});
UI.reverbWetValue.on('change', function(v) {
  reverb.wet.value = v;
  var data = {
    x: v,
    y: "reverbWetValue"
  };
  socket.emit('uiSocketReverbWetValue', data);
  printLogsDialog("Reverb Wet Value : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n17').innerHTML = _v;
});
UI.reverbDampValue.on('change', function(v) {
  reverb.dampening.value = v;
  var data = {
    x: v,
    y: "reverbDampValue"
  };
  socket.emit('uiSocketReverbDampValue', data);
  printLogsDialog("Reverb Damp Value : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n18').innerHTML = _v;
});

UI.noiseOnePlaybackRate.on('change', function(v) {
  noiseOne.playbackRate = v;
  var data = {
    x: v,
    y: "noiseOnePlaybackRate"
  };
  socket.emit('uiSocketNoiseOnePlaybackRate', data);
  printLogsDialog("Background Playback Rate : ", v);
  var _v = v.toFixed(2);
  document.getElementById('n29').innerHTML = _v;
});
UI.autoFilterFrequency.on('change', function(v) {
  var data = {
    x: v,
    y: "autoFilterFrequency"
  };
  socket.emit('uiSocketAutoFilterFrequency', data);
  autoFilterOne.set({
    "frequency": v
  });
  printLogsDialog("Auto Filter Frequency : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n23').innerHTML = _v;
});
UI.noiseMin.on('change', function(v) {
  noiseOne.min = v;
  var data = {
    x: v,
    y: "noiseOneMin"
  };
  socket.emit('uiSocketNoiseOneMin', data);
  printLogsDialog("Background Min Value : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n30').innerHTML = _v;
});
UI.noiseMax.on('change', function(v) {
  noiseOne.max = v;
  var data = {
    x: v,
    y: "noiseOneMax"
  };
  socket.emit('uiSocketNoiseOneMax', data);
  printLogsDialog("Background Max Value : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n31').innerHTML = _v;
});
UI.autoFilterWet.on('change', function(v) {
  noiseOne.wet = v;
  var data = {
    x: v,
    y: "noiseOneWet"
  };
  socket.emit('uiSocketNoiseOneWet', data);
  printLogsDialog("Background Wet Value : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n27').innerHTML = _v;
});
UI.autoFilterDepth.on('change', function(v) {
  noiseOne.depth = v;
  var data = {
    x: v,
    y: "noiseOneDepth"
  };
  socket.emit('uiSocketNoiseOneDepth', data);
  printLogsDialog("Background Depth Value : ", v);
  var _v = v.toFixed(2);
  document.getElementById('n28').innerHTML = _v;
});

UI.noiseq.on('change', function(v) {
  autoFilterOne.set({
    "filter": {
      "q": v
    }
  });
  var data = {
    x: v,
    y: "noiseq"
  };
  socket.emit('uiSocketNoiseQ', data);
  printLogsDialog("Background Filter Q : ", v);
  var _v = v.toFixed(2);
  document.getElementById('n26').innerHTML = _v;
});

UI.noiseoctaves.on('change', function(v) {
  autoFilterOne.set({
    "octaves": v
  });
  var data = {
    x: v,
    y: "noiseOctaves"
  };
  socket.emit('uiSocketNoiseOctaves', data);
  printLogsDialog("Background Octave Range : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n25').innerHTML = _v;
});

UI.afbasefrequency.on('change', function(v) {
  autoFilterOne.set({
    "baseFrequency": v
  });
  var data = {
    x: v,
    y: "afBaseFrequency"
  };
  socket.emit('uiSocketAfBaseFrequency', data);
  printLogsDialog("Auto Filter Base Frequency : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n24').innerHTML = _v;
});

UI.eqbass.on('change', function(v) {
  eq.low.value = v
  var data = {
    x: v,
    y: "eqBass"
  };
  socket.emit('uiSocketEqBass', data);
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  printLogsDialog("Equalizer Low Value : ", _v);

});

UI.eqmid.on('change', function(v) {
  eq.mid.value = v
  var data = {
    x: v,
    y: "eqMid"
  };
  socket.emit('uiSocketEqMid', data);
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  printLogsDialog("Equalizer Mid Value : ", _v);

});

UI.eqhigh.on('change', function(v) {
  eq.high.value = v
  var data = {
    x: v,
    y: "eqHigh"
  };
  socket.emit('uiSocketEqHigh', data);
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  printLogsDialog("Equalizer High Value : ", _v);
});

UI.lowfreq.on('change', function(v) {
  eq.lowFrequency.value = v
  var data = {
    x: v,
    y: "eqLowFreq"
  };
  socket.emit('uiSocketEqLowFreq', data);
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  printLogsDialog("Equalizer Low Freq Crossover Value : ", _v);
});

UI.highfreq.on('change', function(v) {
  eq.highFrequency.value = v
  var data = {
    x: v,
    y: "eqHighFreq"
  };
  socket.emit('uiSocketEqHighFreq', data);
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  printLogsDialog("Equalizer High Freq Crossover Value : ", _v);
});

UI.synthPhase.on('change', function(v) {
  polySynth.phase = v;
  var data = {
    x: v,
    y: "synthPhase"
  };
  socket.emit('uiSocketSynthPhase', data);
  //_v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  //printLogsDialog("Equalizer High Freq Crossover Value : ", _v);
  var _v = v.toFixed(3);
  document.getElementById('n5').innerHTML = v;
});

UI.synthPartials.on('change', function(v) {
  polySynth.set({
    "oscillator": {
      "type": typeofOsc + v
    }
  });
  var data = {
    x: v,
    y: "synthPartials"
  };
  socket.emit('uiSocketSynthPartials', data);
  document.getElementById('n6').innerHTML = v;
});

UI.noisefiltergain.on('change', function(v) {
  autoFilterOne.set({
    "filter": {
      "gain": v
    }
  });
  var data = {
    x: v,
    y: "noiseFilterGain"
  };
  socket.emit('uiSocketNoiseFilterGain', data);
  var _v = v.toFixed(2);
  document.getElementById('n32').innerHTML = _v;
});

UI.vibratoFrequency.on('change', function(v) {
  vibrato.frequency.value = v;
  var data = {
    x: v,
    y: "vibratoFreq"
  };
  socket.emit('uiSocketSynthVibratoFreq', data);
  printLogsDialog("Vibrato Frequency : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n20').innerHTML = _v;
});

UI.vibratoDepth.on('change', function(v) {
  vibrato.depth.value = v;
  var data = {
    x: v,
    y: "vibratoDepth"
  };
  socket.emit('uiSocketSynthVibratoDep', data);
  printLogsDialog("Vibrato Depth : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n21').innerHTML = _v;
});

UI.vibratoWet.on('change', function(v) {
  vibrato.wet.value = v;
  var data = {
    x: v,
    y: "vibratoWet"
  };
  socket.emit('uiSocketSynthVibratoWet', data);
  printLogsDialog("Vibrato Wet : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n22').innerHTML = _v;
});

UI.phaserFreq.on('change', function(v) {
  phaser.frequency.value = v;
  var data = {
    x: v,
    y: "phaserFreq"
  };
  socket.emit('uiSocketNoisePhaserFreq', data);
  printLogsDialog("Phaser Frequency : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n35').innerHTML = _v;
});

UI.phaserOct.on('change', function(v) {
  phaser.octaves.value = v;
  var data = {
    x: v,
    y: "phaserOct"
  };
  socket.emit('uiSocketNoisePhaserOct', data);
  printLogsDialog("Phaser Octaves : ", v);
  var _v = v.toFixed(2);
  document.getElementById('n38').innerHTML = _v;
});

UI.phaserWet.on('change', function(v) {
  phaser.wet.value = v;
  var data = {
    x: v,
    y: "phaserWet"
  };
  socket.emit('uiSocketNoisePhaserWet', data);
  printLogsDialog("Phaser Wet : ", v);
  var _v = v.toFixed(3);
  document.getElementById('n36').innerHTML = _v;
});

UI.phaserQ.on('change', function(v) {
  phaser.Q.value = v;
  var data = {
    x: v,
    y: "phaserQ"
  };
  socket.emit('uiSocketNoisePhaserQ', data);
  printLogsDialog("Phaser Q : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n37').innerHTML = _v;
});

UI.phaserBaseFreq.on('change', function(v) {
  phaser.baseFrequency.value = v;
  var data = {
    x: v,
    y: "phaserBaseFreq"
  };
  socket.emit('uiSocketNoisePhaserBaseFreq', data);
  printLogsDialog("Phaser BaseFreq : ", v);
  var _v = v.toFixed(0);
  document.getElementById('n39').innerHTML = _v;
});

UI.jcreverbRoomsize.on('change', function(v) {
  jcreverb.roomSize.value = v;
  var data = {
    x: v,
    y: "jcverbRoomSiz"
  };
  socket.emit('uiSocketNoiseJcverbRoom', data);
  printLogsDialog("JC_Reverb RoomSize : ", v);
  var _v = v.toFixed(2);
  document.getElementById('n34').innerHTML = _v;
});

UI.jcreverbWet.on('change', function(v) {
  jcreverb.wet.value = v;
  var data = {
    x: v,
    y: "jcverbWet"
  };
  socket.emit('uiSocketNoiseJcverbWet', data);
  printLogsDialog("JC_Reverb Wet : ", v);
  var _v = v.toFixed(2);
  document.getElementById('n33').innerHTML = _v;
});

//console.log(autoFilterOne);
//autofilter filter type  The type of the filter. Types: “lowpass”, “highpass”, “bandpass”, “lowshelf”, “highshelf”, “notch”, “allpass”, or “peaking”.

/*------------------------------------------------- BUTTON FUNCTIONS -----------------------------------------------------------*/

function topBar(data) {
  if (data == "muteAudio") {
    if (document.getElementById("muteButton").style.background != "white") {
      document.getElementById("muteButton").style.background = "white";
      document.getElementById("muteButton").style.border = "1px solid #ffffff";
    } else if (document.getElementById("muteButton").style.background == "white") {
      document.getElementById("muteButton").style.background = "black";
      document.getElementById("muteButton").style.border = "1px solid rgba(50, 50, 50, 1)";
    }
    if (Tone.Master.mute == false) {
      Tone.Master.mute = true;
    } else {
      Tone.Master.mute = false;
    }
  }
  if (data == "refresh") {
    location.reload();
  }
  if (data == "recordAudio") {
    WUI_Dialog.open("savesettings_dialog");
    console.log("check record");
    //showToast('record');
  }
  if (data == "aboutMe") {
    modalAbout.style.display = "block";
    closeGui();
  }
  if (data == "changeMode") {
    modalMode.style.display = "block";
    closeGui();
  }
}

spanAbout.onclick = function() {
  modalAbout.style.display = "none";
  modalMode.style.display = "none";
  modalScale.style.display = "none";
  openGui();
}
spanMode.onclick = function() {
  modalAbout.style.display = "none";
  modalMode.style.display = "none";
  modalScale.style.display = "none";
  openGui();
}
spanScale.onclick = function() {
  modalAbout.style.display = "none";
  modalMode.style.display = "none";
  modalScale.style.display = "none";
  openGui();
}

window.onclick = function(event) {
  if (event.target == modalAbout) {
    modalAbout.style.display = "none";
    openGui();
  }
  if (event.target == modalMode) {
    modalMode.style.display = "none";
    openGui();
  }
  if (event.target == modalScale) {
    modalScale.style.display = "none";
    openGui();
  }
}

function openGui() {
  WUI_Dialog.open("master_dialog");
  WUI_Dialog.open("cockpit_dialog");
  WUI_Dialog.open("logs_dialog");
  document.getElementById("topBar").style.visibility = "visible";
}

function closeGui() {
  WUI_Dialog.close("master_dialog");
  WUI_Dialog.close("cockpit_dialog");
  WUI_Dialog.close("logs_dialog");
  WUI_Dialog.close("monitor_dialog");
  WUI_Dialog.close("about_this_dialog");
  document.getElementById("topBar").style.visibility = "hidden";
}

function synthWave(data) {
  polySynth.set({
    "oscillator": {
      "type": data
    }
  });
  typeofOsc = data;
  socket.emit('synthWaveType', data);
}

function noiseType(data) {
  noiseOne.type = data;
  if (data == 'white') {
    noiseOne.volume.value = -10;
  }
  socket.emit('noiseWaveType', data);
}

function noiseOneFrequencyTime(data) {
  autoFilterOne.set({
    "frequency": data
  });
  socket.emit('noiseOneFrequencyTimeNumber', data);
}

function partialCount(data) {
  polySynth.set({
    "oscillator": {
      "type": typeofOsc + data
    }
  });
  socket.emit('noisePartialCount', data);
}

function noiseRoloff(data) {
  autoFilterOne.set({
    "filter": {
      "rolloff": data
    }
  });
  socket.emit('noiseRoloffType', data);
}

function autofilterWave(data) {
  autoFilterOne.set({
    "type": data
  });
  socket.emit('autoFilterWaveType', data);
}

//--------------------------------------------------------------------- Print Logs

function printLogsDialog(a, v) {
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = a + v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
}

//--------------------------------------------------------------------- Scales

function scaleButtons(data) {
  if (document.getElementById(data).style.background != "white") {
    document.getElementById(data).style.background = "white";
    document.getElementById(data).style.color = "black";
  } else if (document.getElementById(data).style.background == "white") {
    document.getElementById(data).style.background = "black";
    document.getElementById(data).style.color = "white";
  }
  if (data) {
    customScaleCortex(data);
  }
}

function showToast(v) {
  if (v === 'record') {
    //http://izitoast.marcelodolza.com
    iziToast.warning({
      title: 'Recording -',
      backgroundColor: 'rgba(10,10,10,1)',
      messageColor: 'white',
      progressBarColor: 'white',
      titleColor: 'white',
      class: 'izi',
      position: 'topLeft', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      close: true,
      zindex: 99999,
      message: 'Click again to stop',
      onClosing: function(instance, toast, closedBy) {
        console.info('Closing | closedBy: ' + closedBy);
      },
      onClosed: function(instance, toast, closedBy) {
        console.info('Closed | closedBy: ' + closedBy);
      }
      /*
      id: null,
      class: '',
      title: '',
      titleColor: '',
      titleSize: '',
      titleLineHeight: '',
      message: '',
      messageColor: '',
      messageSize: '',
      messageLineHeight: '',
      backgroundColor: '',
      theme: 'light', // dark
      color: '', // blue, red, green, yellow
      icon: '',
      iconText: '',
      iconColor: '',
      iconUrl: null,
      image: '',
      imageWidth: 50,
      maxWidth: null,
      zindex: null,
      layout: 1,
      balloon: false,
      close: true,
      closeOnEscape: false,
      closeOnClick: false,
      displayMode: 0, // once, replace
      position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      target: '',
      targetFirst: true,
      timeout: 5000,
      rtl: false,
      animateInside: true,
      drag: true,
      pauseOnHover: true,
      resetOnHover: false,
      progressBar: true,
      progressBarColor: '',
      progressBarEasing: 'linear',
      overlay: false,
      overlayClose: false,
      overlayColor: 'rgba(0, 0, 0, 0.6)',
      transitionIn: 'fadeInUp',
      transitionOut: 'fadeOut',
      transitionInMobile: 'fadeInUp',
      transitionOutMobile: 'fadeOutDown',
      buttons: {},
      inputs: {},
      onOpening: function () {},
      onOpened: function () {},
      onClosing: function () {},
      onClosed: function () {}
      */
    });
  }
}

function changeVoices() {
  console.log(currentSynthesizer);
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
  socket.emit('uiSocketFlipPhaseButton', data);
}


const audio = document.querySelector('audio');
const actx = Tone.context;
const dest = actx.createMediaStreamDestination();
const recorder = new MediaRecorder(dest.stream);
Tone.Master.connect(dest);

const chunks = [];

console.log(actx);

function saveAudio(v) {
  if (v === 'start') {
    recorder.start();
  }
  if (v === 'stop') {
    recorder.stop();
  }
}

recorder.ondataavailable = evt => chunks.push(evt.data);
recorder.onstop = evt => {
  let blob = new Blob(chunks, {
    type: 'audio/ogg; codecs=opus'
  });
  audio.src = URL.createObjectURL(blob);
}

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
  }
  if (v === "2"){
    vibrato.frequency.value = 3.4;
    vibrato.depth.value = 0.2;
    polySynth.volume.value = -30;
    autoFilterOne.set({
      "frequency": 4700
    });
    $("#melodic").click();
  }
  if (v === "3"){
    lightOne.intensity = 5;
    lightTwo.intensity = 5;
    lightThree.intensity = 5;
    lightFour.intensity = 5;
    $("#hungarian").click();
  }
  if (v === "4"){
    camera.fov = 152;
    $("#melodic").click();
  }
  if (v === "5"){
    $("#shader4").click();
    $("#hirajoshi").click();
  }
}

var sceneValue = 0;

function incrementValue() {

  sceneValue++;

  if (sceneValue === 0){
    var evt = new KeyboardEvent('keydown', {
      'keyCode': 81,
      'which': 81
    });
    document.dispatchEvent(evt);
  }
  if (sceneValue === 1){
    var evt = new KeyboardEvent('keydown', {
      'keyCode': 87,
      'which': 87
    });
    document.dispatchEvent(evt);
  }
  if (sceneValue === 2){
    var evt = new KeyboardEvent('keydown', {
      'keyCode': 69,
      'which': 69
    });
    document.dispatchEvent(evt);
  }
  if (sceneValue === 3){
    var evt = new KeyboardEvent('keydown', {
      'keyCode': 82,
      'which': 82
    });
    document.dispatchEvent(evt);
    sceneValue = -1;
  }
}
