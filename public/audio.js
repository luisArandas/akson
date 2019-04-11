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
    'size': [45, 45],
    'interaction': 'vertical',
    'mode': 'absolute', // "absolute" or "relative"
    'min': -30,
    'max': 0,
    'step': 0.1,
    'value': 0
  }),
  backgroundvolume: new Nexus.Dial('#backgroundvolume', {
    'size': [45, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -40,
    'max': 4,
    'step': 0.1,
    'value': -15
  }),
  mainvolume: new Nexus.Dial('#mainvolume', {
    'size': [45, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -50,
    'max': 0,
    'step': 0.1,
    'value': -12
  }),
  eqbass: new Nexus.Dial('#eqbass', {
    'size': [45, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -50,
    'max': 5,
    'step': 0.1,
    'value': -12
  }),
  eqmid: new Nexus.Dial('#eqmid', {
    'size': [45, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -50,
    'max': 5,
    'step': 0.1,
    'value': -10
  }),
  eqhigh: new Nexus.Dial('#eqhigh', {
    'size': [45, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -50,
    'max': 5,
    'step': 0.1,
    'value': 0
  }),
  lowfreq: new Nexus.Dial('#lowfreq', {
    'size': [45, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': 20,
    'max': 2000,
    'step': 1,
    'value': 400
  }),
  highfreq: new Nexus.Dial('#highfreq', {
    'size': [45, 45],
    'interaction': 'vertical', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': 20,
    'max': 2000,
    'step': 1,
    'value': 2500
  }),
  synthAttack: new Nexus.Slider('#synthAttack', {
    size: [127, 20],
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0.01
  }),
  synthDecay: new Nexus.Slider('#synthDecay', {
    min: 0,
    max: 1,
    step: 0.01,
    mode: 'absolute',
    value: 0.1
  }),
  synthSustain: new Nexus.Slider('#synthSustain', {
    min: 0,
    max: 1,
    step: 0.01,
    mode: 'absolute',
    value: 0.2
  }),
  synthRelease: new Nexus.Slider('#synthRelease', {
    min: 0,
    max: 10,
    step: 0.1,
    mode: 'absolute',
    value: 4
  }),
  harmonicity: new Nexus.Slider('#harmonicity', {
    min: 0,
    max: 50,
    step: 0.1,
    mode: 'absolute',
    value: 10
  }),
  modulationindex: new Nexus.Slider('#modulationindex', {
    min: 0,
    max: 50,
    step: 0.1,
    mode: 'absolute',
    value: 10
  }),
  detune: new Nexus.Slider('#detune', {
    min: 0,
    max: 5000,
    step: 0.1,
    mode: 'absolute',
    value: 0
  }),
  oscillatorModulationIndex: new Nexus.Slider('#oscillatorModulationIndex', {
    min: 0,
    max: 10,
    step: 0.01,
    mode: 'absolute',
    value: 3
  }),
  oscillatorHarmonicity: new Nexus.Slider('#oscillatorHarmonicity', {
    min: 0,
    max: 10,
    step: 0.01,
    mode: 'absolute',
    value: 3.4
  }),
  modulationEnvelopeAttack: new Nexus.Slider('#modulationEnvelopeAttack', {
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0.5
  }),
  modulationEnvelopeDecay: new Nexus.Slider('#modulationEnvelopeDecay', {
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0
  }),
  modulationEnvelopeSustain: new Nexus.Slider('#modulationEnvelopeSustain', {
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0.8
  }),
  modulationEnvelopeRelease: new Nexus.Slider('#modulationEnvelopeRelease', {
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0.5
  }),
  reverbRoomSize: new Nexus.Slider('#reverbRoomSize', {
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0.8
  }),
  reverbWetValue: new Nexus.Slider('#reverbWetValue', {
    min: 0.01,
    max: 0.8,
    step: 0.001,
    mode: 'absolute',
    value: 0.1
  }),
  reverbDampValue: new Nexus.Slider('#reverbDampValue', {
    min: 2000,
    max: 4000,
    step: 0.1,
    mode: 'absolute',
    value: 3000
  }),
  noiseOnePlaybackRate: new Nexus.Slider('#noiseOnePlaybackRate', {
    min: 0.5,
    max: 35,
    step: 0.01,
    mode: 'absolute',
    value: 1
  }),
  noiseq: new Nexus.Slider("#noiseq", {
    min: 0,
    max: 10,
    step: 0.01,
    mode: 'absolute',
    value: 1
  }),
  noiseoctaves: new Nexus.Slider("#noiseoctaves", {
    min: -10,
    max: 10,
    step: 0.01,
    mode: 'absolute',
    value: 2.6
  }),

  autoFilterFrequency: new Nexus.Slider('#autoFilterFrequency', {
    min: 500,
    max: 5000,
    step: 0.1,
    mode: 'absolute',
    value: 500
  }),
  noiseMin: new Nexus.Slider('#noiseMin', {
    min: 100,
    max: 1000,
    step: 0.1,
    mode: 'absolute',
    value: 3000
  }),
  noiseMax: new Nexus.Slider('#noiseMax', {
    min: 1000,
    max: 15000,
    step: 0.1,
    mode: 'absolute',
    value: 3000
  }),
  autoFilterWet: new Nexus.Slider('#autoFilterWet', {
    min: 0,
    max: 1,
    step: 0.01,
    mode: 'absolute',
    value: 0.5
  }),
  autoFilterDepth: new Nexus.Slider('#autoFilterDepth', {
    min: 0,
    max: 1,
    step: 0.01,
    mode: 'absolute',
    value: 1
  }),
  afbasefrequency: new Nexus.Slider('#afbasefrequency', {
    min: 100,
    max: 1000,
    step: 0.01,
    mode: 'absolute',
    value: 200
  }),
  synthPhase: new Nexus.Slider('#synthPhase', {
    min: 0,
    max: 360,
    step: 0.01,
    mode: 'absolute',
    value: 180
  }),
  synthPartials: new Nexus.Slider('#synthPartials', {
    min: 0,
    max: 32,
    step: 1,
    mode: 'absolute',
    value: 1
  }),
  noisefiltergain: new Nexus.Slider('#noisefiltergain', {
    min: -99,
    max: 5,
    step: 0.01,
    mode: 'absolute',
    value: 1
  }),
  vibratoFrequency: new Nexus.Slider('#vibratoFrequency', {
    min: 0,
    max: 15,
    step: 0.01,
    mode: 'absolute',
    value: 0
  }),
  vibratoDepth: new Nexus.Slider('#vibratoDepth', {
    min: 0,
    max: 1,
    step: 0.001,
    mode: 'absolute',
    value: 0.1
  }),
  vibratoWet: new Nexus.Slider('#vibratoWet', {
    min: 0,
    max: 1,
    step: 0.001,
    mode: 'absolute',
    value: 0.5
  }),
  phaserFreq: new Nexus.Slider('#phaserFreq', {
    min: 0,
    max: 1,
    step: 0.001,
    mode: 'absolute',
    value: 0.5
  }),
  phaserOct: new Nexus.Slider('#phaserOct', {
    min: 0,
    max: 10,
    step: 0.001,
    mode: 'absolute',
    value: 3
  }),
  phaserWet: new Nexus.Slider('#phaserWet', {
    min: 0,
    max: 1,
    step: 0.001,
    mode: 'absolute',
    value: 0.5
  }),
  phaserQ: new Nexus.Slider('#phaserQ', {
    min: 0,
    max: 50,
    step: 0.001,
    mode: 'absolute',
    value: 10
  }),
  phaserBaseFreq: new Nexus.Slider('#phaserBaseFreq', {
    min: 0,
    max: 1000,
    step: 0.001,
    mode: 'absolute',
    value: 350
  }),
  jcreverbWet: new Nexus.Slider('#jcreverbWet', {
    min: 0,
    max: 1,
    step: 0.001,
    mode: 'absolute',
    value: 0
  }),
  jcreverbRoomsize: new Nexus.Slider('#jcreverbRoomsize', {
    min: 0,
    max: 1,
    step: 0.001,
    mode: 'absolute',
    value: 0
  }),
}

var number = new Nexus.Number('#number');
number.link(UI.synthvolume);
var number1 = new Nexus.Number('#number1');
number1.link(UI.backgroundvolume);
var number2 = new Nexus.Number('#number2');
number2.link(UI.mainvolume);
var number3 = new Nexus.Number('#number3');
number3.link(UI.eqbass);
var number4 = new Nexus.Number('#number4');
number4.link(UI.eqmid);
var number5 = new Nexus.Number('#number5');
number5.link(UI.eqhigh);
var number6 = new Nexus.Number('#number6');
number6.link(UI.lowfreq);
var number7 = new Nexus.Number('#number7');
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
  console.log("1 " + v);
  var data = {
    x: v,
    y: "mainVolume"
  };
  socket.emit('uiSocketMainVolume', data);
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  printLogsDialog("Master Volume : ", _v);

  var k = v.map(-50, 0, -1, 1);
  console.log("2 " + k);
  //light.intensity = k;
  //light1.intensity = k;
  //light2.intensity = k;
  //ambientLight1.intensity = k;
  //ambientLight2.intensity = k;
  //ambientLight.intensity = k;
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
});

UI.reverbRoomSize.on('change', function(v) {
  reverb.roomSize.value = v;
  var data = {
    x: v,
    y: "reverbRoomSize"
  };
  socket.emit('uiSocketReverbRoomSize', data);
  printLogsDialog("Reverb Roomsize : ", v);
});
UI.reverbWetValue.on('change', function(v) {
  reverb.wet.value = v;
  var data = {
    x: v,
    y: "reverbWetValue"
  };
  socket.emit('uiSocketReverbWetValue', data);
  printLogsDialog("Reverb Wet Value : ", v);
});
UI.reverbDampValue.on('change', function(v) {
  reverb.dampening.value = v;
  var data = {
    x: v,
    y: "reverbDampValue"
  };
  socket.emit('uiSocketReverbDampValue', data);
  printLogsDialog("Reverb Damp Value : ", v);
});

UI.noiseOnePlaybackRate.on('change', function(v) {
  noiseOne.playbackRate = v;
  var data = {
    x: v,
    y: "noiseOnePlaybackRate"
  };
  socket.emit('uiSocketNoiseOnePlaybackRate', data);
  printLogsDialog("Background Playback Rate : ", v);
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
});
UI.noiseMin.on('change', function(v) {
  noiseOne.min = v;
  var data = {
    x: v,
    y: "noiseOneMin"
  };
  socket.emit('uiSocketNoiseOneMin', data);
  printLogsDialog("Background Min Value : ", v);
});
UI.noiseMax.on('change', function(v) {
  noiseOne.max = v;
  var data = {
    x: v,
    y: "noiseOneMax"
  };
  socket.emit('uiSocketNoiseOneMax', data);
  printLogsDialog("Background Max Value : ", v);
});
UI.autoFilterWet.on('change', function(v) {
  noiseOne.wet = v;
  var data = {
    x: v,
    y: "noiseOneWet"
  };
  socket.emit('uiSocketNoiseOneWet', data);
  printLogsDialog("Background Wet Value : ", v);
});
UI.autoFilterDepth.on('change', function(v) {
  noiseOne.depth = v;
  var data = {
    x: v,
    y: "noiseOneDepth"
  };
  socket.emit('uiSocketNoiseOneDepth', data);
  printLogsDialog("Background Depth Value : ", v);
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
});

UI.vibratoFrequency.on('change', function(v) {
  vibrato.frequency.value = v;
  var data = {
    x: v,
    y: "vibratoFreq"
  };
  socket.emit('uiSocketSynthVibratoFreq', data);
});

UI.vibratoDepth.on('change', function(v) {
  vibrato.depth.value = v;
  var data = {
    x: v,
    y: "vibratoDepth"
  };
  socket.emit('uiSocketSynthVibratoDep', data);
});

UI.vibratoWet.on('change', function(v) {
  vibrato.wet.value = v;
  var data = {
    x: v,
    y: "vibratoWet"
  };
  socket.emit('uiSocketSynthVibratoWet', data);
});

UI.phaserFreq.on('change', function(v) {
  phaser.frequency.value = v;
  var data = {
    x: v,
    y: "phaserFreq"
  };
  socket.emit('uiSocketNoisePhaserFreq', data);
});

UI.phaserOct.on('change', function(v) {
  phaser.octaves.value = v;
  var data = {
    x: v,
    y: "phaserOct"
  };
  socket.emit('uiSocketNoisePhaserOct', data);
});

UI.phaserWet.on('change', function(v) {
  phaser.wet.value = v;
  var data = {
    x: v,
    y: "phaserWet"
  };
  socket.emit('uiSocketNoisePhaserWet', data);
});

UI.phaserQ.on('change', function(v) {
  phaser.Q.value = v;
  var data = {
    x: v,
    y: "phaserQ"
  };
  socket.emit('uiSocketNoisePhaserQ', data);
});

UI.phaserBaseFreq.on('change', function(v) {
  phaser.baseFrequency.value = v;
  var data = {
    x: v,
    y: "phaserBaseFreq"
  };
  socket.emit('uiSocketNoisePhaserBaseFreq', data);
});

UI.jcreverbRoomsize.on('change', function(v) {
  jcreverb.roomSize.value = v;
  var data = {
    x: v,
    y: "jcverbRoomSiz"
  };
  socket.emit('uiSocketNoiseJcverbRoom', data);
});

UI.jcreverbWet.on('change', function(v) {
  jcreverb.wet.value = v;
  var data = {
    x: v,
    y: "jcverbRoomSiz"
  };
  socket.emit('uiSocketNoiseJcverbWet', data);
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
  if (data == "hideGui") {
    //guiIsVisible = false;
    WUI_Dialog.close("master_dialog");
    WUI_Dialog.close("cockpit_dialog");
    WUI_Dialog.close("logs_dialog");
    WUI_Dialog.close("monitor_dialog");
    document.getElementById("topBar").style.visibility = "hidden";
    $("body").css('cursor', 'none');
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