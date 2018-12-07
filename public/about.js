$(document).ready(function() {
  $('.leftmenutrigger').on('click', function(e) {
    $('.side-nav').toggleClass("open");
    e.preventDefault();
  });
});

var camera, scene, renderer;
var geometry, material, mesh

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;
  scene = new THREE.Scene();

  scene.background = new THREE.Color(000000);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.autoClear = false;
  document.body.appendChild(renderer.domElement);

  window.addEventListener('mousedown', onMouseDown, false);
  window.addEventListener('mouseup', onMouseUp, false);
  window.addEventListener('resize', onWindowResize, false);
}

function animate() {

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onMouseDown(event) {

  event.preventDefault();

  var data = {
    mouseX: 0,
    mouseY: 0
  };

  mouseX = (event.clientX);
  mouseY = (event.clientY);

  socket.emit('mouse', event.clientX);

  oscilador.start();
  Tone.Master.volume.rampTo(0, 0.05);
}

function onMouseUp(event) {
  event.preventDefault();
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

function myFunc() {}

function newDrawing() {
  synth.triggerAttackRelease('C2', '4n');
}