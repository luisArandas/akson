/**
 * @author Luis Arandas  http://luisarandas.org
 * @author José Alberto Gomes  http://jasg.net/Home.html
 * @author Rui Penha  http://ruipenha.pt/
 *
 *  All this code was done under the context of a research
 *  between Braga Media Arts and the University of Porto © 2019
 */

 /* Midi Learn Architecture */

var isMidiLearn = false;
var nexusIds = ["synthvolume", "backgroundvolume", "mainvolume", "eqbass", "eqmid", "eqhigh", "lowfreq", "highfreq", "synthAttack", "synthDecay", "synthSustain", "synthRelease", "harmonicity", "modulationindex", "detune", "oscillatorModulationIndex", "oscillatorHarmonicity", "modulationEnvelopeAttack", "modulationEnvelopeDecay", "modulationEnvelopeRelease", "modulationEnvelopeSustain", "reverbRoomSize", "reverbWetValue", "reverbDampValue", "noiseOnePlaybackRate", "noiseq", "noiseoctaves", "autoFilterFrequency", "noiseMin", "noiseMax", "autoFilterWet", "autoFilterDepth", "afbasefrequency"];

var learnStartDiv = "";

var midiEvent = new Array(34);
for (var i = 0; i < midiEvent.length; ++i) {
  midiEvent[i] = 0;
}
var isSynthAttack = 0;

//var smi = new SimpleMidiInput();
//console.log(smi);

var idsToLearn = "";

if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
    sysex: false
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
  //console.log('MIDI Access Object', midiAccess);
  //To print the object
}

function onMIDIMessage(event) {
  data = event.data;
  midiValOne = data[0];
  midiValTwo = data[1];
  midiValThree = data[2];
  console.log(data);
  // Attack
  if (data[0] == 176 && data[1] == 8) {
    a = data[2];
    _a = a.map(0,127,0,6);
    console.log(_a);
    lightOne.intensity = _a;
    lightTwo.intensity = _a;
    lightThree.intensity = _a;
    lightFour.intensity = _a;
    //printLogsDialog("Synthesizer Attack : ", _a);
  }
  if (data[0] == 176 && data[1] == 9) {
    a = data[2];
    _a = a.map(0,127,0.1,5);
    console.log(_a);
    camera.aspect = _a;
    camera.updateProjectionMatrix();

    /*UI.synthDecay._value.update(_a);
    UI.synthDecay.render();
    polySynth.set({
      "envelope": {
        "decay": _a
      }
    });
    printLogsDialog("Synthesizer Decay : ", _a);*/
  }
  if (data[0] == 176 && data[1] == 10) {
    a = data[2];
    _a = a.map(0,127,0,2);
    camera.zoom = _a;
    camera.updateProjectionMatrix();
    //printLogsDialog("Synthesizer Sustain : ", _a);
  }
  if (data[0] == 176 && data[1] == 12) {
    a = data[2];
    _a = a.map(0,127,1,1400);
    camera.near = _a;
    camera.updateProjectionMatrix();
    //printLogsDialog("Synthesizer Release : ", _a);
  }
  if (data[0] == 176 && data[1] == 13) {
    a = data[2];
    _a = a.map(0,127,0,15);
    //printLogsDialog("Vibrato Frequency : ", _a);
  }
  if (data[0] == 176 && data[1] == 53) {
    a = data[2];
    _a = a.map(0,127,0,100);
    autoFilterOne.set({
      "frequency": _a
    });
  }
  if (data[0] == 176 && data[1] == 54) {
    a = data[2];
    _a = a.map(0,127,100,1000);
    autoFilterOne.set({
      "baseFrequency": _a
    });
  }
  if (data[0] == 176 && data[1] == 55) {
    a = data[2];
    _a = a.map(0,127,-2.5,8);
    autoFilterOne.set({
      "octaves": _a
    });
  }


}

/*
function changeUIafterLearn(a, v, x) {
  if (a == "isSynthAttack" && v != 0) {
    polySynth.set({
      "envelope": {
        "attack": x
      }
    });
    UI.synthAttack._value.update(x);
    UI.synthAttack.render();
  }



  if (idsToLearn == "synthvolume") {}
  if (idsToLearn == "backgroundvolume") {}
  if (idsToLearn == "mainvolume") {}
  if (idsToLearn == "eqbass") {}
  if (idsToLearn == "eqmid") {}
  if (idsToLearn == "eqhigh") {}
  if (idsToLearn == "lowfreq") {}
  if (idsToLearn == "highfreq") {}
  if (idsToLearn == "synthAttack") {}
  if (idsToLearn == "synthDecay") {}
  if (idsToLearn == "synthSustain") {}
  if (idsToLearn == "synthRelease") {}
  if (idsToLearn == "harmonicity") {}
  if (idsToLearn == "modulationindex") {}
  if (idsToLearn == "detune") {}
  if (idsToLearn == "oscillatorModulationIndex") {}
  if (idsToLearn == "oscillatorHarmonicity") {}
  if (idsToLearn == "modulationEnvelopeAttack") {}
  if (idsToLearn == "modulationEnvelopeDecay") {}
  if (idsToLearn == "modulationEnvelopeRelease") {}
  if (idsToLearn == "modulationEnvelopeSustain") {}
  if (idsToLearn == "reverbRoomSize") {}
  if (idsToLearn == "reverbWetValue") {}
  if (idsToLearn == "reverbDampValue") {}
  if (idsToLearn == "noiseOnePlaybackRate") {}
  if (idsToLearn == "noiseq") {}
  if (idsToLearn == "noiseoctaves") {}
  if (idsToLearn == "autoFilterFrequency") {}
  if (idsToLearn == "noiseMin") {}
  if (idsToLearn == "noiseMax") {}
  if (idsToLearn == "autoFilterWet") {}
  if (idsToLearn == "autoFilterDepth") {}
  if (idsToLearn == "afbasefrequency") {}
}*/

/*
data[0] = type of command that was sent
data[1] = note value
data[2] = velocity

176 => sliders and knobs
153 => pads
224 => pitchBend wheel
144 => keys, data[1] was 12 to 72
*/


function onMIDIFailure(e) {
  console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. " + e);
}

function startLearning() {
  console.log("working midi Learn button");
  if (isMidiLearn != true) {
    isMidiLearn = true;
  } else if (isMidiLearn != false) {
    isMidiLearn = false;
  }
  if (document.getElementById("learnMidi").style.background != "white") {
    document.getElementById("learnMidi").style.background = "white";
    document.getElementById("learnMidi").style.border = "1px solid #ffffff";
    nexusIds.forEach(function(id) {
      document.getElementById(id).style.border = "1px solid #ff66ff";
    });
  } else if (document.getElementById("learnMidi").style.background == "white") {
    document.getElementById("learnMidi").style.background = "black";
    document.getElementById("learnMidi").style.border = "1px solid rgba(50, 50, 50, 1)";
    nexusIds.forEach(function(id) {
      document.getElementById(id).style.border = "1px solid rgba(50, 50, 50, 1)";
    });
  }
}
var green = "1px solid #00ff00";
var violet = "1px solid #ff66ff";


$('div').click(function() {
  if (isMidiLearn == true) {
    mlSynthAttack.startListening();
    if ($.inArray(this.id, nexusIds) != -1) {
      changeStateMidiUI(this.id);
    }
  }
});

function changeStateMidiUI(v) {
  if (v != learnStartDiv) {
    nexusIds.forEach(function(id) {
      document.getElementById(id).style.border = "1px solid #ff66ff";
    });
    document.getElementById(v).style.border = green;
    idsToLearn = v;

    if (idsToLearn == "synthAttack") {
      mlSynthAttack.bind();
    }
  }
}

var onMIDIStarted = function(midi) {
  console.log('onMIDIStarted', midi);
  //smi.attach(midi);
};

var synthAttack = document.getElementById('synthAttack');

var change = function(value) {
  console.log('parameter change:', value);
};

/*var mlSynthAttack = smi.getMidiLearning({
  id: synthAttack.id,
  min: synthAttack.min,
  max: synthAttack.max,
  value: synthAttack.value,
  events: {
    bind: function() {
      console.log('bind', arguments);
    },
    unbind: function() {
      console.log('unbind', arguments);
    },
    listen: function() {
      console.log('listen', arguments);
    },
    cancel: function() {
      console.log('cancel', arguments);
    },
    change: function(id, value) {
      console.log('change', arguments);
      synthAttack.value = value;
      change(value);
    }
  }
});

synthAttack.addEventListener('change', function() {
  change(synthAttack.value);
});
*/

/* AudioKeys Project */

var keyboard = new AudioKeys();

keyboard.down(function(note) {
  //note.keyCode, note.frequency, note.velocity, note.isActive, note.note;
  //piano.toggleKey(note.note, true);
});

keyboard.up(function(note) {
  //piano.toggleKey(note.note, false);
});

/* For post Process
function shaderButtons(v) {
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "This doesn't work right now, sorry.<br> Post processing shaders can be acessed through the keyboard keys A, S and D. <br> This is not fully implemented so use at your own risk.";
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
}*/
