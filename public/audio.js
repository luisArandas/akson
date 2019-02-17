/**
 * @author Luis Arandas  http://luisarandas.org
 */

var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById('myModal');

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
  autoFilterFrequency: new Nexus.Slider('#autoFilterFrequency', {
    min: 500,
    max: 5000,
    step: 0.1,
    mode: 'absolute',
    value: 500
  }),
  autoFilterMin: new Nexus.Slider('#autoFilterMin', {
    min: 100,
    max: 1000,
    step: 0.1,
    mode: 'absolute',
    value: 3000
  }),
  autoFilterMax: new Nexus.Slider('#autoFilterMax', {
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
}
//CENA DOIS 2 N

for (var key in UI) {
  UI[key].on('change', function(value) {
    var logs = document.getElementById('logs'),
      output_node = document.createElement("div");
    output_node.innerHTML = UI[key] + value;
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
  console.log(_v);
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "Background volume -" + _v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
});
UI.mainvolume.on('change', function(v) {
  Tone.Master.volume.value = v;
  _v = parseFloat(Math.round(v * 100) / 100).toFixed(1);
  console.log(_v);
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
UI.autoFilterMin.on('change', function(v) {
  noiseOne.min = v;
});
UI.autoFilterMax.on('change', function(v) {
  noiseOne.max = v;
});
UI.autoFilterWet.on('change', function(v) {
  noiseOne.wet = v;
});
UI.autoFilterDepth.on('change', function(v) {
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
    //document.getElementById('body').style.cursor = 'none';
    document.body.style.cursor = 'none !important';
    console.log("hideCursor");
  }
  if (data == "hideGui") {
    guiIsVisible = false;
    WUI_Dialog.close("master_dialog");
    WUI_Dialog.close("cockpit_dialog");
    WUI_Dialog.close("logs_dialog");
    document.getElementById("topBar").style.visibility = "hidden";
  }
  if (data == "recordAudio") {
    /* Record audio here */
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