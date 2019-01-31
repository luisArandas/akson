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