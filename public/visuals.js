$(document).ready(function() {});
//power de mais reduzir

var container;
var camera, scene, raycaster, renderer, parentTransform, sphereInter;
var radius = 100;
var theta = 0;
var glitchPass;
var composer;

init();
animate();
play();

function init() {

  socket = io.connect(window.location.origin);
  socket.on('mouse', newDrawing);

  container = document.createElement('div');
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
  //   camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);


  var planosCamara = new THREE.BoxGeometry(1, 10, 1);
  var materialum = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  var planoCamaraUm = new THREE.Mesh(planosCamara, materialum);
  var planoCamaraDois = new THREE.Mesh(planosCamara, materialum);
  var planoCamaraTres = new THREE.Mesh(planosCamara, materialum);
  scene.add(camera);

  var material = new THREE.LineBasicMaterial({
    color: 0xffffff
  });

  var lineGeometry = new THREE.BufferGeometry();
  var points = [];
  var point = new THREE.Vector3();
  var direction = new THREE.Vector3();
  for (var i = 0; i < 150; i++) {
    direction.x = 0;
    direction.y = 0;
    direction.z = 5;
    point.add(direction);
    points.push(point.x, point.y, point.z);
  }
  lineGeometry.addAttribute('position', new THREE.Float32BufferAttribute(points, 3));

  parentTransform = new THREE.Object3D();

  for (var i = 0; i < 150; i++) {
    var object;
    object = new THREE.Line(lineGeometry, material);
    object.position.x = 1;
    object.position.y = 1; //Math.floor(Math.random() * 6) + 1;
    object.position.z = Math.random() * 400 - 200;
    object.rotation.x = 1;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;
    parentTransform.add(object);
  }
  scene.add(parentTransform);

  var materialPainel = new THREE.LineBasicMaterial({
    color: 0xffffff
  });

  parentTransformDois = new THREE.Object3D();

  for (var i = 0; i < 5; i++) {
    var painel;
    painel = new THREE.PlaneGeometry(5, 400, 0);
    var plane = new THREE.Mesh(painel, materialPainel);
    plane.position.set(Math.floor(Math.random() * 100) + 1, -100, 1);
    parentTransformDois.add(plane);
  }
  scene.add(parentTransformDois);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);


  composer = new THREE.EffectComposer(renderer);
  composer.addPass(new THREE.RenderPass(scene, camera));
  composer.renderToScreen = true;
  glitchPass = new THREE.GlitchPass();
  glitchPass.renderToScreen = false;
  glitchPass.goWild = true;
  composer.addPass(glitchPass);
  //CHECK OTHER EFFECTS NA LINHA DAS TECLAS DE BAIXO
  //METER OS IFS SE FUNCIONA CARREGAR DUAS VEZES

  document.addEventListener("keydown", function(event) {
    if (event.which == "81") {
      console.log("Q");
      camera.add(planoCamaraUm);
      planoCamaraUm.position.set(0, 0, -3);
      parentTransform.children.forEach(function(v) {
        v.rotation.y = 1;
      });
    }
    if (event.which == "87") {
      console.log("W");
      camera.remove(planoCamaraUm);
      parentTransformDois.children.forEach(function(v) {
        v.position.set(Math.floor(Math.random() * 100) + 1, -100, 1);
      });
    }
    if (event.which == "69") {
      console.log("E");
      var render = function() {
        //requestAnimationFrame(render);
        //WORKS
        //camera.position.x = 1;
        //camera.position.y = 1;
        //camera.position.z = 1;
        //renderer.render(scene, camera);
      };
      render();
    }
    if (event.which == "82") {
      console.log("R, POE GLITCH");
      glitchPass.renderToScreen = true;
    }
    if (event.which == "84") {
      console.log("T, TIRA O GLITCH");
      glitchPass.renderToScreen = false;
    }
    if (event.which == "89") {
      console.log("Y");
      camera.add(planoCamaraDois);
      planoCamaraDois.scale.x = 6;
      planoCamaraDois.position.set(0, 4.5, -3);
    }
    if (event.which == "85") {
      console.log("U");
    }
    if (event.which == "73") {
      console.log("I");
    }
    if (event.which == "79") {
      console.log("O");
    }
    if (event.which == "80") {
      console.log("P");
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
  parentTransformDois.children.forEach(function(v) {
    v.material.color.setRGB(corFundo, corFundo, corFundo);
  });
  //scene.background = new THREE.Color(corFundo, corFundo, corFundo);
  theta += 0.2;
  camera.position.x = radius * Math.cos(THREE.Math.degToRad(theta));
  camera.position.y = radius * Math.cos(THREE.Math.degToRad(theta));
  camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
  camera.lookAt(scene.position);
  camera.updateMatrixWorld();
  renderer.render(scene, camera);
  composer.render();
}

function newDrawing() {}

function play() {
  droneSynth = {
    fm: new Tone.FMOscillator(100, "sawtooth", "sawtooth").start(),
    fm2: new Tone.FMOscillator(112.5, "sawtooth", "sawtooth").start(),
    vol: new Tone.Volume(-Infinity),
    filter: new Tone.Filter(100, "bandpass"),
    filterFeedback: new Tone.FeedbackCombFilter(0, 0), //default é 0.1 e 0.5 delayTime e Resonance nao ha nada mais interessante neste
    vibrato: new Tone.Vibrato(5, 0.1), //default maxDelay 0.0.5 frequency 5 depth 0.1 e type sine;
    ppdelay: new Tone.PingPongDelay(0.25, 1), //defaults delayTime 0.25 maxDelayTime 1;
    verb: new Tone.Freeverb(),
    autopan: new Tone.AutoPanner(), //frequency 1 default sine  default depth 1
    compressor: new Tone.Compressor(-30, 10)
  }

  droneSynth.fm.connect(droneSynth.filter);
  droneSynth.fm2.connect(droneSynth.filter);
  droneSynth.fm.connect(droneSynth.filterFeedback);
  droneSynth.fm2.connect(droneSynth.filterFeedback);
  droneSynth.fm.connect(droneSynth.vibrato);
  droneSynth.fm2.connect(droneSynth.vibrato);
  droneSynth.fm.connect(droneSynth.ppdelay);
  droneSynth.fm2.connect(droneSynth.ppdelay);
  droneSynth.fm.connect(droneSynth.autopan);
  droneSynth.fm2.connect(droneSynth.autopan);
  droneSynth.filter.chain(droneSynth.compressor, droneSynth.vol, droneSynth.verb, Tone.Master);
  droneSynth.vol.volume.rampTo(-20, 1);
  droneSynth.fm.harmonicity.value = 4;
  droneSynth.fm2.harmonicity.value = 4;

}