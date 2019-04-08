/* Change the Network State */

socket = io.connect(window.location.origin);

var isStreaming = false;
var isAlone = false;
var isAlocating = false;

/* Make this */
var isAlocatingSynth = true;
var isAlocatingBack = true;
var isAlocatingGraphs = true;
var isAlocatingPost = true;

var values = new Array(34);
for (var i = 0; i < values.length; ++i) {
  values[i] = 0;
}
socket.on('changeStream', streamCortex);
var modalAlocate = document.getElementById('modalAlocate');


socket.on('uiSocketSynthVolume', function(data) {
  if (isStreaming == true) {
    if (data.y == "synthVolume") {
      //polySynth.volume.value = data.x;
      values[0] = data.x;
      UI.synthvolume._value.update(values[0]);
      UI.synthvolume.render();
      polySynth.volume.value = values[0];
    }
  }
});
socket.on('uiSocketBackgroundVolume', function(data) {
  if (isStreaming == true) {
    if (data.y == "backgroundVolume") {
      values[1] = data.x;
      UI.backgroundvolume._value.update(values[1]);
      UI.backgroundvolume.render();
      noiseOne.volume.value = values[1];
    }
  }
});
socket.on('uiSocketMainVolume', function(data) {
  if (isStreaming == true) {
    if (data.y == "mainVolume") {
      values[2] = data.x;
      UI.mainvolume._value.update(values[2]);
      UI.mainvolume.render();
      Tone.Master.volume.value = values[2];
    }
  }
});
socket.on('uiSocketSynthAttack', function(data) {
  if (isStreaming == true) {
    if (data.y == "synthAttack") {
      values[3] = data.x;
      UI.synthAttack._value.update(values[3]);
      UI.synthAttack.render();
      polySynth.set({
        "envelope": {
          "attack": values[3]
        }
      });
    }
  }
  if (isAlocating === true) {
    console.log("mofo we are working");
  }
});
socket.on('uiSocketSynthDecay', function(data) {
  if (isStreaming == true) {
    if (data.y == "synthDecay") {
      values[4] = data.x;
      UI.synthDecay._value.update(values[4]);
      UI.synthDecay.render();
      polySynth.set({
        "envelope": {
          "decay": values[4]
        }
      });
    }
  }
});
socket.on('uiSocketSynthSustain', function(data) {
  if (isStreaming == true) {
    if (data.y == "synthSustain") {
      values[5] = data.x;
      UI.synthSustain._value.update(values[5]);
      UI.synthSustain.render();
      polySynth.set({
        "envelope": {
          "sustain": values[5]
        }
      });
    }
  }
});
socket.on('uiSocketSynthRelease', function(data) {
  if (isStreaming == true) {
    if (data.y == "synthRelease") {
      values[6] = data.x;
      UI.synthRelease._value.update(values[6]);
      UI.synthRelease.render();
      polySynth.set({
        "envelope": {
          "release": values[6]
        }
      });
    }
  }
});
socket.on('uiSocketHarmonicity', function(data) {
  if (isStreaming == true) {
    if (data.y == "harmonicity") {
      values[7] = data.x;
      UI.harmonicity._value.update(values[7]);
      UI.harmonicity.render();
      polySynth.set({
        "harmonicity": values[7]
      });
    }
  }
});
socket.on('uiSocketModulationIndex', function(data) {
  if (isStreaming == true) {
    if (data.y == "modulationIndex") {
      values[8] = data.x;
      UI.modulationindex._value.update(values[8]);
      UI.modulationindex.render();
      polySynth.set({
        "modulationIndex": values[8]
      });
    }
  }
});
socket.on('uiSocketDetune', function(data) {
  if (isStreaming == true) {
    if (data.y == "detune") {
      values[9] = data.x;
      UI.detune._value.update(values[9]);
      UI.detune.render();
      polySynth.set({
        "detune": values[9]
      });
    }
  }
});
socket.on('uiSocketOscillatorModulationIndex', function(data) {
  if (isStreaming == true) {
    if (data.y == "oscillatorModulationIndex") {
      values[10] = data.x;
      UI.oscillatorModulationIndex._value.update(values[10]);
      UI.oscillatorModulationIndex.render();
      polySynth.set({
        "oscillator": {
          "modulationIndex": values[10]
        }
      });
    }
  }
});
socket.on('uiSocketOscillatorHarmonicity', function(data) {
  if (isStreaming == true) {
    if (data.y == "oscillatorHarmonicity") {
      values[11] = data.x;
      UI.oscillatorHarmonicity._value.update(values[11]);
      UI.oscillatorHarmonicity.render();
      polySynth.set({
        "oscillator": {
          "harmonicity": values[11]
        }
      });
    }
  }
});
socket.on('uiSocketModulationEnvelopeAttack', function(data) {
  if (isStreaming == true) {
    if (data.y == "modulationEnvelopeAttack") {
      values[12] = data.x;
      UI.modulationEnvelopeAttack._value.update(values[12]);
      UI.modulationEnvelopeAttack.render();
      polySynth.set({
        "modulationEnvelope": {
          "attack": values[12]
        }
      });
    }
  }
});
socket.on('uiSocketModulationEnvelopeDecay', function(data) {
  if (isStreaming == true) {
    if (data.y == "modulationEnvelopeDecay") {
      values[13] = data.x;
      UI.modulationEnvelopeDecay._value.update(values[13]);
      UI.modulationEnvelopeDecay.render();
      polySynth.set({
        "modulationEnvelope": {
          "decay": values[13]
        }
      });
    }
  }
});
socket.on('uiSocketModulationEnvelopeSustain', function(data) {
  if (isStreaming == true) {
    if (data.y == "modulationEnvelopeSustain") {
      values[14] = data.x;
      UI.modulationEnvelopeSustain._value.update(values[14]);
      UI.modulationEnvelopeSustain.render();
      polySynth.set({
        "modulationEnvelope": {
          "sustain": values[14]
        }
      });
    }
  }
});
socket.on('uiSocketModulationEnvelopeRelease', function(data) {
  if (isStreaming == true) {
    if (data.y == "modulationEnvelopeRelease") {
      values[15] = data.x;
      UI.modulationEnvelopeRelease._value.update(values[15]);
      UI.modulationEnvelopeRelease.render();
      polySynth.set({
        "modulationEnvelope": {
          "release": values[15]
        }
      });
    }
  }
});
socket.on('uiSocketReverbRoomSize', function(data) {
  if (isStreaming == true) {
    if (data.y == "reverbRoomSize") {
      values[16] = data.x;
      UI.reverbRoomSize._value.update(values[16]);
      UI.reverbRoomSize.render();
      reverb.roomSize.value = values[16];
    }
  }
});
socket.on('uiSocketReverbWetValue', function(data) {
  if (isStreaming == true) {
    if (data.y == "reverbWetValue") {
      values[17] = data.x;
      UI.reverbWetValue._value.update(values[17]);
      UI.reverbWetValue.render();
      reverb.wet.value = values[17];
    }
  }
});
socket.on('uiSocketReverbDampValue', function(data) {
  if (isStreaming == true) {
    if (data.y == "reverbDampValue") {
      values[18] = data.x;
      UI.reverbDampValue._value.update(values[18]);
      UI.reverbDampValue.render();
      reverb.dampening.value = values[18];
    }
  }
});
socket.on('uiSocketNoiseOnePlaybackRate', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseOnePlaybackRate") {
      values[19] = data.x;
      UI.noiseOnePlaybackRate._value.update(values[19]);
      UI.noiseOnePlaybackRate.render();
      noiseOne.playbackRate = values[19];
    }
  }
});
socket.on('uiSocketAutoFilterFrequency', function(data) {
  if (isStreaming == true) {
    if (data.y == "autoFilterFrequency") {
      values[20] = data.x;
      UI.autoFilterFrequency._value.update(values[20]);
      UI.autoFilterFrequency.render();
      autoFilterOne.set({
        "frequency": values[20]
      });
    }
  }
});
socket.on('uiSocketNoiseOneMin', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseOneMin") {
      values[21] = data.x;
      UI.noiseMin._value.update(values[21]);
      UI.noiseMin.render();
      noiseOne.min = values[21];
    }
  }
});
socket.on('uiSocketNoiseOneMax', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseOneMax") {
      values[22] = data.x;
      UI.noiseMax._value.update(values[22]);
      UI.noiseMax.render();
      noiseOne.max = values[22];
    }
  }
});
socket.on('uiSocketNoiseOneWet', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseOneWet") {
      values[23] = data.x;
      UI.autoFilterWet._value.update(values[23]);
      UI.autoFilterWet.render();
      noiseOne.wet = values[23];
    }
  }
});
socket.on('uiSocketNoiseOneDepth', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseOneDepth") {
      values[24] = data.x;
      UI.autoFilterDepth._value.update(values[24]);
      UI.autoFilterDepth.render();
      noiseOne.depth = values[24];
    }
  }
});
socket.on('uiSocketNoiseQ', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseq") {
      values[25] = data.x;
      UI.noiseq._value.update(values[25]);
      UI.noiseq.render();
      autoFilterOne.set({
        "filter": {
          "q": values[25]
        }
      });
    }
  }
});
socket.on('uiSocketNoiseOctaves', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseOctaves") {
      values[26] = data.x;
      UI.noiseoctaves._value.update(values[26]);
      UI.noiseoctaves.render()
      autoFilterOne.set({
        "octaves": values[26]
      });
    }
  }
});
socket.on('uiSocketAfBaseFrequency', function(data) {
  if (isStreaming == true) {
    if (data.y == "afBaseFrequency") {
      values[27] = data.x;
      UI.afbasefrequency._value.update(values[27]);
      UI.afbasefrequency.render();
      autoFilterOne.set({
        "baseFrequency": values[27]
      });
    }
  }
});
socket.on('uiSocketEqBass', function(data) {
  if (isStreaming == true) {
    if (data.y == "eqBass") {
      values[28] = data.x;
      UI.eqbass._value.update(values[28]);
      UI.eqbass.render();
      eq.low.value = values[28];
    }
  }
});
socket.on('uiSocketEqMid', function(data) {
  if (isStreaming == true) {
    if (data.y == "eqMid") {
      values[29] = data.x;
      UI.eqmid._value.update(values[29]);
      UI.eqmid.render();
      eq.mid.value = values[29];
    }
  }
});
socket.on('uiSocketEqHigh', function(data) {
  if (isStreaming == true) {
    if (data.y == "eqHigh") {
      values[30] = data.x;
      UI.eqhigh._value.update(values[30]);
      UI.eqhigh.render();
      eq.high.value = values[30];
    }
  }
});
socket.on('uiSocketEqLowFreq', function(data) {
  if (isStreaming == true) {
    if (data.y == "eqLowFreq") {
      values[31] = data.x;
      UI.lowfreq._value.update(values[31]);
      UI.lowfreq.render();
      eq.lowFrequency.value = values[31];
    }
  }
});
socket.on('uiSocketEqHighFreq', function(data) {
  if (isStreaming == true) {
    if (data.y == "eqHighFreq") {
      values[32] = data.x;
      UI.highfreq._value.update(values[32]);
      UI.highfreq.render();
      eq.highFrequency.value = values[32];
    }
  }
});
// Buttons
socket.on('noiseWaveType', function(data) {
  if (isStreaming == true) {
    noiseOne.type = data;
    if (data == 'white') {
      noiseOne.volume.value = -10;
    }
    console.log(data);
  }
});
socket.on('noiseRoloffType', function(data) {
  if (isStreaming == true) {
    autoFilterOne.set({
      "filter": {
        "rolloff": data
      }
    });
  }
});
socket.on('autoFilterWaveType', function(data) {
  if (isStreaming == true) {
    autoFilterOne.set({
      "type": data
    });
  }
});
socket.on('noiseOneFrequencyTimeNumber', function(data) {
  if (isStreaming == true) {
    autoFilterOne.set({
      "frequency": data
    });
  }
});
socket.on('synthWaveType', function(data) {
  if (isStreaming == true) {
    polySynth.set({
      "oscillator": {
        "type": data
      }
    });
    typeofOsc = data;
  }
});
socket.on('noisePartialCount', function(data) {
  if (isStreaming == true) {
    polySynth.set({
      "oscillator": {
        "type": typeofOsc + data
      }
    });
  }
});


function changeState(v) {
  if (v == "descenter") {
    socket.connected = true;
    isStreaming = false;
    isAlone = false;
    isAlocating = false;
    openGui();
    document.getElementById("stateButtonOne").style.border = "2px solid rgba(150,150,150,1)";
    document.getElementById("stateButtonTwo").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonThree").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonFour").style.border = "1px solid rgba(50,50,50,1)";
  }
  if (v == "streamed") {
    socket.connected = true;
    isStreaming = true;
    isAlone = false;
    isAlocating = false;
    openGui();
    document.getElementById("stateButtonOne").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonTwo").style.border = "2px solid rgba(150,150,150,1)";
    document.getElementById("stateButtonThree").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonFour").style.border = "1px solid rgba(50,50,50,1)";
  }
  if (v == "alocate") {
    socket.connected = true;
    isStreaming = false;
    isAlone = false;
    isAlocating = true;
    openGui();
    WUI_Dialog.open("alocate_dialog");
    document.getElementById("stateButtonOne").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonTwo").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonThree").style.border = "2px solid rgba(150,150,150,1)";
    document.getElementById("stateButtonFour").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById('inst1').style.pointerEvents = "none";
    document.getElementById('inst2').style.pointerEvents = "none";
    document.getElementById('inst3').style.pointerEvents = "none";
    document.getElementById('inst4').style.pointerEvents = "none";
  }
  if (v == "monitor") {
    socket.connected = true;
    openGui();
    WUI_Dialog.open("monitor_dialog");
    document.getElementById("stateButtonOne").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonTwo").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonThree").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonFour").style.border = "2px solid rgba(150,150,150,1)";
  }
  if (v == "alone") {
    socket.connected = false;
    isStreaming = false;
    isAlone = true;
    isAlocating = false;
    openGui();
  }
  if (v) {
    modalAbout.style.display = "none";
    modalMode.style.display = "none";
    modalScale.style.display = "none";
  }
}

function streamCortex() {}

function alocateCortex(v) {
  if (isAlocating === true) {
    if (v === "alocateOne") {
      if (document.getElementById("alocateOne").style.background != "white") {
        document.getElementById("alocateOne").style.background = "white";
        document.getElementById("alocateOne").style.color = "black";
      } else if (document.getElementById("alocateOne").style.background == "white") {
        document.getElementById("alocateOne").style.background = "black";
        document.getElementById("alocateOne").style.color = "white";
      }
      document.getElementById("alocateTwo").style.background = "black";
      document.getElementById("alocateThree").style.background = "black";
      document.getElementById("alocateFour").style.background = "black";
      document.getElementById("alocateTwo").style.color = "white";
      document.getElementById("alocateThree").style.color = "white";
      document.getElementById("alocateFour").style.color = "white";
      document.getElementById("inst1").click();

    }
    if (v === "alocateTwo") {
      if (document.getElementById("alocateTwo").style.background != "white") {
        document.getElementById("alocateTwo").style.background = "white";
        document.getElementById("alocateTwo").style.color = "black";
      } else if (document.getElementById("alocateTwo").style.background == "white") {
        document.getElementById("alocateTwo").style.background = "black";
        document.getElementById("alocateTwo").style.color = "white";
      }
      document.getElementById("alocateOne").style.background = "black";
      document.getElementById("alocateThree").style.background = "black";
      document.getElementById("alocateFour").style.background = "black";
      document.getElementById("alocateOne").style.color = "white";
      document.getElementById("alocateThree").style.color = "white";
      document.getElementById("alocateFour").style.color = "white";
      document.getElementById("inst2").click();

    }
    if (v === "alocateThree") {
      if (document.getElementById("alocateThree").style.background != "white") {
        document.getElementById("alocateThree").style.background = "white";
        document.getElementById("alocateThree").style.color = "black";
      } else if (document.getElementById("alocateThree").style.background == "white") {
        document.getElementById("alocateThree").style.background = "black";
        document.getElementById("alocateThree").style.color = "white";
      }
      document.getElementById("alocateOne").style.background = "black";
      document.getElementById("alocateTwo").style.background = "black";
      document.getElementById("alocateFour").style.background = "black";
      document.getElementById("alocateOne").style.color = "white";
      document.getElementById("alocateTwo").style.color = "white";
      document.getElementById("alocateFour").style.color = "white";
      document.getElementById("inst3").click();

    }
    if (v === "alocateFour") {
      if (document.getElementById("alocateFour").style.background != "white") {
        document.getElementById("alocateFour").style.background = "white";
        document.getElementById("alocateFour").style.color = "black";
      } else if (document.getElementById("alocateFour").style.background == "white") {
        document.getElementById("alocateFour").style.background = "black";
        document.getElementById("alocateFour").style.color = "white";
      }
      document.getElementById("alocateOne").style.background = "black";
      document.getElementById("alocateTwo").style.background = "black";
      document.getElementById("alocateThree").style.background = "black";
      document.getElementById("alocateOne").style.color = "white";
      document.getElementById("alocateTwo").style.color = "white";
      document.getElementById("alocateThree").style.color = "white";
      document.getElementById("inst4").click();

    }
  }
}


socket.on('socketid', function(socketid) {
  if (isAlocating == true) {
    console.log("SocketID " + socketid);
  }
});
socket.on('socketnumber', function(connections) {
  if (isAlocating == true) {
    console.log("Connections " + connections);
  }
});

/*Check stream Cortex
Add alocation + Play alone*/