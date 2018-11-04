var socket;

function setup() {
  createCanvas(450, 450);
  background(51);

  socket = io.connect(window.location.origin);
  socket.on('mouse', newDrawing);
}

function draw() {

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
}