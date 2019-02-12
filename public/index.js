/**
 * @author Luis Arandas  http://luisarandas.org
 */


/*
var windowWidth = $(window).width(),
  windowHeight = $(window).height();
var isMobile = navigator.userAgent.match(/mobile/i);
var webGLTrue = false;

if (window.WebGLRenderingContext) {
  webGLTrue = true;
}

if (isMobile) {
  $('body').addClass('mobile');
} else if (!isMobile) {
  $('body').addClass('desktop');
}
*/

$(document).ready(function() {
  if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
  };
  if (detectmob() === false) { //&& onMouseDown() === true) {
  };
});

$(document).ready(function() {
  $(".introLoadTimer").fadeIn("slow", function() {
    $(".introLoadTimer").delay(3000).fadeOut(2500);
  });
  //console.clear(); ADD THIS
  console.log("volume " + Tone.Master.volume.value);
});


//https://github.com/yiwenl/Alfrid
var camera,
  scene,
  light,
  container,
  raycaster,
  renderer,
  parentTransform,
  parentTransformDois,
  parentTransformTres,
  parentTransformQuatro,
  parentTransformCinco,
  parentTransformCincoDois,
  parentTransformCincoTres,
  parentTransformSeis,
  parentTransformSete,
  sphereInter;
var radius = 100;
var theta = 0;
var sideBar = false;
var mouse = new THREE.Vector2(),
  INTERSECTED;

var glitchPass = new THREE.GlitchPass();
var afterimagePass = new THREE.AfterimagePass();
var effectSobel;
var pixelPass, params;

var composerOne;
var composerTwo;
var composerThree;
var composerFour;

var whichVisuals;

//ESTAMOS EM PENTATONICA MAIOR
var sequenceOfNotesC = ['C2', 'D2', 'E2', 'G2', 'A2', 'C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5', 'C6'];
var sequenceOfNotesD = ['D2', 'E2', 'F#2', 'A2', 'B2', 'D3', 'E3', 'F#3', 'A3', 'B3', 'D4', 'E4', 'F#4', 'A4', 'B4', 'D5', 'E5', 'F#5', 'A5', 'B5', 'D6'];
var sequenceOfNotesE = ['E2', 'F#2', 'G#2', 'B2', 'C#2', 'E3', 'F#3', 'G#3', 'B3', 'C#3', 'E4', 'F#4', 'G#4', 'B4', 'C#4', 'E5', 'F#5', 'G#5', 'B5', 'C#5', 'E6'];
var sequenceOfNotesF = ['F2', 'G2', 'A2', 'C2', 'D2', 'F3', 'G3', 'A3', 'C3', 'D3', 'F4', 'G4', 'A4', 'C4', 'D4', 'F5', 'G5', 'A5', 'C5', 'D5', 'F6'];
var sequenceOfNotesG = ['G2', 'A2', 'B2', 'D2', 'E2', 'G3', 'A3', 'B3', 'D3', 'E3', 'G4', 'A4', 'B4', 'D4', 'E4', 'G5', 'A5', 'B5', 'D5', 'E5', 'G6'];
var sequenceOfNotesA = ['A2', 'B2', 'C#2', 'E2', 'F#2', 'A3', 'B3', 'C#3', 'E3', 'F#3', 'A4', 'B4', 'C#4', 'E4', 'F#4', 'A5', 'B5', 'C#5', 'E5', 'F#5', 'A6'];
var sequenceOfNotesB = ['B2', 'C#2', 'D#2', 'F#2', 'G#2', 'B3', 'C#3', 'D#3', 'F#3', 'G#3', 'B4', 'C#4', 'D#4', 'F#4', 'G#4', 'B5', 'C#5', 'D#5', 'F#5', 'G#5', 'B6'];
var scalePlaying;

var isSceneOne = true;
var isSceneTwo = false;
var isSceneThree = false;
var isSceneFour = false;
var isSceneFive = false;
var isSceneSix = false;
var isSceneSeven = false;
var isSceneSeven = false;
var isSceneEight = false;
var isSceneNine = false;
var isSceneTen = false;

var hideShow = false;

var color = "#0000FF";

var glitchVarOne;
var glitchVarTwo;
var glitchVarThree;

var renderPostOne = false;
var renderPostTwo = false;
var renderPostThree = false;
var renderPostFour = false;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var randomSequenceOfNotes;

init();
animate();

function init() {

  socket = io.connect(window.location.origin);
  socket.on('mouse', newDrawing);
  socket.on('socketid', function(socketid) {
    console.log(socketid + ' Key');
    var div = document.getElementById('botRightPage');
    div.innerHTML += 'Key - ' + socketid + '<br>' + '//////////////////////////' + '<br>';
  });
  socket.on('socketnumber', function(connections) {
    console.log("There are currently " + connections + " connections");
    var div = document.getElementById('botRightPage');
    div.innerHTML += "There are currently " + connections + " connections" + '<br>' + '//////////////////////////' + '<br>';
  });

  container = document.createElement('div');
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
  //camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
  camera.position.z = 1000;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.add(camera);
  raycaster = new THREE.Raycaster();
  raycaster.linePrecision = 3;

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('webgl2');
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    context: context,
    antialias: true
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.body.appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', () => {
    render();
    orbitControls();
  });

  function orbitControls() {
    if (isSceneTwo == true) {
      autoFilterOne.frequency.value = event.clientX;
      console.log(autoFilterOne.frequency.value);
    }
  }
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enabled = false;

  light = new THREE.DirectionalLight(0xd3d3d3, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);
  var ambientLight = new THREE.AmbientLight(0xd3d3d3, 0.1);
  scene.add(ambientLight);
  /*var light = new THREE.SpotLight(0xd3d3d3, 3);
  light.position.set(5, 5, 2);
  light.castShadow = true;
  light.shadow.mapSize.width = 10000;
  light.shadow.mapSize.height = light.shadow.mapSize.width;
  light.penumbra = 0.5;
  var lightBack = new THREE.PointLight(0xd3d3d3, 1);
  lightBack.position.set(0, -3, -1);
  scene.add(light);
  scene.add(lightBack);
  var rectSize = 2;
  var intensity = 100;
  var rectLight = new THREE.RectAreaLight(0x0FFFFF, intensity, rectSize, rectSize);
  rectLight.position.set(0, 0, 1);
  rectLight.lookAt(0, 0, 0);
  scene.add(rectLight)

  rectLightHelper = new THREE.RectAreaLightHelper(rectLight);
  //scene.add( rectLightHelper );*/


  parentTransform = new THREE.Object3D();
  for (var i = 0; i < 90; i++) {
    var geometry = new THREE.BoxGeometry(10, 1500, 10);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0x5f5f5f,
      morphTargets: true,
      //wireframe: true
    }));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    //object.rotation.y = Math.random() * 2 * Math.PI;
    //object.rotation.z = Math.random() * 2 * Math.PI;

    //object.rotation.z = Math.PI / 2;
    parentTransform.add(object);

  }
  scene.add(parentTransform);

  parentTransformDois = new THREE.Object3D();
  var vertices = new THREE.DodecahedronGeometry(50).vertices;
  for (var i = 0; i < vertices.length; i++) {
    //vertices[ i ].add( randomPoint().multiplyScalar( 2 ) ); // wiggle the points
  }
  var pointsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
    alphaTest: 0.5
  });
  var pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
  var points = new THREE.Points(pointsGeometry, pointsMaterial);
  parentTransformDois.add(points);

  var meshMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    opacity: 0.5,
    transparent: true
  });
  var meshGeometry = new THREE.ConvexBufferGeometry(vertices);
  var mesh = new THREE.Mesh(meshGeometry, meshMaterial);
  mesh.material.side = THREE.BackSide; // back faces
  mesh.renderOrder = 0;
  parentTransformDois.add(mesh);
  var mesh = new THREE.Mesh(meshGeometry, meshMaterial.clone());
  mesh.material.side = THREE.FrontSide; // front faces
  mesh.renderOrder = 1;
  parentTransformDois.add(mesh);


  parentTransformTres = new THREE.Object3D();
  for (var i = 0; i < 90; i++) {
    var geometry = new THREE.BoxGeometry(50, 500, 50);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0x5f5f5f,
      //wireframe: true
    }));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    //  object.rotation.y = Math.random() * 2 * Math.PI;
    //  object.rotation.z = Math.random() * 2 * Math.PI;
    parentTransformTres.add(object);
  }

  parentTransformQuatro = new THREE.Object3D();
  for (var i = 0; i < 90; i++) {
    var geometry = new THREE.BoxGeometry(10, 100, 10);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0x5f5f5f,
      //wireframe: true
    }));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    //object.rotation.y = Math.random() * 2 * Math.PI;
    //object.rotation.z = Math.random() * 2 * Math.PI;
    parentTransformQuatro.add(object);
  }

  parentTransformCinco = new THREE.Object3D();
  parentTransformSeis = new THREE.Object3D();
  parentTransformSete = new THREE.Object3D();

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
  var material = new THREE.LineBasicMaterial({
    color: 0xffffff
  });
  for (var i = 0; i < 150; i++) {
    var object;
    object = new THREE.Line(lineGeometry, material);
    object.position.x = 1;
    object.position.y = 1; //Math.floor(Math.random() * 6) + 1;
    object.position.z = Math.random() * 400 - 200;
    object.rotation.x = 1;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;
    parentTransformSete.add(object);
  }

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousedown', onMouseDown, false);
  window.addEventListener('mouseup', onMouseUp, false);
  window.addEventListener("touchstart", handleStart, false);
  document.addEventListener('mousemove', onDocumentMouseMove, false);


  /*effectBleach.uniforms["opacity"].value = 0.95;
  effectSepia.uniforms["amount"].value = 0.9;
  effectVignette.uniforms["offset"].value = 0.95;
  effectVignette.uniforms["darkness"].value = 1.6;
*/

  composerOne = new THREE.EffectComposer(renderer);
  composerOne.addPass(new THREE.RenderPass(scene, camera));
  composerOne.addPass(glitchPass);

  composerTwo = new THREE.EffectComposer(renderer);
  composerTwo.addPass(new THREE.RenderPass(scene, camera));
  composerTwo.addPass(afterimagePass);

  composerThree = new THREE.EffectComposer(renderer);
  composerThree.addPass(new THREE.RenderPass(scene, camera));
  effectSobel = new THREE.ShaderPass(THREE.SobelOperatorShader);
  effectSobel.uniforms.resolution.value.x = window.innerWidth;
  effectSobel.uniforms.resolution.value.y = window.innerHeight;
  composerThree.addPass(effectSobel);

  composerFour = new THREE.EffectComposer(renderer);
  composerFour.addPass(new THREE.RenderPass(scene, camera));
  pixelPass = new THREE.ShaderPass(THREE.PixelShader);
  pixelPass.uniforms.resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
  pixelPass.uniforms.resolution.value.multiplyScalar(window.devicePixelRatio);
  params = {
    pixelSize: 16,
    postprocessing: true
  };
  pixelPass.uniforms.pixelSize.value = params.pixelSize;
  composerFour.addPass(pixelPass);


  glitchPass.renderToScreen = false;
  afterimagePass.renderToScreen = false;
  effectSobel.renderToScreen = false;
  pixelPass.renderToScreen = false;


  /*
  Q_81 W_87 E_69 R_82 T_84 Y_89 U_85 I_73 O_79 P_80
  32 == SPACE
  */

  var div = document.getElementById('botLeftPage');
  div.innerHTML += "We are currently in C" + '<br>';
  scalePlaying = sequenceOfNotesC;

  document.addEventListener("keydown", function(event) {
    if (event.which == "32") {
      if (sideBar == false) {
        //I don't think I need this anymore;
      }
      if (sideBar == true) {}
      if (sideBar == true) {
        sideBar = false;
      } else {
        sideBar = true;
      }
    }
    if (event.which == "81") {
      console.log("Q");
      isSceneOne = true;
      isSceneTwo = false;
      isSceneThree = false;
      isSceneFour = false;
      isSceneFive = false;
      isSceneSix = false;
      isSceneSeven = false;
      isSceneSeven = false;
      isSceneEight = false;
      isSceneNine = false;
      isSceneTen = false;

      camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
      afterimagePass.renderToScreen = false;
      effectSobel.renderToScreen = false;
      pixelPass.renderToScreen = false;
      glitchPass.renderToScreen = false;

      controls.enabled = false;

      scene.add(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformTres);
      scene.remove(parentTransformQuatro);
      scene.remove(parentTransformCinco);
      scene.remove(parentTransformSeis);
      scene.remove(parentTransformSete);
    }
    if (event.which == "87") {
      console.log("W");
      isSceneOne = false;
      isSceneTwo = true;
      isSceneThree = false;
      isSceneFour = false;

      controls.enabled = true;

      camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
      afterimagePass.renderToScreen = false;
      effectSobel.renderToScreen = false;
      pixelPass.renderToScreen = false;
      glitchPass.goWild = false;
      if (glitchPass.renderToScreen == false) {
        renderPostOne = true;
        glitchPass.renderToScreen = true;
      }
      scene.add(parentTransformDois);
      scene.remove(parentTransform);
      scene.remove(parentTransformTres);
      scene.remove(parentTransformQuatro);
      scene.remove(parentTransformCinco);
      scene.remove(parentTransformSeis);
      scene.remove(parentTransformSete);
    }
    if (event.which == "69") {
      console.log("E");
      isSceneOne = false;
      isSceneTwo = false;
      isSceneThree = true;
      isSceneFour = false;

      camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
      afterimagePass.renderToScreen = false;
      effectSobel.renderToScreen = false;
      pixelPass.renderToScreen = false;
      glitchPass.renderToScreen = false;

      scene.add(parentTransformTres);
      scene.remove(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformQuatro);
      scene.remove(parentTransformCinco);
      scene.remove(parentTransformSeis);
      scene.remove(parentTransformSete);
    }
    if (event.which == "82") {
      console.log("R")
      isSceneOne = false;
      isSceneTwo = false;
      isSceneThree = false;
      isSceneFour = true;

      camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
      afterimagePass.renderToScreen = false;
      effectSobel.renderToScreen = false;
      pixelPass.renderToScreen = false;
      glitchPass.goWild = true;
      if (glitchPass.renderToScreen == false) {
        renderPostOne = true;
        glitchPass.renderToScreen = true;
      }
      scene.add(parentTransformQuatro);
      scene.remove(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformTres);
      scene.remove(parentTransformCinco);
      scene.remove(parentTransformSeis);
      scene.remove(parentTransformSete);
    }
    if (event.which == "84") {
      console.log("T");
      isSceneOne = false;
      isSceneTwo = false;
      /* ----------------------------------------------------------------------------------------------------------------------------*/
      scene.remove(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformTres);
      scene.remove(parentTransformQuatro);
      scene.remove(parentTransformSeis);
      scene.remove(parentTransformSete);
    }
    if (event.which == "89") {
      console.log("Y");
      isSceneOne = false;
      isSceneTwo = false;
      camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
      scene.add(parentTransformSeis);
      scene.remove(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformTres);
      scene.remove(parentTransformQuatro);
      scene.remove(parentTransformCinco);
      scene.remove(parentTransformSete);
    }
    if (event.which == "85") {
      console.log("U");
      changeScene();
      isSceneOne = false;
      isSceneTwo = false;
      camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
      scene.add(parentTransformSete);
      scene.remove(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformTres);
      scene.remove(parentTransformQuatro);
      scene.remove(parentTransformCinco);
      scene.remove(parentTransformSeis);
    }
    if (event.which == "73") {
      console.log("I");
      isSceneOne = false;
      isSceneTwo = false;
    }
    if (event.which == "79") {
      console.log("O");
      isSceneOne = false;
      isSceneTwo = false;
    }
    if (event.which == "80") {
      console.log("P");
      isSceneOne = false;
      isSceneTwo = false;
      camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
      scene.add(parentTransformSete);
      //
      scene.remove(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformTres);
      scene.remove(parentTransformQuatro);
      scene.remove(parentTransformCinco);
      scene.remove(parentTransformSeis);
    }

    /*
    SEGUNDA
    A_65 S_83 D_68 F_70 G_71 H_72 J_74 K_75 L_76 Ç_186
    */
    if (event.which == "65") {
      // AQUI METER UM TIMER E POR NO E
      console.log("A");
      afterimagePass.renderToScreen = false;
      effectSobel.renderToScreen = false;
      pixelPass.renderToScreen = false;
      glitchPass.goWild = true;
      if (glitchPass.renderToScreen == false) {
        renderPostOne = true;
        glitchPass.renderToScreen = true;
      } else if (glitchPass.renderToScreen == true) {
        renderPostOne = false;
        glitchPass.renderToScreen = false;
      }
      console.log(glitchVarOne);
    }
    if (event.which == "83") {
      console.log("S");
      afterimagePass.renderToScreen = false;
      effectSobel.renderToScreen = false;
      pixelPass.renderToScreen = false;
      glitchPass.goWild = false;
      if (glitchPass.renderToScreen == false) {
        renderPostOne = true;
        glitchPass.renderToScreen = true;
      } else if (glitchPass.renderToScreen == true) {
        renderPostOne = false;
        glitchPass.renderToScreen = false;
      }
    }
    if (event.which == "68") {
      console.log("D");
      glitchPass.renderToScreen = false;
      pixelPass.renderToScreen = false;
      effectSobel.renderToScreen = false;
      if (afterimagePass.renderToScreen == false) {
        renderPostTwo = true;
        afterimagePass.renderToScreen = true;
      } else if (afterimagePass.renderToScreen == true) {
        renderPostTwo = true;
        afterimagePass.renderToScreen = false;
      }
    }
    if (event.which == "70") {
      console.log("F");
      glitchPass.renderToScreen = false;
      afterimagePass.renderToScreen = false;
      pixelPass.renderToScreen = false;
      if (effectSobel.renderToScreen == false) {
        renderPostThree = true;
        effectSobel.renderToScreen = true;
      } else if (effectSobel.renderToScreen == true) {
        renderPostThree = false;
        effectSobel.renderToScreen = false;
      }
    }
    if (event.which == "71") {
      console.log("G");
      glitchPass.renderToScreen = false;
      afterimagePass.renderToScreen = false;
      effectSobel.renderToScreen = false;

      if (pixelPass.renderToScreen == false) {
        renderPostFour = true;
        pixelPass.renderToScreen = true;
      } else if (pixelPass.renderToScreen == true) {
        renderPostFour = false;
        pixelPass.renderToScreen = false;
      }
    }
    if (event.which == "72") {
      console.log("H");
    }
    if (event.which == "74") {
      console.log("J");
    }
    if (event.which == "75") {
      console.log("K");
    }
    if (event.which == "76") {
      console.log("L");
    }
    if (event.which == "186") {
      console.log("Ç");
      WUI_Dialog.open("master_dialog");
      WUI_Dialog.open("cockpit_dialog");
    }
    if (event.which == "222") {
      console.log("~");
      WUI_Dialog.close("master_dialog");
      WUI_Dialog.close("cockpit_dialog");
    }

    /*
    TERCEIRA
    Z_90 X_88 C_67 V_86 B_66 N_78 M_77
    , and . are not yet
    */
    if (event.which == "90") {
      console.log("Z");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in C ";
      scalePlaying = sequenceOfNotesC;
    }
    if (event.which == "88") {
      console.log("X");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in D ";
      scalePlaying = sequenceOfNotesD;
    }
    if (event.which == "67") {
      console.log("C");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in E ";
      scalePlaying = sequenceOfNotesE;
    }
    if (event.which == "86") {
      console.log("V");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in F ";
      scalePlaying = sequenceOfNotesF;
    }
    if (event.which == "66") {
      console.log("B");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in G ";
      scalePlaying = sequenceOfNotesG;
    }
    if (event.which == "78") {
      console.log("N");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in A ";
      scalePlaying = sequenceOfNotesA;
    }
    if (event.which == "77") {
      console.log("M");
      var div = document.getElementById('botLeftPage');
      div.innerHTML += '<br>' + "We are currently in B ";
      scalePlaying = sequenceOfNotesB;
    }

    //-------- MENOS
    if (event.which == "189") {
      if (hideShow == false) {
        document.getElementById("topLeftPage").style.color = 'rgba(0,0,0,0)';
        document.getElementById("topRightPage").style.color = 'rgba(0,0,0,0)';
        document.getElementById("botLeftPage").style.color = 'rgba(0,0,0,0)';
        document.getElementById("botRightPage").style.color = 'rgba(0,0,0,0)';
      }
      if (hideShow == true) {
        document.getElementById("topLeftPage").style.color = 'rgba(255,255,255,1)';
        document.getElementById("topRightPage").style.color = 'rgba(255,255,255,1)';
        document.getElementById("botLeftPage").style.color = 'rgba(255,255,255,1)';
        document.getElementById("botRightPage").style.color = 'rgba(255,255,255,1)';
      }
      if (hideShow == true) {
        hideShow = false;
      } else {
        hideShow = true;
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
  parentTransformDois.rotation.y += 0.005;
  parentTransformDois.rotation.x += 0.005;
  parentTransformDois.rotation.z += 0.005;
  requestAnimationFrame(animate);
  render();
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  mouseX = (event.clientX - windowHalfX) * 10;
  mouseY = (event.clientY - windowHalfY) * 10;

}

// ------------------------- SOCKETS -------------------------------

var data;

function onMouseDown(event) {
  markovNote();
  event.preventDefault();
  var data = {
    x: event.clientX,
    y: event.clientY
  };

  socket.emit('mouse', data);
  //CRIAR OUTRO ONLY ON INTERSECT

  randomSequenceOfNotes = Math.floor(Math.random() * scalePlaying.length);
  console.log(randomSequenceOfNotes);
  if (isSceneOne == true) {
    var intersectsClick = raycaster.intersectObjects(parentTransform.children);
    if (intersectsClick.length > 0) {
      Tone.context.resume().then(() => {
        polySynth.triggerAttackRelease(scalePlaying[randomSequenceOfNotes], "4n");
        //playNote("4n", scalePlaying[randomSequenceOfNotes]);
        var logs = document.getElementById('logs'),
          output_node = document.createElement("div");
        output_node.innerHTML = scalePlaying[randomSequenceOfNotes];
        logs.appendChild(output_node);
        logs.scrollTop = logs.scrollHeight;
      });
    } else {}
  }
}

function onMouseUp(event) {
  event.preventDefault();
}

function onWindowResize() {}

function myFunc() {}

function newDrawing(data) {
  //THIS IS WHAT HAPPENS IN ANOTHER CLIENT
  console.log(data.x);
  console.log(data.y);
  randomSequenceOfNotes = Math.floor(Math.random() * scalePlaying.length);
  polySynth.triggerAttackRelease(scalePlaying[randomSequenceOfNotes], "4n");

}

// ---------------------- LAPTOP KEYBOARD -------------------------

//(Z o-) (X o+) linha do meio CDEFGABCDEF
//link here https://github.com/kylestetz/AudioKeys

var keyboard = new AudioKeys();

keyboard.down(function(note) {
  //note.keyCode, note.frequency, note.velocity, note.isActive, note.note;
  //piano.toggleKey(note.note, true);
});

keyboard.up(function(note) {
  //piano.toggleKey(note.note, false);
});

// --------------------------- MIDI -------------------------------

if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
    sysex: false
  }).then(onMIDISuccess, onMIDIFailure);
} else {
  alert("No MIDI support in your browser.");
}

function onMIDISuccess(midiAccess) {
  midi = midiAccess;

  var inputs = midi.inputs.values();
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
    input.value.onmidimessage = onMIDIMessage;
  }
  console.log('MIDI Access Object', midiAccess);
}

function onMIDIMessage(event) {
  data = event.data;
  midiValOne = data[0];
  midiValTwo = data[1];
  midiValThree = data[2];

  if (midiValOne == 176 && midiValTwo == 8) {
    console.log(midiValThree);
  }
}

function onMIDIFailure(e) {
  console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. " + e);
}

function detectmob() {
  if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}

function handleStart() {
  //scene.background = new THREE.Color(0xffffff);
  //I THINK THESE ARE MOBILES
}


function render() {
  var corFundo = Math.random() * (0.15 - 0) + 0;
  //if I want glitch cinzentos
  //scene.background = new THREE.Color(corFundo, corFundo, corFundo);
  theta += 0.2;
  if (isSceneOne == true) {
    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta)); //check sin and cos
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
  }
  camera.lookAt(scene.position);
  camera.updateMatrixWorld();

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(parentTransform.children);
  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0xffffff);
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    INTERSECTED = null;
  }

  renderer.render(scene, camera);
  renderer.autoClear = false;
  renderer.shadowMap.enabled = false;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.needsUpdate = true;

  if (renderPostOne == true) {
    composerOne.render();
  }
  if (renderPostTwo == true) {
    composerTwo.render();
  }
  if (renderPostThree == true) {
    composerThree.render();
  }
  if (renderPostFour == true) {
    composerFour.render();
  }

  if (isSceneThree == true) {
    var time = Date.now() * 0.001;
    var rx = Math.sin(time * 0.7) * 0.5,
      ry = Math.sin(time * 0.3) * 0.5,
      rz = Math.sin(time * 0.2) * 0.5;
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    parentTransformTres.rotation.x = rx;
    parentTransformTres.rotation.y = ry;
    parentTransformTres.rotation.z = rz;
  }
}