var isMidiLearn = false;
var nexusIds = ["oscilloscope", "synthvolume", "backgroundvolume", "mainvolume", "eqbass", "eqmid", "eqhigh", "lowfreq", "highfreq", "synthAttack", "synthDecay", "synthSustain", "synthRelease", "harmonicity", "modulationindex", "detune", "oscillatorModulationIndex", "oscillatorHarmonicity", "modulationEnvelopeAttack", "modulationEnvelopeDecay", "modulationEnvelopeRelease", "modulationEnvelopeSustain", "reverbRoomSize", "reverbWetValue", "reverbDampValue", "noiseOnePlaybackRate", "noiseq", "noiseoctaves", "autoFilterFrequency", "noiseMin", "noiseMax", "autoFilterWet", "autoFilterDepth", "afbasefrequency"];

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
    data = event.data;
    midiValOne = data[0];
    midiValTwo = data[1];
    midiValThree = data[2];
    console.log(data);
    if (midiValOne == 176 && midiValTwo == 8) {
      console.log(midiValThree);
    }
  }
  if (isMidiLearn == false) {
    data = event.data;
    midiValOne = data[0];
    midiValTwo = data[1];
    midiValThree = data[2];
    console.log(data);
  }
}

/*
$('div').click(function() {
  if (isMidiLearn == true) {
    console.log(this.id);
    if ($.inArray(this.id, nexusIds) != -1) {
      document.getElementById(this.id).style.border = "1px solid #ffffff";
    } else {
      document.getElementById(this.id).style.border = "1px solid rgba(50, 50, 50, 1)";
    }
  }
});

/*
data[0] = type of command that was sent
data[1] = note value
data[2] = velocity
*/

function onMIDIFailure(e) {
  console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. " + e);
}

function learnMidi() {
  console.log("working midi Learn button");
  if (isMidiLearn != true) {
    isMidiLearn = true;
  } else if (isMidiLearn != false) {
    isMidiLearn = false;
  }
  if (document.getElementById("learnMidi").style.background != "white") {
    document.getElementById("learnMidi").style.background = "white";
    document.getElementById("learnMidi").style.border = "1px solid #ffffff";
  } else if (document.getElementById("learnMidi").style.background == "white") {
    document.getElementById("learnMidi").style.background = "black";
    document.getElementById("learnMidi").style.border = "1px solid rgba(50, 50, 50, 1)";
  }
  console.log("isMidiLearn " + isMidiLearn);
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

// --------------------------- OSC --------------------------------

//https: //github.com/colinbdclark/osc.js/
// ----------------------------------------------------------------