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
var a = window.performance;
var timer = new easytimer.Timer();
var firstMv = null;
var secondMv = null;
var _secondMv = null;
var thirdMv = null;
var fourthMv = null;
var sixMv = null;
var square = null;
var foure = 0;

var seqdiv = null;
var timelinetxt = null;
var _timelinetxt = null;

var ctxDown = false;
var whiteUp = false;

var startnoise = null;
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        timer.start({precision: 'secondTenths', target: {seconds: 600}});
        autoFilterOne.start();
        noiseOne.start();

    }
    if (e.keyCode == 81) { // Q
      secondMov();
    }
    if (e.keyCode == 87) { // W
      clearInterval(secondMv);
    }
    if (e.keyCode == 69) { // E
      Tone.Master.mute = true;
    }
    if (e.keyCode == 65) { // A
      _secondMov();
    }
    if (e.keyCode == 83) { // A
      clearInterval(_secondMv);
    }
    if (e.keyCode == 80) { // p
      document.getElementById("noise").style.display = "block";
      perlinoise();
    }
}

function perlinoise() {
    startnoise = setInterval(function() {
      var e = getRandomInt(0, 256);
      var e_ =  "rgba(" + e + "," + e + "," + e + ",);"
      console.log(e_);
      document.getElementById("noise").style.backgroundColor = e_;
    }, 30);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function myFunction() {
  document.getElementById("vid").src = "icl.mov";
  document.getElementById("myVideo").load();
  document.getElementById("myVideo").playbackRate = 5;
  document.getElementById("myVideo").loop = true;

  document.getElementById("myVideo").play();
}

console.log(timer);

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

console.log("two timelines?");
var player;
var player2;
var player3;
var player4;
var player5;
var stringtext;
console.log("start with flickr maxstyle write in a div from bottom to up");

timer.addEventListener('secondTenthsUpdated', function (e) {
    var _e = timer.getTimeValues().seconds;
    var __e = timer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']);
    stringtext = _e + '<br>' + __e;

    console.log(_e);
    console.log(__e);

    if (__e == '00:00:14:0') {
      firstMov();
      console.log("ola");
    }

    if (__e == '00:00:16:0') {
      clearInterval(firstMv);
      secondMov();
    }
    if (__e == '00:00:18:0') {
      clearInterval(secondMv);

    }
    if (__e == '00:00:19:0') {
      clearInterval(thirdMv);
      document.getElementById("parte1_1").style.display = "none";
      fourthMov();
    }
    if (__e == '00:00:25:0') {
      clearInterval(fourthMv);
      clearInterval(sixMv);
      fourthMv = null;
      sixMv = null;
      document.getElementById("parte1_1").remove();
      document.getElementById("parte1_2").remove();
      document.getElementById("parte1_3").remove();
      document.getElementById("parte1_4").remove();
      document.getElementById("parte1_5").remove();
      sequencingDiv();

      document.getElementById("ikeda").style.display = "block";
      document.getElementById("ikeda2").style.display = "block";
      document.getElementById("ikeda3").style.display = "block";
      document.getElementById("ikeda4").style.display = "block";
      document.getElementById("ikeda5").style.display = "block";
      document.getElementById("ikeda6").style.display = "block";

      document.getElementById("maintext").style.display = "block";
      writeMemory();

      addTimeLineToDiv();

      noiseOne.mute = true;

      player = new Tone.Player("_seq.wav").toMaster();
      player.autostart = true;
      player.loop = true;
    }

    if (__e == '00:00:25:5') {
      sequencingDiv();
    }

    if (__e == '00:00:29:0') {
      sequencingDiv();
    }
    if (__e == '00:00:29:5') {
      sequencingDiv();
    }

    if (__e == '00:00:33:0') {
      sequencingDiv();
      document.getElementById("ikeda3").style.backgroundColor = "rgba(0,0,0,1)";
    }
    if (__e == '00:00:33:1') {
      document.getElementById("ikeda3").style.backgroundColor = "white";
    }


    if (__e == '00:00:33:5') {
      sequencingDiv();
    }

    if (__e == '00:00:37:0') {
      sequencingDiv();
    }
    if (__e == '00:00:37:5') {
      sequencingDiv();

    }

    if (__e == '00:00:41:0') {
      sequencingDiv();
      document.getElementById("ikeda2").style.backgroundColor = "rgba(5,5,5,1)";
    }
    if (__e == '00:00:41:1') {
      document.getElementById("ikeda2").style.backgroundColor = "white";
    }
    if (__e == '00:00:41:5') {
      sequencingDiv();
    }

    if (__e == '00:00:45:0') {
      sequencingDiv();

    }
    if (__e == '00:00:45:5') {
      sequencingDiv();
    }

    if (__e == '00:00:49:0') {
      sequencingDiv();
    }
    if (__e == '00:00:49:5') {
      sequencingDiv();
    }

    if (__e == '00:00:53:0') {
      sequencingDiv();
      player2 = new Tone.Player("beep.wav").toMaster();
      player2.autostart = true;
      player2.loop = false;
    }
    if (__e == '00:00:53:5') {
      sequencingDiv();
    }
    if (__e == '00:00:54:0') {
      player2 = new Tone.Player("beep3.wav").toMaster();
      player2.autostart = true;
      player2.loop = false;
    }

    if (__e == '00:00:57:0') {
      sequencingDiv();
    }
    if (__e == '00:00:57:5') {
      sequencingDiv();
      console.log("now!")
    }

    if (__e == '00:01:01:0') {

      player.mute = true;
      player2.mute = true;
      player = null;
      player2 = null;
      player3 = new Tone.Player("kick2.wav").toMaster();
      player3.autostart = true;
      sequencingDiv();

    }
    if (__e == '00:01:03:0') {
      player3.mute = true;
      player3 = null;
      player4 = new Tone.Player("seq2.wav").toMaster();
      player4.autostart = true;

      a = window.performance.timing;
    }
    if (__e == '00:01:03:1') {
      sequencingDiv();
    }

    if (__e == '00:01:05:1') {
      sequencingDiv();
    }
    if (__e == '00:01:07:1') {
      sequencingDiv();
    }
    if (__e == '00:01:09:1') {
      sequencingDiv();
    }
    if (__e == '00:01:11:1') {
      sequencingDiv();
    }
    if (__e == '00:01:13:1') {
      sequencingDiv();
    }
    if (__e == '00:01:15:1') {
      sequencingDiv();
    }
    if (__e == '00:01:17:1') {
      sequencingDiv();
    }
    if (__e == '00:01:19:1') {
      sequencingDiv();
    }
    if (__e == '00:01:21:1') {
      sequencingDiv();
    }
    if (__e == '00:01:23:1') {
      sequencingDiv();
    }
    if (__e == '00:01:25:1') {
      sequencingDiv();
    }
    if (__e == '00:01:27:1') {
      sequencingDiv();
      addTimeLineToDiv(stringtext);
    }

    if (__e == '00:01:27:2') {
      sequencingDiv();
    }
    if (__e == '00:01:27:3') {
      sequencingDiv();
    }

    if (__e == '00:01:27:9') {
      sequencingDiv();
    }
    if (__e == '00:01:28:3') {
      sequencingDiv();
    }
    if (__e == '00:01:28:7') {
      sequencingDiv();
    }
    //segunda bar x+1/x+6/x+4/x+4/x+5
    if (__e == '00:01:29:2') {
      sequencingDiv();
    }
    if (__e == '00:01:29:3') {
      sequencingDiv();
    }
    if (__e == '00:01:29:9') {
      sequencingDiv();
    }
    if (__e == '00:01:30:3') {
      sequencingDiv();
    }
    if (__e == '00:01:30:7') {
      sequencingDiv();
    }

    if (__e == '00:01:31:2') {
      sequencingDiv();
    }
    if (__e == '00:01:31:3') {
      sequencingDiv();
    }
    if (__e == '00:01:31:9') {
      sequencingDiv();
    }
    if (__e == '00:01:32:3') {
      sequencingDiv();
    }
    if (__e == '00:01:32:7') {
      sequencingDiv();
    }

    if (__e == '00:01:33:2') {
      sequencingDiv();
    }
    if (__e == '00:01:33:3') {
      sequencingDiv();
    }
    if (__e == '00:01:33:9') {
      sequencingDiv();
    }
    if (__e == '00:01:34:3') {
      sequencingDiv();
    }
    if (__e == '00:01:34:7') {
      sequencingDiv();
    }

    if (__e == '00:01:35:2') {
      sequencingDiv();
    }
    if (__e == '00:01:35:3') {
      sequencingDiv();
    }
    if (__e == '00:01:35:9') {
      sequencingDiv();
    }
    if (__e == '00:01:36:3') {
      sequencingDiv();
    }
    if (__e == '00:01:36:7') {
      sequencingDiv();
      clearInterval(square);
    }

    if (__e == '00:01:37:2') {
      sequencingDiv();
    }
    if (__e == '00:01:37:3') {
      sequencingDiv();
    }
    if (__e == '00:01:37:9') {
      sequencingDiv();
    }
    if (__e == '00:01:38:3') {
      sequencingDiv();
    }
    if (__e == '00:01:38:7') {
      sequencingDiv();
    }

    if (__e == '00:01:39:2') {
      sequencingDiv();
    }
    if (__e == '00:01:39:3') {
      sequencingDiv();
    }
    if (__e == '00:01:39:9') {
      sequencingDiv();
    }
    if (__e == '00:01:40:3') {
      sequencingDiv();
    }
    if (__e == '00:01:40:7') {
      sequencingDiv();
    }

    if (__e == '00:01:41:2') {
      sequencingDiv();
    }
    if (__e == '00:01:41:3') {
      sequencingDiv();
    }
    if (__e == '00:01:41:9') {
      sequencingDiv();
    }
    if (__e == '00:01:42:3') {
      sequencingDiv();
    }
    if (__e == '00:01:42:7') {
      sequencingDiv();
    }

    if (__e == '00:01:43:2') {
      sequencingDiv();
    }
    if (__e == '00:01:43:3') {
      sequencingDiv();
    }
    if (__e == '00:01:43:9') {
      sequencingDiv();
    }
    if (__e == '00:01:44:3') {
      sequencingDiv();
    }
    if (__e == '00:01:44:7') {
      sequencingDiv();
    }

    if (__e == '00:01:45:2') {
      sequencingDiv();
    }
    if (__e == '00:01:45:3') {
      sequencingDiv();
    }
    if (__e == '00:01:45:9') {
      sequencingDiv();
    }
    if (__e == '00:01:46:3') {
      sequencingDiv();
    }
    if (__e == '00:01:46:7') {
      sequencingDiv();
    }
    if (__e == '00:01:47:2') {
      sequencingDiv();
    }
    if (__e == '00:01:47:3') {
      sequencingDiv();
    }
    if (__e == '00:01:47:9') {
      sequencingDiv();
    }
    if (__e == '00:01:48:3') {
      sequencingDiv();
    }
    if (__e == '00:01:48:7') {
      sequencingDiv();
    }

    if (__e == '00:01:49:2') {
      sequencingDiv();
    }
    if (__e == '00:01:49:3') {
      sequencingDiv();
    }
    if (__e == '00:01:49:9') {
      sequencingDiv();
    }
    if (__e == '00:01:50:3') {
      sequencingDiv();
    }
    if (__e == '00:01:50:7') {
      sequencingDiv();
    }

    if (__e == '00:01:51:2') {
      sequencingDiv();
    }
    if (__e == '00:01:51:3') {
      sequencingDiv();
    }
    if (__e == '00:01:51:9') {
      sequencingDiv();
    }
    if (__e == '00:01:52:3') {
      sequencingDiv();
    }
    if (__e == '00:01:52:7') {
      sequencingDiv();
    }

    if (__e == '00:01:53:2') {
      sequencingDiv();
    }
    if (__e == '00:01:53:3') {
      sequencingDiv();
    }
    if (__e == '00:01:53:9') {
      sequencingDiv();
    }
    if (__e == '00:01:54:3') {
      sequencingDiv();
    }
    if (__e == '00:01:54:7') {
      sequencingDiv();
    }

    if (__e == '00:01:55:2') {
      sequencingDiv();
    }
    if (__e == '00:01:55:3') {
      sequencingDiv();
    }
    if (__e == '00:01:55:9') {
      sequencingDiv();
    }
    if (__e == '00:01:56:3') {
      sequencingDiv();
    }
    if (__e == '00:01:56:7') {
      sequencingDiv();
    }

    if (__e == '00:01:57:2') {
      sequencingDiv();
    }
    if (__e == '00:01:57:3') {
      sequencingDiv();
    }
    if (__e == '00:01:57:9') {
      sequencingDiv();
    }
    if (__e == '00:01:58:3') {
      sequencingDiv();
    }
    if (__e == '00:01:58:7') {
      sequencingDiv();
    }

    if (__e == '00:01:59:2') {
      sequencingDiv();
    }
    if (__e == '00:01:59:3') {
      sequencingDiv();
    }
    if (__e == '00:01:59:9') {
      sequencingDiv();
    }
    if (__e == '00:02:00:3') {
      sequencingDiv();
    }
    if (__e == '00:02:00:7') {
      sequencingDiv();
    }

    if (__e == '00:02:01:2') {
      sequencingDiv();
    }
    if (__e == '00:02:01:3') {
      sequencingDiv();
    }
    if (__e == '00:02:01:9') {
      sequencingDiv();
    }
    if (__e == '00:02:02:3') {
      sequencingDiv();
    }
    if (__e == '00:02:02:7') {
      sequencingDiv();
    }

    if (__e == '00:02:03:2') {
      sequencingDiv();
    }
    if (__e == '00:02:03:3') {
      sequencingDiv();
    }
    if (__e == '00:02:03:9') {
      sequencingDiv();
    }
    if (__e == '00:02:04:3') {
      sequencingDiv();
    }
    if (__e == '00:02:04:7') {
      sequencingDiv();
    }

    if (__e == '00:02:05:2') {
      sequencingDiv();
    }
    if (__e == '00:02:05:3') {
      sequencingDiv();
    }
    if (__e == '00:02:05:9') {
      sequencingDiv();
    }
    if (__e == '00:02:06:3') {
      sequencingDiv();
    }
    if (__e == '00:02:06:7') {
      sequencingDiv();
    }
    if (__e == '00:02:07:2') {
      sequencingDiv();
    }
    if (__e == '00:02:07:3') {
      sequencingDiv();
    }
    if (__e == '00:02:07:9') {
      sequencingDiv();
    }
    if (__e == '00:02:08:3') {
      sequencingDiv();
    }
    if (__e == '00:02:08:7') {
      sequencingDiv();
    }
    if (__e == '00:02:09:2') {
      sequencingDiv();
    }
    if (__e == '00:02:09:3') {
      sequencingDiv();
    }
    if (__e == '00:02:09:9') {
      sequencingDiv();
    }
    if (__e == '00:02:10:3') {
      sequencingDiv();
    }
    if (__e == '00:02:10:7') {
      sequencingDiv();
    }
    if (__e == '00:02:11:2') {
      sequencingDiv();
    }
    if (__e == '00:02:11:3') {
      sequencingDiv();
    }
    if (__e == '00:02:11:9') {
      sequencingDiv();
    }
    if (__e == '00:02:12:3') {
      sequencingDiv();
    }
    if (__e == '00:02:12:7') {
      sequencingDiv();
    }
    if (__e == '00:02:13:2') {
      sequencingDiv();
    }
    if (__e == '00:02:13:3') {
      sequencingDiv();
    }
    if (__e == '00:02:13:9') {
      sequencingDiv();
    }
    if (__e == '00:02:14:3') {
      sequencingDiv();
    }
    if (__e == '00:02:14:7') {
      sequencingDiv();
    }
    if (__e == '00:02:15:2') {
      sequencingDiv();
    }
    if (__e == '00:02:15:3') {
      sequencingDiv();
    }
    if (__e == '00:02:15:9') {
      sequencingDiv();
    }
    if (__e == '00:02:16:3') {
      sequencingDiv();
    }
    if (__e == '00:02:16:7') {
      sequencingDiv();
    }
    if (__e == '00:02:17:2') {
      sequencingDiv();
    }
    if (__e == '00:02:17:3') {
      sequencingDiv();
    }
    if (__e == '00:02:17:9') {
      sequencingDiv();
    }
    if (__e == '00:02:18:3') {
      sequencingDiv();
    }
    if (__e == '00:02:18:7') {
      sequencingDiv();
    }
    if (__e == '00:02:19:2') {
          sequencingDiv();
        }
        if (__e == '00:02:19:3') {
          sequencingDiv();
        }
        if (__e == '00:02:19:9') {
          sequencingDiv();
        }
        if (__e == '00:02:20:3') {
          sequencingDiv();
        }
        if (__e == '00:02:20:7') {
          sequencingDiv();
        }
        if (__e == '00:02:21:2') {
          sequencingDiv();
        }
        if (__e == '00:02:21:3') {
          sequencingDiv();
        }
        if (__e == '00:02:21:9') {
          sequencingDiv();
        }
        if (__e == '00:02:22:3') {
          sequencingDiv();
        }
        if (__e == '00:02:22:7') {
          sequencingDiv();
        }
        if (__e == '00:02:23:2') {
          sequencingDiv();
        }
        if (__e == '00:02:23:3') {
          sequencingDiv();
        }
        if (__e == '00:02:23:9') {
          sequencingDiv();
        }
        if (__e == '00:02:24:3') {
          sequencingDiv();
        }
        if (__e == '00:02:24:7') {
          sequencingDiv();
        }

        if (__e == '00:02:25:2') {
          sequencingDiv();
        }
        if (__e == '00:02:25:3') {
          sequencingDiv();
        }
        if (__e == '00:02:25:9') {
          sequencingDiv();
        }
        if (__e == '00:02:26:3') {
          sequencingDiv();
        }
        if (__e == '00:02:26:7') {
          sequencingDiv();
        }
        if (__e == '00:02:27:2') {
          sequencingDiv();
        }
        if (__e == '00:02:27:3') {
          sequencingDiv();
          console.log("sub no ultimo kick BASE FREQUENCY CHANGE SEQUENCING")
          player5 = new Tone.Player("burp.wav").toMaster();
          player5.autostart = true;
        }

        if (__e == '00:02:36:0') {
          var element = document.getElementById("ikeda");
          element.parentNode.removeChild(element);

        }
        if (__e == '00:02:39:0') {
          player5.mute = true;
          player5 = null;
          var _element = document.getElementById("timeline");
          _element.parentNode.removeChild(_element);

          autoFilterOne.set({
            "filter": {
              "frequency": 500,
              "baseFrequency": 100,
              "octaves": 0,
              "rolloff": -24
            }
          });
          noiseOne.mute = false;
          document.getElementById("myVideo").style.display = "block";
          myFunction();

          document.getElementById("ikeda2").style.backgroundColor = "black";
          document.getElementById("ikeda2").style.border = '1px solid white';
          document.getElementById("ikeda3").style.display = "block";
          document.getElementById("ikeda3").style.border = '1px solid white';

          document.getElementById("ikeda4").style.display = "block";
          document.getElementById("ikeda4").style.border = '1px solid white';

          document.getElementById("ikeda5").style.display = "block";
          document.getElementById("ikeda5").style.border = '1px solid white';

          document.getElementById("ikeda6").style.display = "block";
          document.getElementById("ikeda6").style.border = '1px solid white';

          document.getElementById("consolediv").style.display = "block";


        }

        if (__e == '00:02:41:0') {
          //clearInterval(timelinetxt); and others
          console.log("init synthesier");
        }



});





var counter = 0;
function addTimeLineToDiv(v) {
  timelinetxt = setInterval(function() {
    counter++;
    console.log(counter)
    if (counter <= 35) {
      document.getElementById('timeline').style.cssText = 'position:absolute;width:15%;height:100%;left:5%;top:20%;display:block;background:#000';
      document.getElementById('timeline2').style.cssText = 'position:absolute;width:15%;height:100%;right:5%;top:20%;display:block;background:#000';

      document.getElementById('timeline').innerHTML += v + '<br>';//stringtext;
      document.getElementById('timeline2').innerHTML += v + '<br>';//stringtext;


      var ___e = Math.random().toString(36).substring(2, 15);

      document.getElementById('ikeda5').innerHTML += ___e + '<br>';
      document.getElementById('ikeda6').innerHTML += ___e + '<br>';


    }
    if (counter > 35) {
      document.getElementById('timeline').innerHTML = "";
      document.getElementById('timeline2').innerHTML = "";
      document.getElementById('ikeda5').innerHTML = "";
      document.getElementById('ikeda6').innerHTML = "";


      counter = 0;
    }

  }, 100);
}

var _counter = 0;
function writeMemory() {
  _timelinetxt = setInterval(function() {
    _counter++;
    console.log(_counter)
    if (_counter <= 10) {

      var _a = JSON.stringify(a);
      console.log(_a);
      document.getElementById('maintext').innerHTML += _a + '<br>';//stringtext;
    }
    if (_counter > 10) {
      document.getElementById('maintext').innerHTML = "";
      _counter = 0;
    }
  }, 150);
}

/*
var __counter = 0;
function _writeMemory() {
  timelinetxt = setInterval(function() {
    __counter++;
    console.log(__counter)
    if (__counter <= 30) {
      var l = Math.floor(Math.random() * 1000);
      var a = 'Uncaught TypeError: Cannot set property innerHTML of null at directing.js:910 (anonymous) @ directing.js:910';
      var _a = l + a;
      document.getElementById('consolediv').innerHTML += _a + '<br>';//stringtext;
    }
    if (__counter > 30) {
      document.getElementById('consolediv').innerHTML = "";
      __counter = 0;
    }
  }, 90);
}*/



function sequencingDiv() {
  var elem = document.createElement('ele');
  elem.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#fff';
  document.body.appendChild(elem);
  $(elem).fadeOut( "fast", function() {
    console.log("this");
  });
}

/*function removeseqDiv() {
  var child = $('ele');
  child.remove();
}*/

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
function _secondMov() {
    _secondMv = setInterval(function() {
      whiteBack();
    }, 30);
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
