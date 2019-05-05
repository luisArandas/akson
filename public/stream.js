/* Change the Network State */

socket = io.connect(window.location.origin);

socket.on("*", function(data) {
  console.log("* " + data);
});

var isStreaming = false;
var isAlone = false;
var isAlocating = false;

var w = window.innerWidth;
var h = window.innerHeight;
var fullWidth = w * 3;
var fullHeight = h * 2;


/* Make this */

var isAlocatingSynth = false;
var isAlocatingBack = false;
var isAlocatingGraphs = false;
var isAlocatingPost = false;

var values = new Array(80);
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
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
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
});
socket.on('uiSocketSynthDecay', function(data) {
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
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
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
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
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
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
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
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
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
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
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
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
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
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
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
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
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
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
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
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
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
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
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
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
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
    if (data.y == "reverbRoomSize") {
      values[16] = data.x;
      UI.reverbRoomSize._value.update(values[16]);
      UI.reverbRoomSize.render();
      reverb.roomSize.value = values[16];
    }
  }
});
socket.on('uiSocketReverbWetValue', function(data) {
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
    if (data.y == "reverbWetValue") {
      values[17] = data.x;
      UI.reverbWetValue._value.update(values[17]);
      UI.reverbWetValue.render();
      reverb.wet.value = values[17];
    }
  }
});
socket.on('uiSocketReverbDampValue', function(data) {
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
    if (data.y == "reverbDampValue") {
      values[18] = data.x;
      UI.reverbDampValue._value.update(values[18]);
      UI.reverbDampValue.render();
      reverb.dampening.value = values[18];
    }
  }
});
socket.on('uiSocketNoiseOnePlaybackRate', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    if (data.y == "noiseOnePlaybackRate") {
      values[19] = data.x;
      UI.noiseOnePlaybackRate._value.update(values[19]);
      UI.noiseOnePlaybackRate.render();
      noiseOne.playbackRate = values[19];
    }
  }
});
socket.on('uiSocketAutoFilterFrequency', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
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
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    if (data.y == "noiseOneMin") {
      values[21] = data.x;
      UI.noiseMin._value.update(values[21]);
      UI.noiseMin.render();
      noiseOne.min = values[21];
    }
  }
});
socket.on('uiSocketNoiseOneMax', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    if (data.y == "noiseOneMax") {
      values[22] = data.x;
      UI.noiseMax._value.update(values[22]);
      UI.noiseMax.render();
      noiseOne.max = values[22];
    }
  }
});
socket.on('uiSocketNoiseOneWet', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    if (data.y == "noiseOneWet") {
      values[23] = data.x;
      UI.autoFilterWet._value.update(values[23]);
      UI.autoFilterWet.render();
      noiseOne.wet = values[23];
    }
  }
});
socket.on('uiSocketNoiseOneDepth', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    if (data.y == "noiseOneDepth") {
      values[24] = data.x;
      UI.autoFilterDepth._value.update(values[24]);
      UI.autoFilterDepth.render();
      noiseOne.depth = values[24];
    }
  }
});
socket.on('uiSocketNoiseQ', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
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
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
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
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
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

socket.on('noiseWaveType', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    noiseOne.type = data;
    if (data == 'white') {
      noiseOne.volume.value = -10;
    }
    console.log(data);
  }
});
socket.on('noiseRoloffType', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    autoFilterOne.set({
      "filter": {
        "rolloff": data
      }
    });
  }
});
socket.on('autoFilterWaveType', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    autoFilterOne.set({
      "type": data
    });
  }
});
socket.on('noiseOneFrequencyTimeNumber', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    autoFilterOne.set({
      "frequency": data
    });
  }
});
socket.on('synthWaveType', function(data) {
  if (isStreaming == true || isAlocatingBack == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    polySynth.set({
      "oscillator": {
        "type": data
      }
    });
    typeofOsc = data;
  }
});
socket.on('noisePartialCount', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    polySynth.set({
      "oscillator": {
        "type": typeofOsc + data
      }
    });
  }
});

socket.on('uiSocketSynthPhase', function(data) {
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
    if (data.y == "synthPhase") {
      values[33] = data.x;
      UI.synthPhase._value.update(values[33]);
      UI.synthPhase.render();
      polySynth.phase = values[33];
    }
  }
});
socket.on('uiSocketSynthPartials', function(data) {
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
    if (data.y == "synthPartials") {
      values[34] = data.x;
      UI.synthPartials._value.update(values[34]);
      UI.synthPartials.render();
      polySynth.set({
        "oscillator": {
          "type": typeofOsc + values[34]
        }
      });
    }
  }
});
socket.on('uiSocketNoiseFilterGain', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    if (data.y == "noiseFilterGain") {
      values[35] = data.x;
      UI.noisefiltergain._value.update(values[35]);
      UI.noisefiltergain.render();
      autoFilterOne.set({
        "filter": {
          "gain": values[35]
        }
      });
    }
  }
});
socket.on('uiSocketSynthVibratoFreq', function(data) {
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
    if (data.y == "vibratoFreq") {
      values[36] = data.x;
      UI.vibratoFrequency._value.update(values[36]);
      UI.vibratoFrequency.render();
      vibrato.frequency.value = values[36];
    }
  }
});
socket.on('uiSocketSynthVibratoDep', function(data) {
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
    if (data.y == "vibratoDepth") {
      values[37] = data.x;
      UI.vibratoDepth._value.update(values[37]);
      UI.vibratoDepth.render();
      vibrato.depth.value = values[37];
    }
  }
});
socket.on('uiSocketSynthVibratoWet', function(data) {
  if (isStreaming == true || isAlocatingBack == true || isAlocatingGraphs == true || isAlocatingPost == true) {
    if (data.y == "vibratoWet") {
      values[38] = data.x;
      UI.vibratoWet._value.update(values[38]);
      UI.vibratoWet.render();
      vibrato.wet.value = values[38];
    }
  }
});
socket.on('uiSocketNoisePhaserFreq', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    if (data.y == "phaserFreq") {
      values[39] = data.x;
      UI.phaserFreq._value.update(values[39]);
      UI.phaserFreq.render();
      phaser.frequency.value = values[39];
    }
  }
});
socket.on('uiSocketNoisePhaserOct', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    if (data.y == "phaserOct") {
      values[40] = data.x;
      UI.phaserOct._value.update(values[40]);
      UI.phaserOct.render();
      phaser.octaves.value = values[40];
    }
  }
});
socket.on('uiSocketNoisePhaserWet', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    if (data.y == "phaserWet") {
      values[41] = data.x;
      UI.phaserWet._value.update(values[41]);
      UI.phaserWet.render();
      phaser.wet.value = values[41];
    }
  }
});
socket.on('uiSocketNoisePhaserQ', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    if (data.y == "phaserQ") {
      values[42] = data.x;
      UI.phaserQ._value.update(values[42]);
      UI.phaserQ.render();
      phaser.Q.value = values[42];
    }
  }
});
socket.on('uiSocketNoisePhaserBaseFreq', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    if (data.y == "phaserBaseFreq") {
      values[43] = data.x;
      UI.phaserBaseFreq._value.update(values[43]);
      UI.phaserBaseFreq.render();
      phaser.baseFrequency.value = values[43];
    }
  }
});
socket.on('uiSocketNoiseJcverbRoom', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    if (data.y == "jcverbRoomSiz") {
      values[44] = data.x;
      UI.jcreverbRoomsize._value.update(values[44]);
      UI.jcreverbRoomsize.render();
      jcreverb.roomSize.value = values[44];
    }
  }
});
socket.on('uiSocketNoiseJcverbWet', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    if (data.y == "jcverbWet") {
      values[45] = data.x;
      UI.jcreverbWet._value.update(values[45]);
      UI.jcreverbWet.render();
      jcreverb.wet.value = values[45];
    }
  }
});
socket.on('uiSocketFlipPhaseButton', function(data) {
  if (isStreaming == true || isAlocatingBack == true || isAlocatingPost == true || isAlocatingGraphs == true) {
    values[46] = data;
    polySynth.set({
      "oscillator": {
        "phase": values[46]
      }
    });
  }
});

//Graphs Sokets

socket.on('uiSocketLightOne', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "lightOne") {
      values[47] = data.x;
      light1._value.update(values[47]);
      light1.render();
      lightOne.intensity = values[47];
    }
  }
});
socket.on('uiSocketLightTwo', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "lightTwo") {
      values[48] = data.x;
      light2._value.update(values[48]);
      light2.render();
      lightTwo.intensity = values[48];
    }
  }
});
socket.on('uiSocketLightThree', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "lightThree") {
      values[49] = data.x;
      light3._value.update(values[49]);
      light3.render();
      lightThree.intensity = values[49];
    }
  }
});
socket.on('uiSocketLightFour', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "lightFour") {
      values[50] = data.x;
      light4._value.update(values[50]);
      light4.render();
      lightFour.intensity = values[50];
    }
  }
});
socket.on('uiSocketCameraM1', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraM1") {
      values[51] = data.x;
      cameraM1._value.update(values[51]);
      cameraM1.render();
      camera.fov = values[51];
      camera.updateProjectionMatrix();
    }
  }
});
socket.on('uiSocketCameraM2', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraM2") {
      values[52] = data.x;
      cameraM2._value.update(values[52]);
      cameraM2.render();
      camera.zoom = values[52];
      camera.updateProjectionMatrix();
    }
  }
});
socket.on('uiSocketCameraM3', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraM3") {
      values[53] = data.x;
      cameraM3._value.update(values[53]);
      cameraM3.render();
      camera.aspect = values[53];
      camera.updateProjectionMatrix();
    }
  }
});
socket.on('uiSocketCameraM4', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraM4") {
      values[54] = data.x;
      cameraM4._value.update(values[54]);
      cameraM4.render();
      camera.near = values[54];
      camera.updateProjectionMatrix();
    }
  }
});
socket.on('uiSocketCameraM5', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingGraphs == true) {
    if (data.y == "cameraM5") {
      values[55] = data.x;
      cameraM5._value.update(values[55]);
      cameraM5.render();
      camera.setViewOffset(values[55], fullHeight, w * 1, h * 0, w, h);
      camera.updateProjectionMatrix();
    }
  }
});
socket.on('uiSocketCameraM6', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingGraphs == true) {
    if (data.y == "cameraM6") {
      values[56] = data.x;
      cameraM6._value.update(values[56]);
      cameraM6.render();
      camera.setViewOffset(fullWidth, values[56], w * 1, h * 0, w, h);
      camera.updateProjectionMatrix();
    }
  }
});
socket.on('uiSocketCameraM7', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingGraphs == true) {
    if (data.y == "cameraM7") {
      values[57] = data.x;
      cameraM7._value.update(values[57]);
      cameraM7.render();
      camera.setViewOffset(fullWidth, fullHeight, w * values[57], h * 0, w, h);
      camera.updateProjectionMatrix();
    }
  }
});
socket.on('uiSocketCameraM8', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingGraphs == true) {
    if (data.y == "cameraM8") {
      values[58] = data.x;
      cameraM8._value.update(values[58]);
      cameraM8.render();
      camera.setViewOffset(fullWidth, fullHeight, w * 1, h * values[58], w, h);
      camera.updateProjectionMatrix();
    }
  }
});
socket.on('uiSocketCameraM9', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingGraphs == true) {
    if (data.y == "cameraM9") {
      values[59] = data.x;
      cameraM9._value.update(values[59]);
      cameraM9.render();
      camera.setViewOffset(fullWidth, fullHeight, w * values[59], h * 0, fullWidth, fullHeight);
      camera.updateProjectionMatrix();
    }
  }
});
socket.on('uiSocketCameraM10', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingGraphs == true) {
    if (data.y == "cameraM10") {
      values[60] = data.x;
      cameraM10._value.update(values[60]);
      cameraM10.render();
      camera.setViewOffset(fullWidth, fullHeight, w * 0, h * values[60], fullWidth, fullHeight);
      camera.updateProjectionMatrix();
    }
  }
});
socket.on('uiSocketCameraM11', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingGraphs == true) {
    if (data.y == "cameraM11") {
      values[61] = data.x;
      if (values[61] === 'set1') {
        camera.setViewOffset(fullWidth, fullHeight, w * 1, h * 0, w, h);
        camera.updateProjectionMatrix();
      }
      if (values[61] === 'set2') {
        camera.setViewOffset(fullWidth, fullHeight, w * 0, h * 0, w, h);
        camera.updateProjectionMatrix();
      }
      if (values[61] === 'set3') {
        camera.setViewOffset(fullWidth, fullHeight, w * 2, h * 0, w, h);
        camera.updateProjectionMatrix();
      }
      if (values[61] === 'set4') {
        camera.setViewOffset(fullWidth, fullHeight, w * 0, h * 1, w, h);
        camera.updateProjectionMatrix();
      }
      if (values[61] === 'set5') {
        camera.setViewOffset(fullWidth, fullHeight, w * 1, h * 1, w, h);
        camera.updateProjectionMatrix();
      }
      if (values[61] === 'set6') {
        camera.setViewOffset(fullWidth, fullHeight, w * 2, h * 1, w, h);
        camera.updateProjectionMatrix();
      }
      if (values[61] === 'clear') {
        camera.clearViewOffset();
      }
    }
  }
});
socket.on('uiSocketKillScene', function(data) {
  if (isStreaming == true) {
    camera.near = 0;
    camera.updateProjectionMatrix();
    Tone.Master.mute = true;
  }
});
socket.on('uiSocketBornScene', function(data) {
  if (isStreaming == true) {
    camera.near = 1;
    camera.updateProjectionMatrix();
    Tone.Master.mute = false;
  }
});

socket.on('uiSocketScene1', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraScene1") {
      values[62] = data.x;
      camera1_1._value.update(values[62]);
      camera1_1.render();
      parentTransform.scale.x = values[62];
    }
  }
});
socket.on('uiSocketScene2', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraScene2") {
      values[63] = data.x;
      camera1_2._value.update(values[63]);
      camera1_2.render();
      parentTransform.scale.y = values[63];
    }
  }
});
socket.on('uiSocketScene3', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraScene3") {
      values[64] = data.x;
      camera1_3._value.update(values[64]);
      camera1_3.render();
      parentTransform.scale.z = values[64];
    }
  }
});
socket.on('uiSocketScene4', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraScene4") {
      values[65] = data.x;
      camera2_1._value.update(values[65]);
      camera2_1.render();
      parentTransformDois.scale.x = values[65];
    }
  }
});
socket.on('uiSocketScene5', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraScene5") {
      values[66] = data.x;
      camera2_2._value.update(values[66]);
      camera2_2.render();
      parentTransformDois.scale.y = values[66];
    }
  }
});
socket.on('uiSocketScene6', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraScene6") {
      values[67] = data.x;
      camera2_3._value.update(values[67]);
      camera2_3.render();
      parentTransformDois.scale.z = values[67];
    }
  }
});
socket.on('uiSocketScene7', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraScene7") {
      values[68] = data.x;
      camera3_1._value.update(values[68]);
      camera3_1.render();
      parentTransformTres.scale.x = values[68];
    }
  }
});
socket.on('uiSocketScene8', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraScene8") {
      values[69] = data.x;
      camera3_2._value.update(values[69]);
      camera3_2.render();
      parentTransformTres.scale.y = values[69];
    }
  }
});
socket.on('uiSocketScene9', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraScene9") {
      values[70] = data.x;
      camera3_3._value.update(values[70]);
      camera3_3.render();
      parentTransformTres.scale.z = values[70];
    }
  }
});
socket.on('uiSocketScene10', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraScene10") {
      values[71] = data.x;
      camera4_1._value.update(values[71]);
      camera4_1.render();
      parentTransformQuatro.scale.x = values[71];
    }
  }
});
socket.on('uiSocketScene11', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraScene11") {
      values[72] = data.x;
      camera4_2._value.update(values[72]);
      camera4_2.render();
      parentTransformQuatro.scale.y = values[72];
    }
  }
});
socket.on('uiSocketScene12', function(data) {
  if (isStreaming == true || isAlocatingSynth == true || isAlocatingBack == true || isAlocatingPost == true) {
    if (data.y == "cameraScene12") {
      values[73] = data.x;
      camera4_3._value.update(values[73]);
      camera4_3.render();
      parentTransformQuatro.scale.z = values[73];
    }
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
    document.getElementById("stateButtonFive").style.border = "1px solid rgba(50,50,50,1)";

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
    document.getElementById("stateButtonFive").style.border = "1px solid rgba(50,50,50,1)";
  }
  if (v == "alocate") {
    socket.connected = true;
    isStreaming = false;
    isAlone = false;
    isAlocating = true;
    openGui();
    $('#alocateOne').trigger('click');
    WUI_Dialog.open("alocate_dialog");
    document.getElementById("stateButtonOne").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonTwo").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonThree").style.border = "2px solid rgba(150,150,150,1)";
    document.getElementById("stateButtonFour").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonFive").style.border = "1px solid rgba(50,50,50,1)";
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
    document.getElementById("stateButtonFour").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonFive").style.border = "2px solid rgba(150,150,150,1)";
  }
  if (v == "alone") {
    socket.connected = false;
    isStreaming = false;
    isAlone = true;
    isAlocating = false;
    openGui();
    document.getElementById("stateButtonOne").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonTwo").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonThree").style.border = "1px solid rgba(50,50,50,1)";
    document.getElementById("stateButtonFour").style.border = "2px solid rgba(150,150,150,1)";
    document.getElementById("stateButtonFive").style.border = "1px solid rgba(50,50,50,1)";
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
      isAlocatingSynth = true;
      isAlocatingBack = false;
      isAlocatingGraphs = false;
      isAlocatingPost = false;

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
      isAlocatingSynth = false;
      isAlocatingBack = true;
      isAlocatingGraphs = false;
      isAlocatingPost = false;
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
      isAlocatingSynth = false;
      isAlocatingBack = false;
      isAlocatingGraphs = true;
      isAlocatingPost = false;
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
      isAlocatingSynth = false;
      isAlocatingBack = false;
      isAlocatingGraphs = false;
      isAlocatingPost = true;
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

function printMonitorDialog(a, v) {
  var logs = document.getElementById('monitordiv'),
    output_node = document.createElement("div");
  output_node.innerHTML = a + v;
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
}
