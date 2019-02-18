/**
 * @author Luis Arandas  http://luisarandas.org
 */

var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById('myModal');

var instrumentOne = false;
var instrumentTwo = false;
var instrumentThree = false;
var instrumentFour = false;
var typeofOsc = "sine";

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


var UI = {
  oscilloscope: new Nexus.Oscilloscope('#oscilloscope', {
    'size': [243, 100]
  }),
  synthvolume: new Nexus.Dial('#synthvolume', {
    'size': [40, 40],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -30,
    'max': 0,
    'step': 0.001,
    'value': -15
  }),
  backgroundvolume: new Nexus.Dial('#backgroundvolume', {
    'size': [40, 40],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -99,
    'max': 0,
    'step': 0.001,
    'value': -15
  }),
  mainvolume: new Nexus.Dial('#mainvolume', {
    'size': [40, 40],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -50,
    'max': 0,
    'step': 0.001,
    'value': -12
  }),
  eqbass: new Nexus.Dial('#eqbass', {
    'size': [40, 40],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -50,
    'max': 5,
    'step': 0.001,
    'value': -12
  }),
  eqmid: new Nexus.Dial('#eqmid', {
    'size': [40, 40],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -50,
    'max': 5,
    'step': 0.001,
    'value': -10
  }),
  eqhigh: new Nexus.Dial('#eqhigh', {
    'size': [40, 40],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': -50,
    'max': 5,
    'step': 0.001,
    'value': 0
  }),
  lowfreq: new Nexus.Dial('#lowfreq', {
    'size': [40, 40],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': 20,
    'max': 2000,
    'step': 0.001,
    'value': 400
  }),
  highfreq: new Nexus.Dial('#highfreq', {
    'size': [40, 40],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'absolute', // "absolute" or "relative"
    'min': 20,
    'max': 2000,
    'step': 0.001,
    'value': 2500
  }),
  synthAttack: new Nexus.Slider('#synthAttack', {
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
    step: 0.01,
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
}


for (var key in UI) {
  UI[key].on('change', function(value) {
    var logs = document.getElementById('logs'),
      output_node = document.createElement("div");
    output_node.innerHTML = value;
    logs.appendChild(output_node);
    logs.scrollTop = logs.scrollHeight;
  });
}



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

var eq = new Tone.EQ3(0, 0, 0);

eq.connect(Tone.Master);
/*
{
low  : 0 ,
mid  : 0 ,
high  : 0 ,
lowFrequency  : 400 ,
highFrequency  : 2500
}
*/

vol = new Tone.Volume(-5).connect(eq);

compressor = new Tone.Compressor(-25, 10).connect(vol);

reverb = new Tone.Freeverb(0.8).connect(compressor);
reverb.wet.value = 0.1;

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


/*
var phaser = new Tone.Phaser({
  "frequency": 500,
  "octaves": 5,
  "baseFrequency": 1000
}).toMaster();
*/

/* ---------------------------- NEXUS ---------------------------- */

UI.oscilloscope.connect(Tone.Master);

UI.synthvolume.on('change', function(v) {
  polySynth.volume.value = v;
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "Synth volume -" + _v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
});
UI.backgroundvolume.on('change', function(v) {
  noiseOne.volume.value = v;
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "Background volume -" + _v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
});
UI.mainvolume.on('change', function(v) {
  Tone.Master.volume.value = v;
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "Master volume -" + _v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
});

UI.synthAttack.on('change', function(v) {
  polySynth.set({
    "envelope": {
      "attack": v
    }
  });
});
UI.synthDecay.on('change', function(v) {
  polySynth.set({
    "envelope": {
      "decay": v
    }
  });
});
UI.synthSustain.on('change', function(v) {
  polySynth.set({
    "envelope": {
      "sustain": v
    }
  });
});
UI.synthRelease.on('change', function(v) {
  polySynth.set({
    "envelope": {
      "release": v
    }
  });
});

UI.harmonicity.on('change', function(v) {
  polySynth.set({
    "harmonicity": v
  });
});
UI.modulationindex.on('change', function(v) {
  polySynth.set({
    "modulationIndex": v
  });
});
UI.detune.on('change', function(v) {
  polySynth.set({
    "detune": v
  });
});
UI.oscillatorModulationIndex.on('change', function(v) {
  polySynth.set({
    "oscillator": {
      "modulationIndex": v
    }
  });
});
UI.oscillatorHarmonicity.on('change', function(v) {
  polySynth.set({
    "oscillator": {
      "harmonicity": v
    }
  });
});

UI.modulationEnvelopeAttack.on('change', function(v) {
  polySynth.set({
    "modulationEnvelope": {
      "attack": v
    }
  });
});
UI.modulationEnvelopeDecay.on('change', function(v) {
  polySynth.set({
    "modulationEnvelope": {
      "decay": v
    }
  });
});
UI.modulationEnvelopeSustain.on('change', function(v) {
  polySynth.set({
    "modulationEnvelope": {
      "sustain": v
    }
  });
});
UI.modulationEnvelopeRelease.on('change', function(v) {
  polySynth.set({
    "modulationEnvelope": {
      "release": v
    }
  });
});

UI.reverbRoomSize.on('change', function(v) {
  reverb.roomSize.value = v;
});
UI.reverbWetValue.on('change', function(v) {
  reverb.wet.value = v;
});
UI.reverbDampValue.on('change', function(v) {
  reverb.dampening.value = v;
});

UI.noiseOnePlaybackRate.on('change', function(v) {
  noiseOne.playbackRate = v;
});
UI.autoFilterFrequency.on('change', function(v) {
  autoFilterOne.set({
    "frequency": v
  });
});
UI.noiseMin.on('change', function(v) {
  noiseOne.min = v;
});
UI.noiseMax.on('change', function(v) {
  noiseOne.max = v;
});
UI.autoFilterWet.on('change', function(v) {
  noiseOne.wet = v;
});
UI.autoFilterDepth.on('change', function(v) {
  noiseOne.depth = v;
  console.log(noiseOne.depth);
});

UI.noiseq.on('change', function(v) {
  autoFilterOne.set({
    "filter": {
      "q": v
    }
  });
});

UI.noiseoctaves.on('change', function(v) {
  autoFilterOne.set({
    "octaves": v
  });
});

UI.afbasefrequency.on('change', function(v) {
  autoFilterOne.set({
    "baseFrequency": v
  });
});

UI.eqbass.on('change', function(v) {
  eq.low.value = v
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "EQ Low freq -" + _v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
});

UI.eqmid.on('change', function(v) {
  eq.mid.value = v
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "EQ Mid freq -" + _v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
});

UI.eqhigh.on('change', function(v) {
  eq.high.value = v
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "EQ high freq -" + _v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
});

UI.lowfreq.on('change', function(v) {
  eq.lowFrequency.value = v
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "Low-freq-crossover -" + _v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
});

UI.highfreq.on('change', function(v) {
  eq.highFrequency.value = v
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "High-freq-crossover -" + _v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
});



/*------------------------------------------------- BUTTON FUNCTIONS -----------------------------------------------------------*/

function topBar(data) {
  if (data == "muteAudio") {
    if (Tone.Master.mute == false) {
      Tone.Master.mute = true;
      document.getElementById("muteButton").style.color = "black";
    } else {
      Tone.Master.mute = false;
      document.getElementById("muteButton").style.color = "white";
    }
  }
  if (data == "hideMouse") {
    /* Pôr visivel na barra */
    consoleLog();
  }
  if (data == "hideGui") {
    /*guiIsVisible = false;
    WUI_Dialog.close("master_dialog");
    WUI_Dialog.close("cockpit_dialog");
    WUI_Dialog.close("logs_dialog");
    document.getElementById("topBar").style.visibility = "hidden";*/
    consoleLog();
  }
  if (data == "recordAudio") {
    /* Record audio here */
    consoleLog();
  }
  if (data == "aboutMe") {
    modal.style.display = "block";
    closeGui();
  }
}
span.onclick = function() {
  modal.style.display = "none";
  openGui();
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
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
  document.getElementById("topBar").style.visibility = "hidden";
}

function synthWave(data) {
  polySynth.set({
    "oscillator": {
      "type": data
    }
  });
  typeofOsc = data;
}

function noiseType(data) {
  noiseOne.type = data;
  if (data == 'white') {
    noiseOne.volume.value = -10;
  }
}

function noiseOneFrequencyTime(data) {
  autoFilterOne.set({
    "frequency": data
  });
}

function partialCount(data) {
  polySynth.set({
    "oscillator": {
      "type": typeofOsc + data
    }
  });
}

function noiseRoloff(data) {
  autoFilterOne.set({
    "filter": {
      "rolloff": data
    }
  });
}

function autofilterWave(data) {
  autoFilterOne.set({
    "type": data
  });
}