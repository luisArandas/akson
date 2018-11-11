var socket;
var osc;

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(51);
  socket = io.connect(window.location.origin);
  socket.on('mouse', newDrawing);

  osc = new p5.TriOsc();
  osc.amp(0.5);
  osc.start();

}

function draw() {}

function mouseDragged() {

  console.log('Sending: ' + mouseX + ',' + mouseY);
  //mensagem que vou enviar
  var data = {
    x: mouseX,
    y: mouseY
  }
  //enviar a mensagem, 'mouse' é o nome
  socket.emit('mouse', data);

  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 50, 50);
}

function newDrawing(data) {
  noStroke();
  fill(255, 0, 0);
  ellipse(data.x, data.y, 50, 50);
  //teste a enviar valores para o som
  var freq = map(data.x, 0, width, 40, 880);
  osc.freq(freq);
  var amp = map(data.y, 0, height, 1, .01);
  osc.amp(amp);
}