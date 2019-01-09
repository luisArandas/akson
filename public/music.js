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

//----------------------------------
//  BUTTONS
//----------------------------------

var buttonOneVariable = false;

function buttonOne() {
  /*  if (buttonOneVariable == false) {
      document.getElementById("mySidenav").style.width = window.innerWidth;
    }
    if (buttonOneVariable == true) {
      document.getElementById("mySidenav").style.width = "250px";
    }
    if (buttonOneVariable == true) {
      buttonOneVariable = false;
    } else {
      buttonOneVariable = true;
    }*/
}

function buttonTwo() {
  console.log("luis2");
}

function buttonThree() {
  console.log("luis3");
}


// --------------------------- SLIDERS --------------------------
//REVERB

var reverb_roomsize = new Nexus.Slider('#reverb_roomsize', {
  'size': [200, 20],
  step: 0.1,
});
reverb_roomsize.min = 1;
reverb_roomsize.max = 2;
reverb_roomsize.value = 1;
reverb_roomsize.on('change', function(v) {
  console.log("Reverb Roomsize" + v);
  reverb.roomSize.value = v;

});

var reverb_wetdry = new Nexus.Slider('#reverb_wetdry', {
  step: 0.01,
});
reverb_wetdry.min = 0.1;
reverb_wetdry.max = 0.2;
reverb_wetdry.value = 0.1;
reverb_wetdry.on('change', function(v) {
  console.log("Reverb WetDry" + v);
  reverb.wet.value = v;
});

var reverb_damp = new Nexus.Slider('#reverb_damp', {});
reverb_damp.min = 1000;
reverb_damp.max = 5000;
reverb_damp.on('change', function(v) {
  console.log("Reverb Damp" + v);
  console.log("NOTWORKING ATM");
});

//VIBRATO

var vibrato_frequency = new Nexus.Slider('#vibrato_frequency', {});
vibrato_frequency.min = 0;
vibrato_frequency.max = 10;
vibrato_frequency.value = 5;
vibrato_frequency.on('change', function(v) {
  vibrato.frequency.value = v;
  console.log("Vibrato Frequency" + v);
});

var vibrato_depth = new Nexus.Slider('#vibrato_depth', {
  step: 0.001,
});
vibrato_depth.min = 0.1;
vibrato_depth.max = 2;
vibrato_depth.value = 0.2;
vibrato_depth.on('change', function(v) {
  vibrato.depth.value = v;
  console.log("Vibrato Depth" + v);
});

var vibrato_maxdelay = new Nexus.Slider('#vibrato_maxdelay', {});
vibrato_maxdelay.min = 0;
vibrato_maxdelay.max = 0.01;
vibrato_maxdelay.value = 0.005;
vibrato_maxdelay.on('change', function(v) {
  vibrato.maxdelay.value = v;
  console.log("Vibrato Depth" + v);
  console.log("NOT WORKING");
});

//SINTETIZADOR

var sinth_attack = new Nexus.Slider('#sinth_attack', {
  step: 0.01,
});
sinth_attack.min = 0.01;
sinth_attack.max = 1;
sinth_attack.value = 0.01;
sinth_attack.on('change', function(v) {
  console.log("Attack Synth" + v);
  synth.set("attack", v);
});

var sinth_decay = new Nexus.Slider('#sinth_decay', {});
sinth_decay.min = 0;
sinth_decay.max = 0.01;
sinth_decay.value = 0.005;
sinth_decay.on('change', function(v) {
  vibrato.maxdelay.value = v;
  console.log("Vibrato Depth" + v);
  console.log("NOT WORKING");
});

var sinth_sustain = new Nexus.Slider('#sinth_sustain', {});
sinth_sustain.min = 0;
sinth_sustain.max = 0.01;
sinth_sustain.value = 0.005;
sinth_sustain.on('change', function(v) {
  vibrato.maxdelay.value = v;
  console.log("Vibrato Depth" + v);
  console.log("NOT WORKING");
});

var sinth_release = new Nexus.Slider('#sinth_release', {
  step: 0.1,
});
sinth_release.min = 0;
sinth_release.max = 10;
sinth_release.value = 4;
sinth_release.on('change', function(v) {
  console.log("Synth Release" + v);
  synth.set("release", v);
});

//FILTER AND Q

var filter_frequency = new Nexus.Slider('#filter_frequency', {});
filter_frequency.min = 50;
filter_frequency.max = 1000;
filter_frequency.value = 100;
filter_frequency.on('change', function(v) {});

var filter_q = new Nexus.Slider('#filter_q', {});
filter_q.min = 0;
filter_q.max = 0.3;
filter_q.value = 0.1;
filter_q.on('change', function(v) {});





/*
window.onload = function() {
  console.clear();
  // can have Tone.Js setup
};

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


Nexus.context = Tone.context;
Nexus.clock.start();
Nexus.colors.accent = "#ff0";
Nexus.colors.fill = "#333";

nx.onload = function() {
  nx.sendsTo("node");
  // nx.sendsTo(function(data){
  //     socket.emit('nx', { id: this.canvasID, data: data });
  // });
}
*/