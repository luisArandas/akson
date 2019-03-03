/* Change the Network State */

socket = io.connect(window.location.origin);

var isStreaming = false;

var values = new Array(34);
for (var i = 0; i < values.length; ++i) {
  values[i] = 0;
}
socket.on('changeStream', streamCortex);

/*
socket.on('socketid', function(socketid) {
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = 'Key - ' + socketid + '<br>' + '//////////////////////////' + '<br>';
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
});
*/

socket.on('uiSocketSynthVolume', function(data) {
  if (isStreaming == true) {
    if (data.y == "synthVolume") {
      //polySynth.volume.value = data.x;
      values[0] = data.x;
      if (UI.synthvolume.value != values[0]) {
        UI.synthvolume.value = values[0];
      }
    } else {
      console.log("");
    }
  }
});
socket.on('uiSocketBackgroundVolume', function(data) {
  if (isStreaming == true) {
    if (data.y == "backgroundVolume") {
      values[1] = data.x;
      if (values[1] != UI.backgroundvolume.value) {
        UI.backgroundvolume.value = values[1];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketMainVolume', function(data) {
  if (isStreaming == true) {
    if (data.y == "mainVolume") {
      values[2] = data.x;
      if (values[2] != UI.mainvolume.value) {
        UI.mainvolume.value = values[2];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketSynthAttack', function(data) {
  if (isStreaming == true) {
    if (data.y == "synthAttack") {
      values[3] = data.x;
      if (values[3] != UI.synthAttack.value) {
        UI.synthAttack.value = values[3];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketSynthDecay', function(data) {
  if (isStreaming == true) {
    if (data.y == "synthDecay") {
      values[4] = data.x;
      if (values[4] != UI.synthDecay.value) {
        UI.synthDecay.value = values[4];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketSynthSustain', function(data) {
  if (isStreaming == true) {
    if (data.y == "synthSustain") {
      values[5] = data.x;
      if (values[5] != UI.synthSustain.value) {
        UI.synthSustain.value = values[5];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketSynthRelease', function(data) {
  if (isStreaming == true) {
    if (data.y == "synthRelease") {
      values[6] = data.x;
      if (values[6] != UI.synthRelease.value) {
        UI.synthRelease.value = values[6];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketHarmonicity', function(data) {
  if (isStreaming == true) {
    if (data.y == "harmonicity") {
      values[7] = data.x;
      if (values[7] != UI.harmonicity.value) {
        UI.harmonicity.value = values[7];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketModulationIndex', function(data) {
  if (isStreaming == true) {
    if (data.y == "modulationIndex") {
      values[8] = data.x;
      if (values[8] != UI.modulationindex.value) {
        UI.modulationindex.value = values[8];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketDetune', function(data) {
  if (isStreaming == true) {
    if (data.y == "detune") {
      values[9] = data.x;
      if (values[9] != UI.detune.value) {
        UI.detune.value = values[9];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketOscillatorModulationIndex', function(data) {
  if (isStreaming == true) {
    if (data.y == "oscillatorModulationIndex") {
      values[10] = data.x;
      if (values[10] != UI.oscillatorModulationIndex.value) {
        UI.oscillatorModulationIndex.value = values[10];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketOscillatorHarmonicity', function(data) {
  if (isStreaming == true) {
    if (data.y == "oscillatorHarmonicity") {
      values[11] = data.x;
      if (values[11] != UI.oscillatorHarmonicity.value) {
        UI.oscillatorHarmonicity.value = values[11];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketModulationEnvelopeAttack', function(data) {
  if (isStreaming == true) {
    if (data.y == "modulationEnvelopeAttack") {
      values[12] = data.x;
      if (values[12] != UI.modulationEnvelopeAttack.value) {
        UI.modulationEnvelopeAttack.value = values[12];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketModulationEnvelopeDecay', function(data) {
  if (isStreaming == true) {
    if (data.y == "modulationEnvelopeDecay") {
      values[13] = data.x;
      if (values[13] != UI.modulationEnvelopeDecay.value) {
        UI.modulationEnvelopeDecay.value = values[13];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketModulationEnvelopeSustain', function(data) {
  if (isStreaming == true) {
    if (data.y == "modulationEnvelopeSustain") {
      values[14] = data.x;
      if (values[14] != UI.modulationEnvelopeSustain.value) {
        UI.modulationEnvelopeSustain.value = values[14];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketModulationEnvelopeRelease', function(data) {
  if (isStreaming == true) {
    if (data.y == "modulationEnvelopeRelease") {
      values[15] = data.x;
      if (values[15] != UI.modulationEnvelopeRelease.value) {
        UI.modulationEnvelopeRelease.value = values[15];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketReverbRoomSize', function(data) {
  if (isStreaming == true) {
    if (data.y == "reverbRoomSize") {
      values[16] = data.x;
      if (values[16] != UI.reverbRoomSize.value) {
        UI.reverbRoomSize.value = values[16];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketReverbWetValue', function(data) {
  if (isStreaming == true) {
    if (data.y == "reverbWetValue") {
      values[17] = data.x;
      if (values[17] != UI.reverbWetValue.value) {
        UI.reverbWetValue.value = values[17];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketReverbDampValue', function(data) {
  if (isStreaming == true) {
    if (data.y == "reverbDampValue") {
      values[18] = data.x;
      if (values[18] != UI.reverbDampValue.value) {
        UI.reverbDampValue.value = values[18];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketNoiseOnePlaybackRate', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseOnePlaybackRate") {
      values[19] = data.x;
      if (values[19] != UI.noiseOnePlaybackRate.value) {
        UI.noiseOnePlaybackRate.value = values[19];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketAutoFilterFrequency', function(data) {
  if (isStreaming == true) {
    if (data.y == "autoFilterFrequency") {
      values[20] = data.x;
      if (values[20] != UI.autoFilterFrequency.value) {
        UI.autoFilterFrequency.value = values[20];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketNoiseOneMin', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseOneMin") {
      values[21] = data.x;
      if (values[21] != UI.noiseMin.value) {
        UI.noiseMin.value = values[21];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketNoiseOneMax', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseOneMax") {
      values[22] = data.x;
      if (values[22] != UI.noiseMax.value) {
        UI.noiseMax.value = values[22];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketNoiseOneWet', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseOneWet") {
      values[23] = data.x;
      if (values[23] != UI.autoFilterWet.value) {
        UI.autoFilterWet.value = values[23];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketNoiseOneDepth', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseOneDepth") {
      values[24] = data.x;
      if (values[24] != UI.autoFilterDepth.value) {
        UI.autoFilterDepth.value = values[24];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketNoiseQ', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseq") {
      values[25] = data.x;
      if (values[25] != UI.noiseq.value) {
        UI.noiseq.value = values[25];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketNoiseOctaves', function(data) {
  if (isStreaming == true) {
    if (data.y == "noiseOctaves") {
      values[26] = data.x;
      if (values[26] != UI.noiseoctaves.value) {
        UI.noiseoctaves.value = values[26];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketAfBaseFrequency', function(data) {
  if (isStreaming == true) {
    if (data.y == "afBaseFrequency") {
      values[27] = data.x;
      if (values[27] != UI.afbasefrequency.value) {
        UI.afbasefrequency.value = values[27];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketEqBass', function(data) {
  if (isStreaming == true) {
    if (data.y == "eqBass") {
      values[28] = data.x;
      if (values[28] != UI.eqbass.value) {
        UI.eqbass.value = values[28];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketEqMid', function(data) {
  if (isStreaming == true) {
    if (data.y == "eqMid") {
      values[29] = data.x;
      if (values[29] != UI.eqmid.value) {
        UI.eqmid.value = values[29];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketEqHigh', function(data) {
  if (isStreaming == true) {
    if (data.y == "eqHigh") {
      values[30] = data.x;
      if (values[30] != UI.eqhigh.value) {
        UI.eqhigh.value = values[30];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketEqLowFreq', function(data) {
  if (isStreaming == true) {
    if (data.y == "eqLowFreq") {
      values[31] = data.x;
      if (values[31] != UI.lowfreq.value) {
        UI.lowfreq.value = values[31];
      } else {
        console.log("");
      }
    }
  }
});
socket.on('uiSocketEqHighFreq', function(data) {
  if (isStreaming == true) {
    if (data.y == "eqHighFreq") {
      values[32] = data.x;
      if (values[32] != UI.highfreq.value) {
        UI.highfreq.value = values[32];
      } else {
        console.log("");
      }
    }
  }
});

function changeState(v) {
  if (v == "descenter") {
    isStreaming = false;
    document.getElementById("stateButtonOne").style.border = "2px solid rgba(150,150,150,1)";
    document.getElementById("stateButtonTwo").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonThree").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonFour").style.border = "1px solid rgba(50,50,50,1)";
  }
  if (v == "streamed") {
    isStreaming = true;
    console.log(isStreaming);
    document.getElementById("stateButtonOne").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonTwo").style.border = "2px solid rgba(150,150,150,1)";
    document.getElementById("stateButtonThree").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonFour").style.border = "1px solid rgba(50,50,50,1)";
  }
  if (v == "alocate") {
    isStreaming = false;
    document.getElementById("stateButtonOne").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonTwo").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonThree").style.border = "2px solid rgba(150,150,150,1)";
    document.getElementById("stateButtonFour").style.border = "1px solid rgba(50,50,50,1)";
  }
  if (v == "monitor") {
    isStreaming = false;
    openGui();
    WUI_Dialog.open("monitor_dialog");
    document.getElementById("stateButtonOne").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonTwo").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonThree").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonFour").style.border = "2px solid rgba(150,150,150,1)";
  }
  if (v) {
    modalAbout.style.display = "none";
    modalMode.style.display = "none";
    modalScale.style.display = "none";
  }
}

function streamCortex() {
  console.log("okok_Cortex");
}