/**
 * @author Luis Arandas  http://luisarandas.org
 * @author José Alberto Gomes  http://jasg.net/Home.html
 * @author Rui Penha  http://ruipenha.pt/
 *
 *  All this code was done under the context of a research
 *  between Braga Media Arts and the University of Porto © 2019
 */

Tone.context.resume();
Tone.Transport.bpm.value = 20;
Tone.Transport.start();

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var autoFilterOne = new Tone.AutoFilter({
  "frequency": "8m",
  "min": 800,
  "max": 15000
}).toMaster();

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
    phase: 0 ,
    osc.phase: 180; //flips the phase of the oscillator
    */
  },
  envelope: {
    attack: 0.4,
    decay: 0.4,
    sustain: 0.4,
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
