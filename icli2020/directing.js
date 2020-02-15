var time = 0;
var ctxDown = false;
var whiteUp = false;
var firstMv;
var secondMv;
var thirdMv;
var fourthMv;

// https://leclub.github.io/2016/06/ThreeJS-Glitch-Shader/

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

function thirdMov() {
    thirdMov = setInterval(function() {
      fourthCustom();
    }, 1000);
}
var foure = 0;
console.log("sequencing");

function fourthMov() {
    fourthMv = setInterval(function() {
      polySynth.triggerAttackRelease(["C4", "E4", "A4"], "4n");
      setInterval(function() {
        console.log(foure);
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
          var e = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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

setInterval(function() {
  time++;
  console.log(time);
  if (time == 14) {
    firstMov();
  }
  if (time == 16) {
    clearInterval(firstMv);
    secondMov();
  }
  if (time == 17) {
    clearInterval(secondMv);
    thirdMov();
  }
  if (time == 19  ) {
    clearInterval(thirdMv);
    fourthCustom();
    fourthMov();
  }
  if (time == 28) {
    clearInterval(fourthMv);
    //kickSyn.triggerAttackRelease("C1", "8n");
    glitchPass.renderToScreen = true;
  }
}, 1000);



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

function fourthCustom() {
  document.getElementById("parte1_1").style.display = "none";
}
