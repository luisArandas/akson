/**
 * @author Luis Arandas  http://luisarandas.org
 */

/*
$(".dropdown-menu li a").click(function() {
  $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
}); */


var instrumentOne = false;
var instrumentTwo = false;
var instrumentThree = false;
var instrumentFour = false;

var connectSoundVisuals = false;

//EQUALIZE THE MASTER
//STOP THE VISUALS
//CRIAR O BOTAO DE SEPARATE AUDIO FROM VISUALS

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
    phase  : 0 ,
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

var oscilloscope = new Nexus.Oscilloscope('#oscilloscope', {
  'size': [250, 100]
});
oscilloscope.connect(Tone.Master);

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
});


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








//FAZER O RESTO DO REVERB
//  console.log(reverb.dampening.value);

/*
$(document).ready(function() {});

CHANGE MOBILE THINGS AND PUT DIFFERENT BEHAVIORS (TONE PAYBACK IN VISUALS)
loading bar on query
call js function from another page
document.onload = function ...
document.addEventListener("DOMContentLoaded", function(){
    //....
});
SE MOBILE DEVICE ENTAO -> .VISUALS
VER SE CONSIGO TER UM VISUALIZADOR PARA A OSCILAÇAO OUTRO PARA O PIANO



nx.onload = function() {
  nx.sendsTo("node");
  // nx.sendsTo(function(data){
  //     socket.emit('nx', { id: this.canvasID, data: data });
  // });
}
*/
/*
check this
var player = new Tone.Player("./path/to/sample.mp3").toMaster();
  play as soon as the buffer is loaded
player.autostart = true;
*/

/*var Person = function(name, yearOfBirth, job){
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

/*------------------------------------------------------------------------------------------------------------*/


function leadInstrumentDiv() {
  document.getElementById("instrumentoUm").style.height = '100%';
  document.getElementById("instrumentoDois").style.height = '0%';
  document.getElementById("instrumentoTres").style.height = '0%';
  document.getElementById("instrumentoQuatro").style.height = '0%';
  if (connectSoundVisuals == true) {
    var evt = new KeyboardEvent('keydown', {
      'keyCode': 81,
      'which': 81
    });
    document.dispatchEvent(evt);
  }
}

function backgroundInstrumentDiv() {
  document.getElementById("instrumentoDois").style.height = '100%';
  document.getElementById("instrumentoUm").style.height = '0%';
  document.getElementById("instrumentoTres").style.height = '0%';
  document.getElementById("instrumentoQuatro").style.height = '0%';
  if (connectSoundVisuals == true) {
    var evt = new KeyboardEvent('keydown', {
      'keyCode': 87,
      'which': 87
    });
    document.dispatchEvent(evt);
  }
}

function sequencerInstrumentDiv() {
  document.getElementById("instrumentoTres").style.height = '100%';
  document.getElementById("instrumentoUm").style.height = '0%';
  document.getElementById("instrumentoDois").style.height = '0%';
  document.getElementById("instrumentoQuatro").style.height = '0%';
  if (connectSoundVisuals == true) {
    var evt = new KeyboardEvent('keydown', {
      'keyCode': 69,
      'which': 69
    });
    document.dispatchEvent(evt);
  }
}

function backTwoInstrumentDiv() {
  document.getElementById("instrumentoQuatro").style.height = '100%';
  document.getElementById("instrumentoUm").style.height = '0%';
  document.getElementById("instrumentoDois").style.height = '0%';
  document.getElementById("instrumentoTres").style.height = '0%';
  if (connectSoundVisuals == true) {
    var evt = new KeyboardEvent('keydown', {
      'keyCode': 82,
      'which': 82
    });
    document.dispatchEvent(evt);
  }
}

function muteButton() {
  if (Tone.Master.mute == false) {
    Tone.Master.mute = true;
  } else {
    Tone.Master.mute = false;
  }
}

function connectButton() {
  if (connectSoundVisuals == true) {
    connectSoundVisuals = false;
    console.log("not connected");
  } else {
    connectSoundVisuals = true;
    console.log("connected");
  }
}




function selectOneSaw() {
  polySynth.set({
    "oscillator": {
      "type": "saw"
    }
  });
}