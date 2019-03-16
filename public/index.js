/**
 * @author Luis Arandas  http://luisarandas.org
 */

$(document).ready(function() {
  if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
  };
  document.getElementById("topBar").style.display = "none";
  WUI_Dialog.close("master_dialog");
  WUI_Dialog.close("cockpit_dialog");
  WUI_Dialog.close("logs_dialog");
  if (detectmob() === true) {
    document.getElementById("topBar").style.display = "none";
    WUI_Dialog.close("master_dialog");
    WUI_Dialog.close("cockpit_dialog");
    WUI_Dialog.close("logs_dialog");
  };
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (ios === true) {
    console.log("teste");
    $(".introLoadTimer").remove();
  }
  if (window.AudioContext === null) {
    alert("AudioContext is Undefined");
  }
  $(".introLoadTimer").fadeIn("slow", function() {
    $(".introLoadTimer").delay(3000).fadeOut(2500);
  });
  //console.log("volume " + Tone.Master.volume.value);
  var v = document.querySelectorAll("#c2, #d2, #e2, #g2, #a2, #c3, #d3, #e3, #g3, #a3, #c4, #d4, #e4, #g4, #a4, #c5, #d5, #e5, #g5, #a5");
  v.forEach(function(v) {
    v.style.background = "white";
    v.style.color = "black";
  });
  if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
    //Try alert.
  }
});

var camera,
  scene,
  light,
  container,
  raycaster,
  raycasterTwo,
  renderer,
  parentTransform,
  parentTransformDois,
  parentTransformTres,
  parentTransformQuatro,
  sphereInter;
var radius = 100;
var theta = 0;
var sideBar = false;
var mouse = new THREE.Vector2(),
  INTERSECTED;
var mouseTwo = new THREE.Vector2(),
  INTERSECTEDTWO;

var glitchPass = new THREE.GlitchPass();
var afterimagePass = new THREE.AfterimagePass();

var composerOne;
var composerTwo;
var composerThree;
var composerFour;
var whichVisuals;

var r = 450;


/*  Currently using Pentatonic Major  */

var scalePlaying;

var isSceneOne = true;
var isSceneTwo = false;
var isSceneThree = false;
var isSceneFour = false;

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

var isBlackSceneOne = false;
var isBlackSceneOne_ = false;
var isBlackSceneFour = false;
var light1;
var light2;

var ambientLight;
var ambientLight1;
var ambientLight2;

var vertices = new THREE.DodecahedronGeometry(50).vertices;

var targetRotationX = 0;
var targetRotationOnMouseDownX = 0;

var targetRotationY = 0;
var targetRotationOnMouseDownY = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;

var finalRotationY;

var mouseDown = 0;


/*var meshMaterial1 = createMaterial("vertex-shader", "fragment-shader-1");
var meshMaterial2 = createMaterial("vertex-shader", "fragment-shader-2");
var meshMaterial3 = createMaterial("vertex-shader", "fragment-shader-3");
var meshMaterial4 = createMaterial("vertex-shader", "fragment-shader-4");
var meshMaterial5 = createMaterial("vertex-shader", "fragment-shader-5");
var meshMaterial6 = createMaterial("vertex-shader", "fragment-shader-6");*/

init();
animate();

function init() {

  socket = io.connect(window.location.origin);
  socket.on('mouse', clickStream);
  socket.on('scene', changeScene);

  socket.on('socketid', function(socketid) {
    var logs = document.getElementById('logs'),
      output_node = document.createElement("div");
    output_node.innerHTML = 'Key - ' + socketid + '<br>' + '//////////////////////////' + '<br>';
    logs.appendChild(output_node);
    logs.scrollTop = logs.scrollHeight;
  });
  socket.on('socketnumber', function(connections) {
    var logs = document.getElementById('logs'),
      output_node = document.createElement("div");
    output_node.innerHTML = "There are currently " + connections + " connections" + '<br>' + '//////////////////////////' + '<br>';
    logs.appendChild(output_node);
    logs.scrollTop = logs.scrollHeight;
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
  raycasterTwo = new THREE.Raycaster();
  raycasterTwo.linePrecision = 3;

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
  controls.addEventListener('change', (x) => {
    render();
    orbitControls(x);
  });

  function orbitControls(x) {
    console.log(x);
  }
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = true;
  controls.minDistance = 100;
  controls.maxDistance = 600;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enabled = false;

  light = new THREE.DirectionalLight(0xd3d3d3, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);
  ambientLight = new THREE.AmbientLight(0xd3d3d3, 0.1);
  scene.add(ambientLight);

  /* ----------------------------------------------------------------------------------------- */

  parentTransform = new THREE.Object3D();
  for (var i = 0; i < 45; i++) {
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
  for (var i = 0; i < 45; i++) {
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


  /* ----------------------------------------------------------------------------------------- */


  parentTransformDois = new THREE.Object3D();
  for (var i = 0; i < vertices.length; i++) {
    vertices[i].add(randomPoint().multiplyScalar(20)); // wiggle the points
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

  light5 = new THREE.DirectionalLight(0xffffff, 0);
  light5.position.set(1, 5, 1).normalize();
  parentTransformDois.add(light5);
  ambientLight5 = new THREE.AmbientLight(0xffffff, 0);
  parentTransformDois.add(ambientLight5);
  directionalLight5 = new THREE.DirectionalLight(0xffffff, 0);
  parentTransformDois.add(directionalLight5);

  /* ----------------------------------------------------------------------------------------- */

  parentTransformTres = new THREE.Object3D();
  for (var i = 0; i < 90; i++) {
    var geometry = new THREE.BoxGeometry(50, 500, 50);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0x1E1E1E,
      //wireframe: true
    }));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    //  object.rotation.y = Math.random() * 2 * Math.PI;
    //  object.rotation.z = Math.random() * 2 * Math.PI;*/
    parentTransformTres.add(object);
  }
  light1 = new THREE.DirectionalLight(0x000000, 1);
  light1.position.set(1, 5, 1).normalize();
  parentTransformTres.add(light1);
  ambientLight1 = new THREE.AmbientLight(0x000000, 1);
  parentTransformTres.add(ambientLight1);
  var directionalLight = new THREE.DirectionalLight(0x8C8C8C, 5);
  parentTransformTres.add(directionalLight);

  /* ----------------------------------------------------------------------------------------- */

  parentTransformQuatro = new THREE.Object3D();
  for (var i = 0; i < 40; i++) {
    var geometry = new THREE.BoxGeometry(30, 2000, 30);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true
    }));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    //  object.rotation.y = Math.random() * 2 * Math.PI;
    //  object.rotation.z = Math.random() * 2 * Math.PI;*/


    /*  var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
        color: 0x5f5f5f,
        //wireframe: true
      }));
      object.position.x = Math.random() * 800 - 400;
      object.position.y = Math.random() * 800 - 400;
      object.position.z = Math.random() * 800 - 400;
      object.rotation.x = Math.random() * 2 * Math.PI;
      //object.rotation.y = Math.random() * 2 * Math.PI;
      //object.rotation.z = Math.random() * 2 * Math.PI;*/
    parentTransformQuatro.add(object);
  }
  for (var i = 0; i < 45; i++) {
    var geometry = new THREE.BoxGeometry(10, 1500, 10);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0x5f5f5f,
      morphTargets: true,
      wireframe: true
    }));

    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    //object.rotation.y = Math.random() * 2 * Math.PI;
    //object.rotation.z = Math.random() * 2 * Math.PI;
    //object.rotation.z = Math.PI / 2;
    parentTransformQuatro.add(object);

  }
  light2 = new THREE.DirectionalLight(0x0c0c0c, 4);
  light2.position.set(1, 5, 1).normalize();
  parentTransformQuatro.add(light2);
  ambientLight2 = new THREE.AmbientLight(0x0c0c0c, 4);
  parentTransformQuatro.add(ambientLight2);

  /* This might be important anytime soon
  First scene with line buffer geometry. xCoAx maybe will need this

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
    }*/

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousedown', onMouseDown, false);
  window.addEventListener('mouseup', onMouseUp, false);
  window.addEventListener("focus", function(event) {
    mouseDown = 0;
  }, false);
  window.addEventListener("blur", function(event) {

  }, false);
  document.addEventListener('mousemove', onDocumentMouseMove, false);

  composerOne = new THREE.EffectComposer(renderer);
  composerOne.addPass(new THREE.RenderPass(scene, camera));
  composerOne.addPass(glitchPass);

  composerTwo = new THREE.EffectComposer(renderer);
  composerTwo.addPass(new THREE.RenderPass(scene, camera));
  composerTwo.addPass(afterimagePass);

  glitchPass.renderToScreen = false;
  afterimagePass.renderToScreen = false;

  /*
  Q_81 W_87 E_69 R_82 T_84 Y_89 U_85 I_73 O_79 P_80
  32 == SPACE
  */

  console.log(autoFilterOne.baseFrequency);

  var whichScene; // Stream to the mobile phone.
  document.addEventListener("keydown", function(event) {
    if (event.which == "32") {
      if (sideBar == false) {
        document.getElementById("topBar").style.display = "inline";
        WUI_Dialog.open("master_dialog");
        WUI_Dialog.open("cockpit_dialog");
        WUI_Dialog.open("logs_dialog");
      }
      if (sideBar == true) {
        document.getElementById("topBar").style.display = "none";
        WUI_Dialog.close("master_dialog");
        WUI_Dialog.close("cockpit_dialog");
        WUI_Dialog.close("logs_dialog");
      }
      if (sideBar == true) {
        sideBar = false;
      } else {
        sideBar = true;
      }
    }
    if (event.which == "81") {
      //console.log("Q");

      /* Audio Scene */

      polySynth.volume.value = 0;
      UI.synthvolume._value.update(0);
      UI.synthvolume.render();
      noiseOne.volume.value = -11;
      UI.backgroundvolume._value.update(-11);
      UI.backgroundvolume.render();
      autoFilterOne.set({
        "baseFrequency": 200
      });

      /* ------------ */

      isSceneOne = true;
      isSceneTwo = false;
      isSceneThree = false;
      isSceneFour = false;

      var whichScene = 81;
      socket.emit('scene', whichScene);

      camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
      console.log("z " + camera.position.z);
      controls.enabled = false;

      scene.add(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformTres);
      scene.remove(parentTransformQuatro);
    }
    if (event.which == "87") {
      //console.log("W");

      /* Audio Scene */

      polySynth.volume.value = -22.5;
      UI.synthvolume._value.update(-22.5);
      UI.synthvolume.render();
      noiseOne.volume.value = -2;
      UI.backgroundvolume._value.update(-2);
      UI.backgroundvolume.render();
      autoFilterOne.set({
        "baseFrequency": 100
      });
      //32m rolof-24

      /* ------------ */


      mouseDown = 0;
      isSceneOne = false;
      isSceneTwo = true;
      isSceneThree = false;
      isSceneFour = false;

      var whichScene = 87;
      socket.emit('scene', whichScene);

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 150;
      controls.enabled = true;


      parentTransform.children.forEach(function(v) {
        console.log(points);
      });


      scene.add(parentTransformDois);
      scene.remove(parentTransform);
      scene.remove(parentTransformTres);
      scene.remove(parentTransformQuatro);
    }
    if (event.which == "69") {
      console.log("E");

      /* Autofilter freq*/


      isSceneOne = false;
      isSceneTwo = false;
      isSceneThree = true;
      isSceneFour = false;
      //camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
      controls.enabled = false;


      var whichScene = 69;
      socket.emit('scene', whichScene);

      scene.add(parentTransformTres);
      scene.remove(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformQuatro);
    }
    if (event.which == "82") {
      console.log("R")
      isSceneOne = false;
      isSceneTwo = false;
      isSceneThree = false;
      isSceneFour = true;

      /*var whichScene = 82;
      socket.emit('scene', whichScene);*/
      controls.enabled = false;

      camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);

      scene.add(parentTransformQuatro);
      scene.remove(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformTres);
    }

    if (event.which == "84") {} //T
    if (event.which == "89") {} //Y
    if (event.which == "85") {} //U
    if (event.which == "73") {} //I
    if (event.which == "79") {} //O
    if (event.which == "80") {} //P

    /*
    SEGUNDA
    A_65 S_83 D_68 F_70 G_71 H_72 J_74 K_75 L_76 Ç_186
    */
    if (event.which == "65") {
      // AQUI METER UM TIMER E POR NO E
      console.log("A");
      afterimagePass.renderToScreen = false;
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
    }
    if (event.which == "71") {
      console.log("G");
      glitchPass.renderToScreen = false;
      afterimagePass.renderToScreen = false;
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
  });
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
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

// ------------------------- Sockets & Mouse -------------------------------


var data;
var newScale = new ScalePlaying();
var scale = newScale.cMajorPentatonic();

document.body.onmousedown = function() {
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
  if (mouseDown) {
    targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.01;
    targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.01;
  }
}

function onMouseDown(event) {

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  mouseXOnMouseDown = event.clientX - windowHalfX;
  targetRotationOnMouseDownX = targetRotationX;
  mouseYOnMouseDown = event.clientY - windowHalfY;
  targetRotationOnMouseDownY = targetRotationY;

  //markovNote(); // console logs next chain note
  event.preventDefault();
  var data = {
    x: event.clientX,
    y: event.clientY
  };
  socket.emit('mouse', data);

  var note = Math.floor(Math.random() * scale.length);

  if (isSceneOne == true) {
    var intersectsClick = raycaster.intersectObjects(parentTransform.children);
    if (intersectsClick.length > 0) {
      if (isBlackSceneOne == false) {
        intersectsClick[0].object.material.color.set(0x181818);
      }
      if (isBlackSceneOne == true) {
        intersectsClick[0].object.material.color.set(0xffffff);
      }
      if (isBlackSceneOne == true) {
        isBlackSceneOne = false;
      } else {
        isBlackSceneOne = true;
      }
      Tone.context.resume().then(() => {
        polySynth.triggerAttackRelease(scale[note], "4n");
        //playNote("4n", scalePlaying[randomSequenceOfNotes]);
        var logs = document.getElementById('logs'),
          output_node = document.createElement("div");
        output_node.innerHTML = scale[note];
        logs.appendChild(output_node);
        logs.scrollTop = logs.scrollHeight;
      });
    } else {}
  }

  if (isSceneFour == true) {
    var intersectsClick = raycaster.intersectObjects(parentTransformQuatro.children);
    if (intersectsClick.length > 0) {
      console.log(intersectsClick[0].object.material.color);
      intersectsClick[0].object.wireframe = false;

      if (isBlackSceneFour == false) {
        intersectsClick[0].object.material.color.set(0x181818);
      }
      if (isBlackSceneFour == true) {
        intersectsClick[0].object.material.color.set(0xffffff);
      }
      if (isBlackSceneFour == true) {
        isBlackSceneFour = false;
      } else {
        isBlackSceneFour = true;
      }

      Tone.context.resume().then(() => {
        polySynth.triggerAttackRelease(scale[note], "4n");
        //playNote("4n", scalePlaying[randomSequenceOfNotes]);
        var logs = document.getElementById('logs'),
          output_node = document.createElement("div");
        output_node.innerHTML = scale[note];
        logs.appendChild(output_node);
        logs.scrollTop = logs.scrollHeight;
      });
    }
  }
}

function onMouseUp(event) {
  event.preventDefault();
}

function onWindowResize() {}




function clickStream(data) {

  console.log(data.x);
  console.log(data.y);

  var note = Math.floor(Math.random() * scale.length);
  polySynth.triggerAttackRelease(scale[note], "4n");

  var randomItem = parentTransform.children[Math.floor(Math.random() * parentTransform.children.length)];
  if (isBlackSceneOne_ == false) {
    randomItem.material.color.set(0x181818);
  }
  if (isBlackSceneOne_ == true) {
    randomItem.material.color.set(0xBEBEBE);
  }
  if (isBlackSceneOne_ == true) {
    isBlackSceneOne_ = false;
  } else {
    isBlackSceneOne_ = true;
  }
}

function changeScene(data) {
  /* Mobile scene changer stream */
  if (detectmob() === true) {
    Tone.context.resume().then(() => {
      var evt = new KeyboardEvent('keydown', {
        'keyCode': data,
        'which': data
      });
      document.dispatchEvent(evt);
    });
  }
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

function render() {
  stats1.update();
  stats2.update();
  stats3.update();
  var corFundo = Math.random() * (0.15 - 0) + 0;
  // scene.background = new THREE.Color(corFundo, corFundo, corFundo);
  theta += 0.2;
  if (isSceneOne == true || isSceneFour == true) {
    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta)); //check sin and cos
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
  }
  camera.lookAt(scene.position);
  camera.updateMatrixWorld();

  raycaster.setFromCamera(mouse, camera);
  var intersectsOne = raycaster.intersectObjects(parentTransform.children);
  if (intersectsOne.length > 0) {
    if (INTERSECTED != intersectsOne[0].object) {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = intersectsOne[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0xffffff);
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    INTERSECTED = null;
  }
  var intersectsTwo = raycaster.intersectObjects(parentTransformQuatro.children);
  if (intersectsTwo.length > 0) {
    if (INTERSECTEDTWO != intersectsTwo[0].object) {
      if (INTERSECTEDTWO) INTERSECTEDTWO.material.emissive.setHex(INTERSECTEDTWO.currentHex);
      INTERSECTEDTWO = intersectsTwo[0].object;
      INTERSECTEDTWO.currentHex = INTERSECTEDTWO.material.emissive.getHex(); //take this out
      INTERSECTEDTWO.material.wireframe = false;
      INTERSECTEDTWO.material.emissive.setHex(0x000000);
    }
  } else {
    //if (INTERSECTEDTWO) INTERSECTEDTWO.material.wireframe == false;
    //if (INTERSECTEDTWO) INTERSECTEDTWO.material.emissive.setHex(INTERSECTEDTWO.currentHex);
    if (INTERSECTEDTWO)(INTERSECTEDTWO.material.wireframe = true);
    INTERSECTEDTWO = null;
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

    /* Here change the scenes */

    camera.lookAt(scene.position);
    parentTransformTres.rotation.x = rx;
    parentTransformTres.rotation.y = ry;
    parentTransformTres.rotation.z = rz;
  }
  light1.position.x = Math.sin(time * 0.7) * 30;
  light1.position.y = Math.cos(time * 0.5) * 40;
  light1.position.z = Math.cos(time * 0.3) * 30;

  //horizontal rotation
  parentTransformDois.rotation.y += (targetRotationX - parentTransformDois.rotation.y) * 0.1;

  //vertical rotation
  finalRotationY = (targetRotationY - parentTransformDois.rotation.x);

  if (parentTransformDois.rotation.x <= 1 && parentTransformDois.rotation.x >= -1) {
    parentTransformDois.rotation.x += finalRotationY * 0.1;
  }
  if (parentTransformDois.rotation.x > 1) {
    parentTransformDois.rotation.x = 1
  } else if (parentTransformDois.rotation.x < -1) {
    parentTransformDois.rotation.x = -1
  }
}

var customScale = ["c2", "d2", "e2", "g2", "a2", "c3", "d3", "e3", "g3", "a3", "c4", "d4", "e4", "g4", "a4", "c5", "d5", "e5", "g5", "a5"];
//Array.prototype.push.apply(customScale, scale); Id's are different

function customScaleCortex(data) {
  var note = data;
  if (customScale.includes(note) == true) {
    for (var i = customScale.length - 1; i >= 0; i--) {
      if (customScale[i] === note) {
        customScale.splice(i, 1);
      }
    }
  } else {
    customScale.push(note);
  }
  //scale = customScale // This equals the current
  _customScale = customScale.map(function(e) {
    return e.toUpperCase()
  });
  __customScale = _customScale.map(function(e) {
    return e.replace('S', '#');
  });
  scale = __customScale;
  console.log(scale);
  console.log("Fix this.");
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}

function randomPoint() {
  return new THREE.Vector3(THREE.Math.randFloat(-1, 1), THREE.Math.randFloat(-1, 1), THREE.Math.randFloat(-1, 1));
}

$(document).mouseleave(function() {
  mouseDown = 0;
});

console.log();
console.log(ambientLight5);
console.log(directionalLight5);

function doStuff() {
  //light5.intensity = 1;
  //ambientLight5.intensity = 1;
  //directionalLight5.intensity = 1;
}
setInterval(doStuff, 10000);


var seconds = 10;
var countdown = setInterval(function() {
  seconds--;
  console.log(seconds);
  if (seconds <= 0) {
    clearInterval(countdown);
    seconds = 10;

  }
}, 1000);