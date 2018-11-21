var socket;
// FAZER FREQUENCY MODULATION <---------

var a = 50;
var b = 120;

var noise;
var delay;
var filter;


function preload() {}

function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);
  socket = io.connect(window.location.origin);
  socket.on('mouse', newDrawing);

  noise = new p5.Noise();
  delay = new p5.Delay();
  filter = new p5.BandPass();

  noise.amp(0.2);
  delay.process(noise, .12, .7, 2300);
  delay.setType('pingPong');
  delay.amp(0.9);
  noise.connect(filter);
  noise.start();

}

function draw() {
  var r = random(50);
  background(r);
}

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
  //FAZER O BANDPASS FREQUENCY BASEADO NO MOUSEX
  var freq = map(data.x, 0, width, 20, 10000);
  filter.freq(freq);
  var res = map(data.y, 0, height, 1, .01);
  filter.res(res);
}