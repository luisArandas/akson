/* Midi Learn Architecture */
var isMidiLearn = false;
var nexusIds = ["oscilloscope", "synthvolume", "backgroundvolume", "mainvolume", "eqbass", "eqmid", "eqhigh", "lowfreq", "highfreq", "synthAttack", "synthDecay", "synthSustain", "synthRelease", "harmonicity", "modulationindex", "detune", "oscillatorModulationIndex", "oscillatorHarmonicity", "modulationEnvelopeAttack", "modulationEnvelopeDecay", "modulationEnvelopeRelease", "modulationEnvelopeSustain", "reverbRoomSize", "reverbWetValue", "reverbDampValue", "noiseOnePlaybackRate", "noiseq", "noiseoctaves", "autoFilterFrequency", "noiseMin", "noiseMax", "autoFilterWet", "autoFilterDepth", "afbasefrequency"];

var midiEvent = new Array(34);
for (var i = 0; i < midiEvent.length; ++i) {
  midiEvent[i] = 0;
}
var idsToLearn = [];

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
  console.log('MIDI Access Object', midiAccess);
}

function onMIDIMessage(event) {
  if (isMidiLearn == true) {
    if (idsToLearn.length > 0) {
      console.log("we have something");
      /* reverb.roomSize.value = v;
       Check all the methods and add 4 functions here to add midi dinamically
       var idsToLearn = [];
       console.log(idsToLearn);
       midiValOne = data[0];
       midiValTwo = data[1];
       midiValThree = data[2];
       console.log(data); */
    }
  }
}

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
  learnMidi();
}

function learnMidi() {
  $('div').click(function() {
    if (isMidiLearn == true) {
      if ($.inArray(this.id, nexusIds) != -1) {
        document.getElementById(this.id).style.border = "1px solid #00ff00";
        if (idsToLearn.includes(this.id) == false) {
          idsToLearn.push(this.id);
        }
        console.log(idsToLearn);
      }
    }
  });
}

// ---------------------- LAPTOP KEYBOARD -------------------------

//(Z o-) (X o+) linha do meio CDEFGABCDEF
//link here https://github.com/kylestetz/AudioKeys

var keyboard = new AudioKeys();

keyboard.down(function(note) {
  //note.keyCode, note.frequency, note.velocity, note.isActive, note.note;
  //piano.toggleKey(note.note, true);
});

keyboard.up(function(note) {
  //piano.toggleKey(note.note, false);
});
// ----------------------------------------------------------------

// --------------------------- Record --------------------------------
// check https://doc.esdoc.org/github.com/adzialocha/osc-js/

/*const mediaSource = new MediaSource();
console.log(mediaSource);
https://github.com/webrtc/samples/tree/gh-pages/src/content/capture/canvas-record
https://github.com/imgntn/j360
Media Source Recorder */


/* For post Process
function shaderButtons(v) {
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "This doesn't work right now, sorry.<br> Post processing shaders can be acessed through the keyboard keys A, S and D. <br> This is not fully implemented so use at your own risk.";
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
}*/ // ----------------------------------------------------------------