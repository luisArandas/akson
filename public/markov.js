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
var modalOne = document.getElementById('modalScale');


function scaleButtons(data) {
  /*if (document.getElementById(data).style.background != "white") {
    document.getElementById(data).style.background = "white";
    document.getElementById(data).style.color = "black";
  } else if (document.getElementById(data).style.background == "white") {
    document.getElementById(data).style.background = "black";
    document.getElementById(data).style.color = "white";
  }*/
  if (data == "scale") {
    modalOne.style.display = "block";
    closeGui();
    consoleLog(); // Do some stuff.
  }

}

function consoleLog(v) {
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "This doesn't work right now, sorry.";
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
}

/*
class Ellipse {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }
  get area() { return Math.PI * this._width * this._height; }
  set width(w) { this._width = w; }
  set height(h) { this._height = h; }
}
class Circle extends Ellipse {
  constructor(radius) {
    super(radius, radius); //functions and methods of parent
  }
  set radius(r) { super.width = r; super.height = r; }
}
// create a circle
var c = new Circle(4)
// returns: Circle {_width: 4, _height: 4}
c.radius = 2
// c is now: Circle {_width: 2, _height: 2}
c.area
// returns: 12.566370614359172
c.radius = 5
c.area
// returns: 78.53981633974483
*/

class teste {
  constructor(radius, ok) {
    this.radius = radius;
    this.ok = ok;
  }
  circleRadius() {
    return "yes";
  }
}
// use it
var c = new teste("ok", "rabo");
// returns: Circle {radius: 4}
//console.log(c.ok);


class ScalePlaying {
  constructor(type, state) {
    this.type = type;
    this.state = state;
  }
  cMajorPentatonic() {
    //C, D, E, G, A;
    return ['C2', 'D2', 'E2', 'G2', 'A2', 'C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5', 'C6'];
  }
  cMinorPentatonic() {
    //C, D#, F, G, A#;
    return ['C2', 'D#2', 'F2', 'G2', 'A#2', 'C3', 'D#3', 'F3', 'G3', 'A#4', 'C4', 'D#4', 'F4', 'G4', 'A#4', 'C5', 'D#5', 'F5', 'G5', 'A#5', 'C6'];
  }
  cMajor() {
    //C, D, E, F, G, A, B
    return ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'];
  }
  cMinor() {
    //C, D#, F, G, A#
    return ['C2', 'D#2', 'F2', 'G2', 'A#2', 'C3', 'D#3', 'F3', 'G3', 'A#3', 'C4', 'D#4', 'F4', 'G4', 'A#4', 'C5', 'D#5', 'F5', 'G5', 'A#5', 'C6'];
  }
  cHarmonicMinor() {
    //C, D, D#, F, G, G#, B
    return ['C2', 'D2', 'D#2', 'F2', 'G2', 'G#2', 'B2', 'C3', 'D3', 'D#3', 'F3', 'G3', 'G#3', 'B3', 'C4', 'D4', 'D#4', 'F4', 'G4', 'G#4', 'B4', 'C5', 'D5', 'D#5', 'F5', 'G5', 'G#5', 'B5', 'C6'];
  }
  cMelodicMinor() {
    //C, D, D#, F, G, A, B
    return ['C2', 'D2', 'D#2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'D#3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'D#4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'D#5', 'F5', 'G5', 'A5', 'B5', 'C6'];
  }
  cAdonaiMalakh() {
    //C, C#, D, D#, F, G, A, A#
    return ['C2', 'C#2', 'D2', 'D#2', 'F2', 'G2', 'A2', 'A#2', 'C3', 'C#3', 'D3', 'D#3', 'F3', 'G3', 'A3', 'A#3', 'C4', 'C#4', 'D4', 'D#4', 'F4', 'G4', 'A4', 'A#4', 'C5', 'C#5', 'D5', 'D#5', 'F5', 'G5', 'A5', 'A#5', 'C6'];
  }
  cHungarianMajor() {
    //C, D#, E, F#, G, A, A#
    return ['C2', 'D#2', 'E2', 'F#2', 'G2', 'A2', 'A#2', 'C3', 'D#3', 'E3', 'F#3', 'G3', 'A3', 'A#3', 'C4', 'D#4', 'E4', 'F#4', 'G4', 'A4', 'A#4', 'C5', 'D#5', 'E5', 'F#5', 'G5', 'A5', 'A#5', 'C6'];
  }
  cHirajoshiJapan() {
    //C, D, D#, G, G#
    return ['C2', 'D2', 'D#2', 'G2', 'G#2', 'C3', 'D3', 'D#3', 'G3', 'G#3', 'C4', 'D4', 'D#4', 'G4', 'G#4', 'C5', 'D5', 'D#5', 'G5', 'G#5', 'C6'];
  }
  cIonian() {
    //C, D, E, F, G, A, B
    return ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'];
  }
  cLocrian() {
    //C, Db, Eb, F, Gb, Ab, Bb
    return ['C2', 'C#2', 'D#2', 'F2', 'F#2', 'G#2', 'A#2', 'C3', 'C#3', 'D#3', 'F3', 'F#3', 'G#3', 'A#3', 'C4', 'C#4', 'D#4', 'F4', 'F#4', 'G#4', 'A#4', 'C5', 'C#5', 'D#5', 'F5', 'F#5', 'G#5', 'A#5', 'C6'];
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