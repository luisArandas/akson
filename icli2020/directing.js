var time = 0;
var ctxDown = false;
var whiteUp = false;
var firstMv;
var secondMv;
var thirdMv;
var fourthMv;

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
        startPiece = true;
        console.log(startPiece);
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
    window.fetch("beep2.wav")
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
          newaudio = audioBuffer;
    });

    play(newaudio);

      fourthMv = setInterval(function() {

        //play(newaudio);

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
      shading = true;
      contextStop();


      autoFilterOne.set({
        "frequency": 6500,
        "baseFrequency": 1000
      });
      glitchPass.goWild = true;
      glitchPass.renderToScreen = true;
    }
    if (time == 43) {
      shading = false;
      contextStop();
      scene.add( cube );

      glitchPass.goWild = false;
      glitchPass.renderToScreen = false;
    }
    if (time == 48) {
      rotation = 0.01;
      glitchPass.renderToScreen = true;
      cube.scale.x = 0.2; // SCALE
      cube.scale.y = 0.2; // SCALE
      cube.scale.z = 0.2; // SCALE
      //blackBack();
      console.log("put black flicker"),
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

//}
