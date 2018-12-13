//https://threejs.org/examples/#webgl_interactive_cubes
//https://threejs.org/examples/#webgl_clipping_advanced
//CHECK THE MODAL ON BUTTON CLICK
//DESENHAR NUM PAPEL
//VER OS FAVICONS
//MAKE AN ABOUT

$(document).ready(function() {
  $('.leftmenutrigger').on('click', function(e) {
    $('.side-nav').toggleClass("open");
    e.preventDefault();
  });
});


var container;
var camera, scene, raycaster, renderer, parentTransform, sphereInter;
var radius = 100;
var theta = 0;
var teste;

var variavelUm = 1;
var variavelDois = 400;

var x = 1;


init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
  //   camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  var material = new THREE.LineBasicMaterial({
    color: 0xffffff
  });

  var quadradoUm = new THREE.PlaneGeometry(5, variavelDois, 0);
  var quadradoDois = new THREE.PlaneGeometry(5, variavelDois, 0);
  var quadradoTres = new THREE.PlaneGeometry(5, variavelDois, 0);
  var quadradoQuatro = new THREE.PlaneGeometry(5, variavelDois, 0);
  var quadradoCinco = new THREE.PlaneGeometry(5, variavelDois, 0);
  var quadradoSeis = new THREE.PlaneGeometry(5, variavelDois, 0);
  var planeUm = new THREE.Mesh(quadradoUm, material);
  var planeDois = new THREE.Mesh(quadradoDois, material);
  var planeTres = new THREE.Mesh(quadradoTres, material);
  var planeQuatro = new THREE.Mesh(quadradoQuatro, material);
  var planeCinco = new THREE.Mesh(quadradoCinco, material);
  var planeSeis = new THREE.Mesh(quadradoSeis, material);

  planeUm.position.set(10, -100, 1);
  planeDois.position.set(25, -100, 1);
  planeTres.position.set(50, -100, 1);
  planeQuatro.position.set(75, -100, 1);
  planeCinco.position.set(100, -100, 1);
  planeSeis.position.set(125, -100, 1);
  scene.add(planeUm, planeDois, planeTres, planeQuatro, planeCinco, planeSeis);

  var lineGeometry = new THREE.BufferGeometry();
  var points = [];
  var point = new THREE.Vector3();
  var direction = new THREE.Vector3();
  for (var i = 0; i < 150; i++) {
    //direction.x = 1;
    //direction.y = 0;
    direction.z = 5;
    point.add(direction);
    points.push(point.x, point.y, point.z);
  }
  lineGeometry.addAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  parentTransform = new THREE.Object3D();

  var teste = [];
  teste.length = 150;
  var object;
  for (var i = 0; i < teste.length; i++) {
    object = teste[i];
    object = new THREE.Line(lineGeometry, material);
    object.position.x = 1;
    object.position.y = variavelUm;
    object.position.z = Math.random() * 400 - 200;
    object.rotation.x = 1;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;
    parentTransform.add(object);
  }
  scene.add(parentTransform);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);

  document.addEventListener("keydown", function(event) {
    if (event.which == "81") {
      var children = parentTransform.children;
      children.position(10, 10, 10);
      /*  for (var i = children.length; i < 150; i++) {
          children[i].rotation.y = 1;
          console.log("teste");*/

      //}
    }

    if (event.which == "32") {
      var numeroRandom = Math.floor((Math.random() * 10) + 1);
      console.log(numeroRandom);
      //ifs random
      if (numeroRandom = 0) {
        planeUm.position.set(25, -100, 10);
        planeDois.position.set(25, -100, 10);
        planeTres.position.set(50, -100, 10);
        planeQuatro.position.set(75, -100, 10);
        planeCinco.position.set(100, -100, 10);
        planeSeis.position.set(125, -100, 10);
      }
      if (numeroRandom = 1) {
        planeUm.rotation.set(25, -100, 10);
        planeDois.rotation.set(25, -100, 10);
        planeTres.rotation.set(50, -100, 10);
        planeQuatro.rotation.set(75, -100, 10);
        planeCinco.rotation.set(100, -100, 10);
        planeSeis.rotation.set(125, -100, 10);
      }
      if (numeroRandom = 2) {
        //GLITCH
      }
      if (numeroRandom = 3) {

      }
      if (numeroRandom = 4) {

      }
      if (numeroRandom = 5) {

      }
      if (numeroRandom = 6) {

      }
      if (numeroRandom = 7) {

      }
      if (numeroRandom = 8) {

      }
      if (numeroRandom = 9) {

      }
      if (numeroRandom = 10) {

      }
    }
  });
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var corFundo = Math.random() * (0.15 - 0) + 0;
  scene.background = new THREE.Color(corFundo, corFundo, corFundo);
  theta += 0.2;
  variavelUm += 0.5;
  camera.position.x = radius * Math.cos(THREE.Math.degToRad(theta));
  camera.position.y = radius * Math.cos(THREE.Math.degToRad(theta));
  camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
  camera.lookAt(scene.position);
  camera.updateMatrixWorld();
  renderer.render(scene, camera);

}

/*
var camera, scene, renderer;
var geometry, material, mesh;
var data;
var glitchPass;

var pattern = ["", "A4", "A#4", "D5", "F5", "", "A2", "", "", "A4", "A#4", "D5", "E5", "", "A#2", ""];
var pattern2 = ["1", "", "", "", "", "", "", "", "1", "1", "", "", "", "", "", ""];
var synth;

var distortion = new Tone.Distortion(0.6);
var tremolo = new Tone.Tremolo().start();

var oscilador = new Tone.Oscillator({
  "frequency": 550,
  "volume": -20
}).chain(distortion, tremolo, Tone.Master);

var synth = new Tone.Synth().toMaster()

init();
animate();

function init() {

  socket = io.connect(window.location.origin);
  socket.on('mouse', newDrawing);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;

  scene = new THREE.Scene();
  //scene.fog = new THREE.Fog(0x000000, 1, 1000);

  geometry = new THREE.BoxGeometry(2, 2, 2);
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
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.autoClear = false;
  document.body.appendChild(renderer.domElement);

  window.addEventListener('mousedown', onMouseDown, false);
  window.addEventListener('mouseup', onMouseUp, false);
  window.addEventListener('resize', onWindowResize, false);


  composer = new THREE.EffectComposer(renderer);
  composer.addPass(new THREE.RenderPass(scene, camera));
  glitchPass = new THREE.GlitchPass();
  glitchPass.renderToScreen = true;
  glitchPass.goWild = true;
  composer.addPass(glitchPass);

  synth = createSynthWithEffects();

  Tone.Transport.bpm.value = 67;
  Tone.Transport.start();

  var seq = new Tone.Sequence(playNote, pattern, "8n");
  seq.start();
}

function animate() {

  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  var corFundo = Math.random() * (0.15 - 0) + 0;
  scene.background = new THREE.Color(corFundo, corFundo, corFundo);
  composer.render();
  //renderer.render(scene, camera);
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
  oscilador.stop();
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  composer.render();
  //renderer.render(scene, camera);
}

function myFunc() {
  synth.triggerAttackRelease('C4', '8n')
}

function createSynthWithEffects() {
  let vol = new Tone.Volume(-12).toMaster();

  let reverb = new Tone.Freeverb(0.9).connect(vol);
  reverb.wet.value = 0.1;

  let delay = new Tone.FeedbackDelay(0.304, 0.5).connect(reverb);
  delay.wet.value = 0.1;

  let vibrato = new Tone.Vibrato(5, 0.2).connect(delay);

  let polySynth = new Tone.PolySynth(3, Tone.Synth, {
    "oscillator": {
      "type": "sine"
    },
    "envelope": {
      "attack": 0.01,
      "decay": 0.1,
      "sustain": 0.2,
      "release": 4,
    }
  });

  return polySynth.connect(vibrato);
}

function playNote(time, note) {
  if (note != "") {
    synth.triggerAttackRelease(note, "16n");
  }
}

function newDrawing() {
  synth.triggerAttackRelease('C2', '4n');
}
*/