//https://threejs.org/examples/#webgl_interactive_cubes

$(document).ready(function() {
  $('.leftmenutrigger').on('click', function(e) {
    $('.side-nav').toggleClass("open");
    e.preventDefault();
  });
});

var camera, scene, renderer;
var geometry, material, mesh;
var data;

var synth = new Tone.Synth().toMaster()

init();
animate();

function init() {

  socket = io.connect(window.location.origin);
  socket.on('mouse', newDrawing);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  material = new THREE.MeshBasicMaterial({

    flatShading: true,
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    wireframe: true,
    wireframeLinewidth: 2,
    wireframeLinejoin: 'round',
    wireframeLinecap: 'round'
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener("mousedown", onMouseDown, false);
}

function animate() {

  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  var corFundo = Math.random() * (0.15 - 0) + 0;
  scene.background = new THREE.Color(corFundo, corFundo, corFundo);
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

  socket.emit('mouse', data);
  synth.triggerAttackRelease('C4', '4n');
}

function newDrawing(data) {
  console.log("receiving mouseX =" + mouseX);
  console.log("receiving mouseY =" + mouseY);
  synth.triggerAttackRelease('C2', '4n');
}