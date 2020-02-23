Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

console.log("tirar rato");

var timer = new easytimer.Timer();
var firstMv = null;
var secondMv = null;
var thirdMv = null;
var fourthMv = null;
var sixMv = null;
var square = null;
var foure = 0;

var ctxDown = false;
var whiteUp = false;
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        timer.start({precision: 'seconds', target: {seconds: 600}});
        autoFilterOne.start();
        noiseOne.start();

    }
    if (e.keyCode == 81) {
      kick1.triggerAttackRelease('C2', '8n');
    }
}


var synth = new Tone.MembraneSynth({
  pitchDecay: 0.05,
  octaves: 3,
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: 0.001,
    decay: 0.4,
    sustain: 0.01,
    release: 1.4,
    attackCurve: 'exponential'
  }
}).toMaster();

var _synth = new Tone.NoiseSynth({
  noise: {
    type: 'pink'
  },
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0
  }
}).toMaster();
_synth.volume.value = -10;

var __synth = new Tone.MembraneSynth().toMaster();

var kick1 = new Tone.MembraneSynth({
    pitchDecay : 0.01 ,
    octaves : 5 ,
    oscillator : {
      type : 'sine'
    },
    envelope : {
      attack : 0.001 ,
      decay : 0.4 ,
      sustain : 0.01 ,
      release : 1.4 ,
      attackCurve : 'exponential'
    }
}).toMaster();

var _synth2 = new Tone.NoiseSynth({
  noise: {
    type: 'pink'
  },
  envelope: {
    attack: 0.001,
    decay: 0.01,
    sustain: 0.01
  }
}).toMaster();
_synth2.volume.value = -10;




function updateTime() {
  requestAnimationFrame(updateTime)
}
updateTime()


function triggerSynth(time){
  synth.triggerAttackRelease('C2', '8n', time);

}
function triggerSynth2(time){
	_synth2.triggerAttackRelease('16n', time);
}
function triggerSynth3(time){
  __synth.triggerAttackRelease('C1', '8n', time);
}
function triggerSynth4(time){
  kick1.triggerAttackRelease('C2', '8n', time);
}
function triggerSynth5(time){
  _synth2.triggerAttackRelease('8n', time);
}

Tone.Transport.schedule(triggerSynth5, 0)
Tone.Transport.schedule(triggerSynth2, '0:0.2')
Tone.Transport.schedule(triggerSynth5, '0:0.5')
Tone.Transport.schedule(triggerSynth2, '0:1')
Tone.Transport.schedule(triggerSynth5, '0:1.5')
Tone.Transport.schedule(triggerSynth2, '0:2')
Tone.Transport.schedule(triggerSynth5, '0:2.2')
//Tone.Transport.schedule(triggerSynth5, '0:2.5')


//Tone.Transport.schedule(triggerSynth2, '0:1.5')
//Tone.Transport.schedule(triggerSynth, '0:1.8')
//Tone.Transport.schedule(triggerSynth, '0:2.5')
//Tone.Transport.schedule(triggerSynth, '0:1:3')

Tone.Transport.bpm.value = 450;
Tone.Transport.swing = 2;
Tone.Transport.swingSubdividion = '16n';
Tone.Transport.timeSignature = 1;

Tone.Transport.loopEnd = '1n';
Tone.Transport.loop = true;


var player;
var player2;
var player3;
var player4;

timer.addEventListener('secondsUpdated', function (e) {
    var _e = timer.getTimeValues().seconds;
    var __e = timer.getTimeValues().toString();
    console.log(_e);
    console.log(__e);

    if (__e == '00:00:14') {
      firstMov();
    }
    if (__e == '00:00:16') {
      clearInterval(firstMv);
      secondMov();
    }
    if (__e == '00:00:18') {
      clearInterval(secondMv);

    }
    if (__e == '00:00:19') {
      clearInterval(thirdMv);
      document.getElementById("parte1_1").style.display = "none";
      fourthMov();
    }
    if (__e == '00:00:25') {
      clearInterval(fourthMv);
      clearInterval(sixMv);
      fourthMv = null;
      sixMv = null;
      document.getElementById("parte1_1").remove();
      document.getElementById("parte1_2").remove();
      document.getElementById("parte1_3").remove();
      document.getElementById("parte1_4").remove();
      document.getElementById("parte1_5").remove();

      document.getElementById("ikeda").style.display = "block";
      ikedasquare();

      player = new Tone.Player("seq.wav").toMaster();
      player.autostart = true;
      player.loop = true;

    }
    if (__e == '00:00:59') {
      player2 = new Tone.Player("beep.wav").toMaster();
      player2.autostart = true;
      player2.loop = false;
    }
    if (__e == '00:01:01') {

      player.mute = true;
      player2.mute = true;
      player = null;
      player2 = null;
      player3 = new Tone.Player("kick2.wav").toMaster();
      player3.autostart = true;
    }
    if (__e == '00:01:03') {
      player3.mute = true;
      player3 = null;
      player4 = new Tone.Player("seq2.wav").toMaster();
      player4.autostart = true;
      console.log("dois minutos e tal meter o akson");
    }
    if (__e == '00:01:30') {
      //Tone.Transport.stop();
      //Tone.Transport.start();

      //polySynth.triggerAttackRelease('C2', '8n');

    }
});

function firstMov() {
    firstMv = setInterval(function() {
      contextStop();
      whiteBack();
    }, 140);
}
function secondMov() {
    secondMv = setInterval(function() {
      contextStop();
      whiteBack();
    }, 30);
}

function ikedasquare() {
  square = setInterval(function() {
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + z + "," + z + "," + z + ")";

    document.getElementById("ikeda").style.backgroundColor = bgColor;
    //document.getElementById("ikeda").style.opacity = _z;
  }, 100);
}

function contextStop() {
  if (ctxDown == false) {
    noiseOne.stop();
    ctxDown = true;
  } else if (ctxDown == true) {
    noiseOne.start();
    ctxDown = false;
  }
}

function whiteBack() {
  if (whiteUp == false) {
    document.getElementById("parte1_1").style.display = "block";
    whiteUp = true;
  } else if (whiteUp == true) {
    document.getElementById("parte1_1").style.display = "none";
    whiteUp = false;
  }
}


function fourthMov() {

        sixMv = setInterval(function() {

          document.getElementById('parte1_2').innerHTML += '<br>akson_running';
          if (foure > 30) {
            document.getElementById('parte1_3').innerHTML += '<br>akson_running';
          }
          if (foure > 60) {
            document.getElementById('parte1_4').innerHTML += '<br>akson_running';
          }
          if (foure > 75) {
            document.getElementById('parte1_2').style.display = "none";
            document.getElementById('parte1_3').style.display = "none";
            document.getElementById('parte1_4').style.display = "none";
            var e = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            document.getElementById('parte1_5').style.display = "block";
            document.getElementById('parte1_5').innerHTML += "<br>" + e;
          }
          if (foure > 90) {
            document.getElementById('parte1_1').style.display = "none";
            document.getElementById('parte1_2').style.display = "none";
            document.getElementById('parte1_3').style.display = "none";
            document.getElementById('parte1_4').style.display = "none";
            document.getElementById('parte1_5').style.display = "none";
          }
          foure++;

        }, 50);

  }
/*var time = 0;
var ctxDown = false;
var whiteUp = false;
var blackUp = false;
var firstMv;
var secondMv;
var thirdMv;
var fourthMv;
var fifthMv;
var sixMv;
var flickrBlack = false;

var startPiece = false;

// https://leclub.github.io/2016/06/ThreeJS-Glitch-Shader/
//polySynth.triggerAttackRelease('C3', '100')

const context = new AudioContext();
let newaudio;

window.fetch("beep.wav")
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      newaudio = audioBuffer;
});


document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        directing();
        autoFilterOne.start();
        noiseOne.start();
    }
    if(e.keyCode == 81){
        time = 28;
    }
    if(e.keyCode == 87){
      // W and play
        //play(newaudio);

    }
    if(e.keyCode == 69){}
    if(e.keyCode == 80){
      if (!glitchPass.renderToScreen == true) {
        glitchPass.renderToScreen = true;
      }
      glitchPass.goWild = true;
    }
    if(e.keyCode == 79){
      if (!glitchPass.renderToScreen == true) {
        glitchPass.renderToScreen = true;
      }
      glitchPass.goWild = false;
    }
    if(e.keyCode == 73){
      glitchPass.renderToScreen = false;
    }

}

//if (startPiece == true) {

  function play(audioBuffer) {
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start();
  }


  function firstMov() {
      firstMv = setTimeout(function() {
        contextStop();
        whiteBack();
      }, 140);
  }

  function secondMov() {
      secondMv = setTimeout(function() {
        contextStop();
        whiteBack();
      }, 30);
  }

  function thirdMov() {
      thirdMov = setTimeout(function() {
        fourthCustom();
      }, 1000);
  }
  var foure = 0;
  console.log("sequencing");

  function fourthMov() {

    function fifthMov() {
      fifthMv = setTimeout(function() {
        blackBack();
      }, 30);
    }


      fourthMv = setTimeout(function() {
        sixMv = setTimeout(function() {

          document.getElementById('parte1_2').innerHTML += '<br>akson_running';
          if (foure == 3) {
            document.getElementById('parte1_3').innerHTML += '<br>akson_running';
          }
          if (foure == 5) {
            document.getElementById('parte1_4').innerHTML += '<br>akson_running';
          }
          if (foure == 6) {
            document.getElementById('parte1_2').style.display = "none";
            document.getElementById('parte1_3').style.display = "none";
            document.getElementById('parte1_4').style.display = "none";
            var e = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            document.getElementById('parte1_5').style.display = "block";
            document.getElementById('parte1_5').innerHTML += "<br>" + e;
          }
          if (foure == 7) {
            document.getElementById('parte1_1').style.display = "none";
            document.getElementById('parte1_2').style.display = "none";
            document.getElementById('parte1_3').style.display = "none";
            document.getElementById('parte1_4').style.display = "none";
            document.getElementById('parte1_5').style.display = "none";
          }
        }, 50);
        foure++;
      }, 1000);
  }

function directing() {
  setTimeout(function() {
      time++;
      console.log(time);
      if (time == 14 && time < 15) {
        firstMov();
      }
      if (time == 16 && time < 17) {
        clearTimeout(firstMv);
        secondMov();
      }
      if (time == 17 && time < 18) {
        clearTimeout(secondMv);
        thirdMov();
      }
      if (time == 19 && time < 20) {
        clearTimeout(thirdMv);
        fourthCustom();
        fourthMov();
      }
      if (time == 28 && time < 29) {
        clearTimeout(fourthMv);
        clearTimeout(fifthMv);
        clearTimeout(sixMv);
        shading = true;
        contextStop();
        autoFilterOne.set({
          "frequency": 50,
          "baseFrequency": 50
        });
        glitchPass.goWild = true;
        glitchPass.renderToScreen = true;
      }
      if (time == 43 && time < 44) {
        renderer = null;
        console.log("make sequencing")
        //scene.add(cube);
        //contextStop();
        //glitchPass.goWild = false;
      }
      if (time == 50) {
        //blackBack();
        console.log("put black flicker");
      }
      if (time == 53) {
        //shading = false;
        flickrBlack = true;
        fifthMov();
        document.getElementById("parte1_2").style.width = "100%";
        document.getElementById("parte1_2").style.height = "100%";
        document.getElementById("parte1_2").style.display = "block";

      }

    }, 1000);
}


  function contextStop() {
    if (ctxDown == false) {
      noiseOne.stop();
      ctxDown = true;
    } else if (ctxDown == true) {
      noiseOne.start();
      ctxDown = false;
    }
  }



  function whiteBack() {
    if (whiteUp == false) {
      document.getElementById("parte1_1").style.display = "block";
      whiteUp = true;
    } else if (whiteUp == true) {
      document.getElementById("parte1_1").style.display = "none";
      whiteUp = false;
    }
  }

  console.log("3d files load mb");

function blackBack() {
  if (blackUp == false) {
    document.getElementById("parte1_2").style.display = "block";
    blackUp = true;
  } else if (blackUp == true) {
    document.getElementById("parte1_2").style.display = "none";
    blackUp = false;
  }
}

  function fourthCustom() {
    document.getElementById("parte1_1").style.display = "none";
  }
*/
