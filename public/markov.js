var cadeiaUm = new Tone.CtrlMarkov({
  "C3": [{
      "value": "C3",
      "probability": 0.5
    },
    {
      "value": "D3",
      "probability": 0.5
    },
    {
      "value": "E3",
      "probability": 0.25
    },
    {
      "value": "F3",
      "probability": 0.8
    },
    {
      "value": "G3",
      "probability": 0.8
    },
    {
      "value": "A3",
      "probability": 0.5
    },
    {
      "value": "B3",
      "probability": 0.5
    }
  ]
});

/*
  Now it's simple
  put all the notes inside C3
  Make the same for all the notes of the scale like C3
  Make a chain exactly the same for each scale.
  Majors and minors
*/

cadeiaUm.value = "C3";

function markovNote() {
  console.log(cadeiaUm.next());
  cadeiaUm.value = "C3";
}

/*
var chain = new Tone.CtrlMarkov({
  "beginning": [{
      "value": "end",
      "probability": 0.8
    },
    {
      "value": "middle",
      "probability": 0.2
    }
  ],
  "middle": "end"
});
chain.value = "beginning";
//chain.next(); //returns "end" with 80% probability or "middle" with 20%.
*/

var colorMajorPentatonic = ["#c2, #d2, #e2, #g2, #a2, #c3, #d3, #e3, #g3, #a3, #c4, #d4, #e4, #g4, #a4, #c5, #d5, #e5, #g5, #a5"];
var colorMinorPentatonic = ["#c2, #ds2, #f2, #g2, #as2, #c3, #ds3, #f3, #g3, #as3, #c4, #ds4, #f4, #g4, #as4, #c5, #ds5, #f5, #g5, #as5"];
var colorMajor = ["#c2, #d2, #e2, #f2, #g2, #a2, #b2, #c3, #d3, #e3, #f3, #g3, #a3, #b3, #c4, #d4, #e4, #f4, #g4, #a4, #b4, #c5, #d5, #e5, #f5, #g5, #a5, #b5, #c6"];
var colorMinor = ["#c2, #d2, #ds2, #f2, #g2, #gs2, #as2, #c3, #d3, #ds3, #f3, #g3, #gs3, #as3, #c4, #d4, #ds4, #f4, #g4, #gs4, #as4, #c5, #d5, #ds5, #f5, #g5, #gs5, #as5, #c6"];
var colorAdonai = ["#c2, #cs2, #d2, #ds2, #f2, #g2, #a2, #as2, #c3, #cs3, #d3, #ds3, #f3, #g3, #a3, #as3, #c4, #cs4, #d4, #ds4, #f4, #g4, #a4, #as4, #c5, #cs5, #d5, #ds5, #f5, #g5, #a5, #as5, #c6"];
var colorHungarian = ["#c2, #ds2, #e2, #fs2, #g2, #a2, #as2, #c3, #ds3, #e3, #fs3, #g3, #a3, #as3, #c4, #ds4, #e4, #fs4, #g4, #a4, #as4, #c5, #ds5, #e5, #fs5, #g5, #a5, #as5, #c6"];
var colorHarmonic = ["#c2, #d2, #ds2, #f2, #g2, #gs2, #b2, #c3, #d3, #ds3, #f3, #g3, #gs3, #b3, #c4, #d4, #ds4, #f4, #g4, #gs4, #b4, #c5, #d5, #ds5, #f5, #g5, #gs5, #b5, #c6"];
var colorMelodic = ["#c2, #d2, #ds2, #f2, #g2, #a2, #b2, #c3, #d3, #ds3, #f3, #g3, #a3, #b3, #c4, #d4, #ds4, #f4, #g4, #a4, #b4, #c5, #d5, #ds5, #f5, #g5, #a5, #b5, #c6"];
var colorHirajoshi = ["#c2, #d2, #ds2, #g2, #gs2, #c3, #d3, #ds3, #g3, #gs3, #c4, #d4, #ds4, #g4, #gs4, #c5, #d5, #ds5, #g5, #gs5, #c6"];
var colorIonian = ["#c2, #d2, #e2, #f2, #g2, #a2, #b2, #c3, #d3, #e3, #f3, #g3, #a3, #b3, #c4, #d4, #e4, #f4, #g4, #a4, #b4, #c5, #d5, #e5, #f5, #g5, #a5, #b5, #c6"];
var colorLocrian = ["#c2, #cs2, #ds2, #f2, #fs2, #gs2, #as2, #c3, #cs3, #ds3, #f3, #fs3, #gs3, #as3, #c4, #cs4, #ds4, #f4, #fs4, #gs4, #as4, #c5, #cs5, #ds5, #f5, #fs5, #gs5, #as5, #c6"];


function changeScale(data) {
  var x = document.querySelectorAll("#c2, #cs2, #d2, #ds2, #e2, #f2, #fs2, #g2, #gs2, #a2, #as2, #b2, #c3, #cs3, #d3, #ds3, #e3, #f3, #fs3, #g3, #gs3, #a3, #as3, #b3, #c4, #cs4, #d4, #ds4, #e4, #f4, #fs4, #g4, #gs4, #a4, #as4, #b4, #c5, #cs5, #d5, #ds5, #e5, #f5, #fs5, #g5, #gs5, #a5, #as5, #b5, #c6");
  x.forEach(function(x) {
    x.style.background = "black";
    x.style.color = "white";
  });

  if (data == "pentatonicMajor") {
    scale = newScale.cMajorPentatonic();
    document.getElementById('scaleInfo').innerHTML = 'C Major Pentatonic';
    var v = document.querySelectorAll(colorMajorPentatonic);
    v.forEach(function(v) {
      v.style.background = "white";
      v.style.color = "black";
    });
    console.log(scale);
    modalAbout.style.display = "none";
    modalMode.style.display = "none";
    modalScale.style.display = "none";
    openGui();
  };

  if (data == "pentatonicMinor") {
    scale = newScale.cMinorPentatonic();
    document.getElementById('scaleInfo').innerHTML = 'C Minor Pentatonic';
    var v = document.querySelectorAll(colorMinorPentatonic);
    v.forEach(function(v) {
      v.style.background = "white";
      v.style.color = "black";
    });
    console.log(scale);
    modalAbout.style.display = "none";
    modalMode.style.display = "none";
    modalScale.style.display = "none";
    openGui();
  };

  if (data == "major") {
    scale = newScale.cMajor();
    document.getElementById('scaleInfo').innerHTML = 'C Major';
    var v = document.querySelectorAll(colorMajor);
    v.forEach(function(v) {
      v.style.background = "white";
      v.style.color = "black";
    });
    console.log(scale);
    modalAbout.style.display = "none";
    modalMode.style.display = "none";
    modalScale.style.display = "none";
    openGui();
  };

  if (data == "minor") {
    var x = document.querySelectorAll(colorMajorPentatonic, colorMinorPentatonic, colorMajor, colorMinor, colorAdonai, colorHungarian, colorHarmonic, colorMelodic, colorHirajoshi, colorIonian, colorLocrian);
    x.forEach(function(x) {
      x.style.background = "black";
      x.style.color = "white";
    });
    scale = newScale.cMinor();
    document.getElementById('scaleInfo').innerHTML = 'C Minor';
    var v = document.querySelectorAll(colorMinor);
    v.forEach(function(v) {
      v.style.background = "white";
      v.style.color = "black";
    });
  };


  if (data == "harmonicMinor") {
    var x = document.querySelectorAll(colorMajorPentatonic, colorMinorPentatonic, colorMajor, colorMinor, colorAdonai, colorHungarian, colorHarmonic, colorMelodic, colorHirajoshi, colorIonian, colorLocrian);
    x.forEach(function(x) {
      x.style.background = "black";
      x.style.color = "white";
    });
    scale = newScale.cHarmonicMinor();
    document.getElementById('scaleInfo').innerHTML = 'C Harmonic Minor';
    var v = document.querySelectorAll(colorHarmonic);
    v.forEach(function(v) {
      v.style.background = "white";
      v.style.color = "black";
    });
  };

  if (data == "melodicMinor") {
    var x = document.querySelectorAll(colorMajorPentatonic, colorMinorPentatonic, colorMajor, colorMinor, colorAdonai, colorHungarian, colorHarmonic, colorMelodic, colorHirajoshi, colorIonian, colorLocrian);
    x.forEach(function(x) {
      x.style.background = "black";
      x.style.color = "white";
    });
    scale = newScale.cMelodicMinor();
    document.getElementById('scaleInfo').innerHTML = 'C Melodic Minor';
    var v = document.querySelectorAll(colorMelodic);
    v.forEach(function(v) {
      v.style.background = "white";
      v.style.color = "black";
    });
  };

  if (data == "ionian") {
    var x = document.querySelectorAll(colorMajorPentatonic, colorMinorPentatonic, colorMajor, colorMinor, colorAdonai, colorHungarian, colorHarmonic, colorMelodic, colorHirajoshi, colorIonian, colorLocrian);
    x.forEach(function(x) {
      x.style.background = "black";
      x.style.color = "white";
    });
    scale = newScale.cIonian();
    document.getElementById('scaleInfo').innerHTML = 'C Ionian';
    var v = document.querySelectorAll(colorIonian);
    v.forEach(function(v) {
      v.style.background = "white";
      v.style.color = "black";
    });
  };

  if (data == "locrian") {
    var x = document.querySelectorAll(colorMajorPentatonic, colorMinorPentatonic, colorMajor, colorMinor, colorAdonai, colorHungarian, colorHarmonic, colorMelodic, colorHirajoshi, colorIonian, colorLocrian);
    x.forEach(function(x) {
      x.style.background = "black";
      x.style.color = "white";
    });
    scale = newScale.cLocrian();
    document.getElementById('scaleInfo').innerHTML = 'C Locrian';
    var v = document.querySelectorAll(colorLocrian);
    v.forEach(function(v) {
      v.style.background = "white";
      v.style.color = "black";
    });
  };

  if (data == "adonai") {
    var x = document.querySelectorAll(colorMajorPentatonic, colorMinorPentatonic, colorMajor, colorMinor, colorAdonai, colorHungarian, colorHarmonic, colorMelodic, colorHirajoshi, colorIonian, colorLocrian);
    x.forEach(function(x) {
      x.style.background = "black";
      x.style.color = "white";
    });
    scale = newScale.cAdonaiMalakh();
    document.getElementById('scaleInfo').innerHTML = 'C Adonai Malakh';
    var v = document.querySelectorAll(colorAdonai);
    v.forEach(function(v) {
      v.style.background = "white";
      v.style.color = "black";
    });
  };

  if (data == "hirajoshi") {
    var x = document.querySelectorAll(colorMajorPentatonic, colorMinorPentatonic, colorMajor, colorMinor, colorAdonai, colorHungarian, colorHarmonic, colorMelodic, colorHirajoshi, colorIonian, colorLocrian);
    x.forEach(function(x) {
      x.style.background = "black";
      x.style.color = "white";
    });
    scale = newScale.cHirajoshiJapan();
    document.getElementById('scaleInfo').innerHTML = 'C Hirajoshi';
    var v = document.querySelectorAll(colorHirajoshi);
    v.forEach(function(v) {
      v.style.background = "white";
      v.style.color = "black";
    });
  };

  if (data == "hungarian") {
    var x = document.querySelectorAll(colorMajorPentatonic, colorMinorPentatonic, colorMajor, colorMinor, colorAdonai, colorHungarian, colorHarmonic, colorMelodic, colorHirajoshi, colorIonian, colorLocrian);
    x.forEach(function(x) {
      x.style.background = "black";
      x.style.color = "white";
    });
    scale = newScale.cHungarianMajor();
    document.getElementById('scaleInfo').innerHTML = 'C Hungarian Major';
    var v = document.querySelectorAll(colorHungarian);
    v.forEach(function(v) {
      v.style.background = "white";
      v.style.color = "black";
    });
  };
  console.log(scale);
  modalAbout.style.display = "none";
  modalMode.style.display = "none";
  modalScale.style.display = "none";
  openGui();
}

function scaleModal() {
  modalScale.style.display = "block";
  closeGui();
}


function consoleLog(v) {
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "This doesn't work right now, sorry.";
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
}

class ScalePlaying {
  constructor(type, state) {
    this.type = type;
    this.state = state;
  }
  cMajorPentatonic() {
    //C, D, E, G, A;
    return ['C2', 'D2', 'E2', 'G2', 'A2', 'C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5'];
  }
  cMinorPentatonic() {
    //C, D#, F, G, A#;
    return ['C2', 'D#2', 'F2', 'G2', 'A#2', 'C3', 'D#3', 'F3', 'G3', 'A#4', 'C4', 'D#4', 'F4', 'G4', 'A#4', 'C5', 'D#5', 'F5', 'G5', 'A#5'];
  }
  cMajor() {
    //C, D, E, F, G, A, B
    return ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];
  }
  cMinor() {
    //C, D, D#, F, G, G#, A#
    return ['C2', 'D2', 'D#2', 'F2', 'G2', 'G#2', 'A#2', 'C3', 'D3', 'D#3', 'F3', 'G3', 'G#3', 'A#3', 'C4', 'D4', 'D#4', 'F4', 'G4', 'G#4', 'A#4', 'C5', 'D5', 'D#5', 'F5', 'G5', 'G#5', 'A#5'];
  }
  cHarmonicMinor() {
    //C, D, D#, F, G, G#, B
    return ['C2', 'D2', 'D#2', 'F2', 'G2', 'G#2', 'B2', 'C3', 'D3', 'D#3', 'F3', 'G3', 'G#3', 'B3', 'C4', 'D4', 'D#4', 'F4', 'G4', 'G#4', 'B4', 'C5', 'D5', 'D#5', 'F5', 'G5', 'G#5', 'B5'];
  }
  cMelodicMinor() {
    //C, D, D#, F, G, A, B
    return ['C2', 'D2', 'D#2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'D#3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'D#4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'D#5', 'F5', 'G5', 'A5', 'B5'];
  }
  cAdonaiMalakh() {
    //C, C#, D, D#, F, G, A, A#
    return ['C2', 'C#2', 'D2', 'D#2', 'F2', 'G2', 'A2', 'A#2', 'C3', 'C#3', 'D3', 'D#3', 'F3', 'G3', 'A3', 'A#3', 'C4', 'C#4', 'D4', 'D#4', 'F4', 'G4', 'A4', 'A#4', 'C5', 'C#5', 'D5', 'D#5', 'F5', 'G5', 'A5', 'A#5'];
  }
  cHungarianMajor() {
    //C, D#, E, F#, G, A, A#
    return ['C2', 'D#2', 'E2', 'F#2', 'G2', 'A2', 'A#2', 'C3', 'D#3', 'E3', 'F#3', 'G3', 'A3', 'A#3', 'C4', 'D#4', 'E4', 'F#4', 'G4', 'A4', 'A#4', 'C5', 'D#5', 'E5', 'F#5', 'G5', 'A5', 'A#5'];
  }
  cHirajoshiJapan() {
    //C, D, D#, G, G#
    return ['C2', 'D2', 'D#2', 'G2', 'G#2', 'C3', 'D3', 'D#3', 'G3', 'G#3', 'C4', 'D4', 'D#4', 'G4', 'G#4', 'C5', 'D5', 'D#5', 'G5', 'G#5'];
  }
  cIonian() {
    //C, D, E, F, G, A, B
    return ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];
  }
  cLocrian() {
    //C, Db, Eb, F, Gb, Ab, Bb
    return ['C2', 'C#2', 'D#2', 'F2', 'F#2', 'G#2', 'A#2', 'C3', 'C#3', 'D#3', 'F3', 'F#3', 'G#3', 'A#3', 'C4', 'C#4', 'D#4', 'F4', 'F#4', 'G#4', 'A#4', 'C5', 'C#5', 'D#5', 'F5', 'F#5', 'G#5', 'A#5'];
  }
}


/* Also check chords */
//https://feelyoursound.com/scale-chords/f-major-pentatonic/

/*
var list = ["bar", "baz", "foo", "qux"];
var note = 'foo';
list.splice(list.indexOf(note), 1);
console.log(list);*/

/*
May be interesting
  dMajorPentatonic() {
    //D, E, F#, A, B;
    return ['D2', 'E2', 'F#2', 'A2', 'B2', 'D3', 'E3', 'F#3', 'A3', 'B3', 'D4', 'E4', 'F#4', 'A4', 'B4', 'D5', 'E5', 'F#5', 'A5', 'B5', 'D6'];
  }
  dMinorPentatonic() {
    //D, F, G, A, C;
    return ['D2', 'F2', 'G2', 'A2', 'C3', 'D3', 'F3', 'G3', 'A3', 'C4', 'D4', 'F4', 'G4', 'A4', 'C5', 'D5', 'F5', 'G5', 'A5', 'C6', 'D6'];
  }
  eMajorPentatonic() {
    //E, F#, G#, B, C#;
    return ['E2', 'F#2', 'G#2', 'B2', 'C#3', 'E3', 'F#3', 'G#3', 'B3', 'C#4', 'E4', 'F#4', 'G#4', 'B4', 'C#5', 'E5', 'F#5', 'G#5', 'B5', 'C#6', 'E6'];
  }
  eMinorPentatonic() {
    //E, G, A, B, D;
    return ['E2', 'G2', 'A2', 'B2', 'D3', 'E3', 'G3', 'A3', 'B3', 'D4', 'E4', 'G4', 'A4', 'B4', 'D4', 'E5', 'G5', 'A5', 'B5', 'D5', 'E6'];
  }
  fMajorPentatonic() {
    //F, G, A, C, D;
    return ['F2', 'G2', 'A2', 'C3', 'D3', 'F3', 'G3', 'A3', 'C4', 'D4', 'F4', 'G4', 'A4', 'C5', 'D5', 'F5', 'G5', 'A5', 'C6', 'D6', 'F6'];
  }
  fMinorPentatonic() {
    //F, G#, A#, C, D#;
    return ['F2', 'G#2', 'A#2', 'C3', 'D#3', 'F3', 'G#3', 'A#3', 'C4', 'D#4', 'F4', 'G#4', 'A#4', 'C5', 'D#5', 'F5', 'G#5', 'A#5', 'C6', 'D#6', 'F6'];
  }
  gMajorPentatonic() {
    //G, A, B, D, E;
    return ['G2', 'A2', 'B2', 'D2', 'E2', 'G3', 'A3', 'B3', 'D3', 'E3', 'G4', 'A4', 'B4', 'D4', 'E4', 'G5', 'A5', 'B5', 'D5', 'E5', 'G6'];
  }
  gMinorPentatonic() {
    //G, A#, C, D, F;
    return ['G2', 'A#2', 'C2', 'D2', 'F2', 'G3', 'A#3', 'C3', 'D3', 'F3', 'G4', 'A#4', 'C4', 'D4', 'F4', 'G5', 'A#5', 'C5', 'D5', 'F5', 'G6'];
  }
  aMajorPentatonic() {
    //A, B, C#, E, F#;
    return ['A2', 'B2', 'C#2', 'E2', 'F#2', 'A3', 'B3', 'C#3', 'E3', 'F#3', 'A4', 'B4', 'C#4', 'E4', 'F#4', 'A5', 'B5', 'C#5', 'E5', 'F#5', 'A6'];
  }
  aMinorPentatonic() {
    //A, C, D, E, G
    return ['A2', 'C2', 'D2', 'E2', 'G2', 'A3', 'C3', 'D3', 'E3', 'G3', 'A4', 'C4', 'D4', 'E4', 'G4', 'A5', 'C5', 'D5', 'E5', 'G5', 'A6'];
  }
  bMajorPentatonic() {
    //B, C#, D#, F#, G#
    return ['B2', 'C#2', 'D#2', 'F#2', 'G#2', 'B3', 'C#3', 'D#3', 'F#3', 'G#3', 'B4', 'C#4', 'D#4', 'F#4', 'G#4', 'B5', 'C#5', 'D#5', 'F#5', 'G#5', 'B6'];
  }
  bMinorPentatonic() {
    //B, D, E, F#, A
    return ['B2', 'D2', 'E2', 'F#2', 'A2', 'B3', 'D3', 'E3', 'F#3', 'A3', 'B4', 'D4', 'E4', 'F#4', 'A4', 'B5', 'D5', 'E5', 'F#5', 'A5', 'B6'];
  }
  var sequenceOfNotesC = ['C2', 'D2', 'E2', 'G2', 'A2', 'C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5', 'C6'];
  var sequenceOfNotesD = ['D2', 'E2', 'F#2', 'A2', 'B2', 'D3', 'E3', 'F#3', 'A3', 'B3', 'D4', 'E4', 'F#4', 'A4', 'B4', 'D5', 'E5', 'F#5', 'A5', 'B5', 'D6'];
  var sequenceOfNotesE = ['E2', 'F#2', 'G#2', 'B2', 'C#2', 'E3', 'F#3', 'G#3', 'B3', 'C#3', 'E4', 'F#4', 'G#4', 'B4', 'C#4', 'E5', 'F#5', 'G#5', 'B5', 'C#5', 'E6'];
  var sequenceOfNotesF = ['F2', 'G2', 'A2', 'C2', 'D2', 'F3', 'G3', 'A3', 'C3', 'D3', 'F4', 'G4', 'A4', 'C4', 'D4', 'F5', 'G5', 'A5', 'C5', 'D5', 'F6'];
  var sequenceOfNotesG = ['G2', 'A2', 'B2', 'D2', 'E2', 'G3', 'A3', 'B3', 'D3', 'E3', 'G4', 'A4', 'B4', 'D4', 'E4', 'G5', 'A5', 'B5', 'D5', 'E5', 'G6'];
  var sequenceOfNotesA = ['A2', 'B2', 'C#2', 'E2', 'F#2', 'A3', 'B3', 'C#3', 'E3', 'F#3', 'A4', 'B4', 'C#4', 'E4', 'F#4', 'A5', 'B5', 'C#5', 'E5', 'F#5', 'A6'];
  var sequenceOfNotesB = ['B2', 'C#2', 'D#2', 'F#2', 'G#2', 'B3', 'C#3', 'D#3', 'F#3', 'G#3', 'B4', 'C#4', 'D#4', 'F#4', 'G#4', 'B5', 'C#5', 'D#5', 'F#5', 'G#5', 'B6'];
}*/