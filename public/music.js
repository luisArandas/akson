$(document).ready(function() {
  $('.leftmenutrigger').on('click', function(e) {
    $('.side-nav').toggleClass("open");
    e.preventDefault();
  });
});

var camera, scene, renderer;
var geometry, material, mesh;
var data;

var envelope = new Nexus.Envelope('#envelope_one', {
  'size': [350, 300]
});

var pattern = ["", "A4", "A#4", "D5", "F5", "", "A2", "", "", "A4", "A#4", "D5", "E5", "", "A#2", ""];
var pattern2 = ["1", "", "", "", "", "", "", "", "1", "1", "", "", "", "", "", ""];
var synth;

var distortion = new Tone.Distortion(2.5);
var tremolo = new Tone.Tremolo().start();

var oscilador = new Tone.Oscillator({
  "frequency": 550,
  "volume": -20
}).chain(distortion, tremolo, Tone.Master);

var synth = new Tone.Synth().toMaster()

_init();
//animate();

function _init() {

  socket = io.connect(window.location.origin);
  socket.on('mouse', newDrawing);

  synth = createSynthWithEffects();

  Tone.Transport.bpm.value = 20;
  Tone.Transport.start();

  var seq = new Tone.Sequence(playNote, pattern, "8n");
  seq.start();

  window.addEventListener('mousedown', onMouseDown, false);
  window.addEventListener('mouseup', onMouseUp, false);
  window.addEventListener('resize', onWindowResize, false);

}

/*function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}*/

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
  let vol = new Tone.Volume(-15).toMaster();

  var compressor = new Tone.Compressor(-30, 30).toMaster(); //CHECK THE COMPRESSOR

  let reverb = new Tone.Freeverb(1.0).connect(vol);
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
  return polySynth.connect(vibrato, compressor);
}

function playNote(time, note) {
  if (note != "") {
    synth.triggerAttackRelease(note, "16n");
  }
}

function myFunc() {
  synth.triggerAttackRelease('C8', '8n');
}

function newDrawing() {
  synth.triggerAttackRelease('C6', '10n');
}

/* DESENHAR
//
// Global variables
//
var scene, width, height, camera, renderer;
var mouseIsPressed, mouseX, mouseY, pmouseX, pmouseY;

//
// Initialization of global objects and set up callbacks for mouse and resize
//
function init() {

	// Scene object
	scene = new THREE.Scene();

	// Will use the whole window for the webgl canvas
	width = window.innerWidth;
	height = window.innerHeight;

	// Orthogonal camera for 2D drawing
	camera = new THREE.OrthographicCamera( 0, width, 0, height, -height, height );
	camera.lookAt (new THREE.Vector3 (0,0,0));

	// Renderer will use a canvas taking the whole window
	renderer = new THREE.WebGLRenderer( {antialias: true});
	renderer.sortObjects = false;
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( width, height );

	// Append camera to the page
	document.body.appendChild( renderer.domElement );

	// Set resize (reshape) callback
	window.addEventListener( 'resize', resize );

	// Set up mouse callbacks.
	// Call mousePressed, mouseDragged and mouseReleased functions if defined.
	// Arrange for global mouse variables to be set before calling user callbacks.
	mouseIsPressed = false;
	mouseX = 0;
	mouseY = 0;
	pmouseX = 0;
	pmouseY = 0;
	var setMouse = function () {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}
	renderer.domElement.addEventListener ( 'mousedown', function () {
		setMouse();
		mouseIsPressed = true;
		if (typeof mousePressed !== 'undefined') mousePressed();
	});
	renderer.domElement.addEventListener ( 'mousemove', function () {
		pmouseX = mouseX;
		pmouseY = mouseY;
		setMouse();
		if (mouseIsPressed) {
			if (typeof mouseDragged !== 'undefined') mouseDragged();
		}
		if (typeof mouseMoved !== 'undefined') mouseMoved();
	});
	renderer.domElement.addEventListener ( 'mouseup', function () {
		mouseIsPressed = false;
		if (typeof mouseReleased !== 'undefined') mouseReleased();
	});

	// If a setup function is defined, call it
	if (typeof setup !== 'undefined') setup();

	// First render
	render();
}

//
// Reshape callback
//
function resize() {
	width = window.innerWidth;
	height = window.innerHeight;
	camera.right = width;
	camera.bottom = height;
	camera.updateProjectionMatrix();
	renderer.setSize(width,height);
	render();
}

//
// The render callback
//
function render () {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
};

//------------------------------------------------------------
//
// User code from here on
//
//------------------------------------------------------------

var material; // A line material
var selected; // Object that was picked

function setup () {
	material = new THREE.LineBasicMaterial ( {color:0xffffff, depthWrite:false, linewidth : 4 } );
}

function mousePressed() {
	var point = new THREE.Vector3 (mouseX,mouseY,0);
	var geometry = new THREE.Geometry();
	geometry.vertices.push (point);
	var line = new THREE.Line (geometry, material);
	scene.add (line);
	selected = line;
}

function mouseDragged() {
	var line = selected;
	var point = new THREE.Vector3 (mouseX,mouseY,0);
	var oldgeometry = line.geometry;
	var newgeometry = new THREE.Geometry();
	newgeometry.vertices = oldgeometry.vertices;
	newgeometry.vertices.push (point);
	line.geometry = newgeometry;
}

function mouseReleased() {
}

init();

*/