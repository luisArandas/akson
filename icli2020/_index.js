// Começar com negro e shader pequeno - flickr -
// Flickr - segunda parte tem potencial com sobel
// Get everything local

$(document).ready(function() {
  if (window.AudioContext === null) {
    alert("AudioContext is Undefined");
  }
});


var lightOne, lightTwo, lightThree, lightFour;
var nrSeconds = 0;
var camera,
  scene,
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
var mouse = new THREE.Vector2(),
  INTERSECTED;

var glitchPass = new THREE.GlitchPass();
var afterimagePass = new THREE.AfterimagePass();
var effectHBlur = new THREE.ShaderPass(THREE.HorizontalBlurShader);

var composerOne, composerTwo, composerThree, composerFour;

var isSceneOne = true;
var isSceneTwo = false;
var isSceneThree = false;
var isSceneFour = false;

var renderPostOne = false;
var renderPostTwo = false;
var renderPostThree = false;
var renderPostFour = false;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var isBlackSceneOne = false;
var isBlackSceneOne_ = false;
var isBlackSceneFour = false;

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

var currentSynthesizer;
currentSynthesizer = polySynth;

init();
animate();



function init() {


  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = 1000;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.add(camera);

  raycaster = new THREE.Raycaster();
  raycaster.linePrecision = 3;

  renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: false,
  });
  //renderer.depth = false;
  renderer.logarithmicDepthBuffer = true;
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
    //console.log(x);
  }
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = true;
  controls.minDistance = 100;
  controls.maxDistance = 600;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enabled = false;

  /* First Scene Setup */

  parentTransform = new THREE.Object3D();
  for (var i = 0; i < 90; i++) {
    var geometry = new THREE.BoxBufferGeometry(10, 1500, 10);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0x5f5f5f,
    }));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    parentTransform.add(object);
  }

  lightOne = new THREE.DirectionalLight(0xd3d3d3, 1.1);
  lightOne.position.set(1, 1, 1).normalize();
  parentTransform.add(lightOne);
  scene.add(parentTransform);

  /* Second Scene Setup */

  parentTransformDois = new THREE.Object3D();
  for (var i = 0; i < vertices.length; i++) {
    vertices[i].add(randomPoint().multiplyScalar(20));
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
  mesh.material.side = THREE.BackSide;
  mesh.renderOrder = 0;
  parentTransformDois.add(mesh);
  var mesh = new THREE.Mesh(meshGeometry, meshMaterial.clone());
  mesh.material.side = THREE.FrontSide;
  mesh.renderOrder = 1;
  parentTransformDois.add(mesh);
  lightTwo = new THREE.DirectionalLight(0xd3d3d3, 1);
  lightTwo.position.set(1, 1, 1).normalize();
  parentTransformDois.add(lightTwo);

  /* Third Scene Setup */

  parentTransformTres = new THREE.Object3D();
  for (var i = 0; i < 50; i++) {
    var geometry = new THREE.BoxBufferGeometry(50, 500, 50);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0x1E1E1E,
      //wireframe: true
    }));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    parentTransformTres.add(object);
  }
  lightThree = new THREE.DirectionalLight(0xd3d3d3, 2);
  lightThree.position.set(1, 1, 1).normalize();
  parentTransformTres.add(lightThree);

  /* Fourth Scene Setup */

  parentTransformQuatro = new THREE.Object3D();
  for (var i = 0; i < 90; i++) {
    var geometry = new THREE.BoxBufferGeometry(30, 1500, 30);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true
    }));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    parentTransformQuatro.add(object);
  }

  lightFour = new THREE.DirectionalLight(0xd3d3d3, 2);
  lightFour.position.set(1, 1, 1).normalize();
  parentTransformQuatro.add(lightFour);

  parentTransform.frustumCulled = false;
  parentTransformDois.frustumCulled = false;
  parentTransformTres.frustumCulled = false;
  parentTransformQuatro.frustumCulled = false;

  window.addEventListener('mousedown', onMouseDown, false);



  document.addEventListener('mousemove', onDocumentMouseMove, false);

  /* Shader Composer Setup */

  composerOne = new THREE.EffectComposer(renderer);
  composerOne.addPass(new THREE.RenderPass(scene, camera));
  composerOne.addPass(glitchPass);

  composerTwo = new THREE.EffectComposer(renderer);
  composerTwo.addPass(new THREE.RenderPass(scene, camera));
  composerTwo.addPass(afterimagePass);

  composerThree = new THREE.EffectComposer(renderer);
  composerThree.addPass(new THREE.RenderPass(scene, camera));
  composerThree.addPass(effectHBlur);

  glitchPass.renderToScreen = false;
  effectHBlur.renderToScreen = false;
  afterimagePass.renderToScreen = false;

  camera.near = 0;
  camera.updateProjectionMatrix();

  document.addEventListener("keydown", function(event) {

    if (event.which == "221") {
      document.body.requestPointerLock();
      console.log(document.body.requestPointerLock());
    }
    if (event.which == "220") {
      document.exitPointerLock();
      console.log(document.exitPointerLock());
    }

    if (event.which == "16") {
      Tone.Master.mute = true;
    }
    if (event.which == "188") {
      Tone.Master.mute = false;
    }
    if (event.which == "90") {
      camera.near = 0;
      camera.updateProjectionMatrix();
    }
    if (event.which == "88") {
      camera.near = 1;
      camera.updateProjectionMatrix();
    }

    if (event.which == "49") {
      parteUm();
    }




    if (event.which == "81") {

      /* Audio First Scene Feedback

      console.log("Q");
      currentSynthesizer.volume.value = 0;
      UI.synthvolume._value.update(0);
      UI.synthvolume.render();
      noiseOne.volume.value = -10;
      UI.backgroundvolume._value.update(-10);
      UI.backgroundvolume.render();
      autoFilterOne.set({
        "baseFrequency": 200
      });
      autoFilterOne.set({
        "filter": {
          "rolloff": -12
        }
      });
      autoFilterOne.set({
        "frequency": "8m"
      });
      autoFilterOne.set({
        "octaves": 2.6
      });
      noiseOne.playbackRate = 1;
      UI.noiseOnePlaybackRate._value.update(1);
      UI.noiseOnePlaybackRate.render();
      noiseOne.playbackRate = 1;

      UI.vibratoFrequency._value.update(0);
      UI.vibratoFrequency.render();
      vibrato.frequency.value = 0;

      UI.vibratoDepth._value.update(0);
      UI.vibratoDepth.render();
      vibrato.depth.value = 0;
      */

      isSceneOne = true;
      isSceneTwo = false;
      isSceneThree = false;
      isSceneFour = false;


      controls.enabled = false;

      scene.add(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformTres);
      scene.remove(parentTransformQuatro);
    }
    if (event.which == "87") {

      /* Audio Second Scene Feedback

      console.log("W");
      currentSynthesizer.volume.value = -22.5;
      UI.synthvolume._value.update(-22.5);
      UI.synthvolume.render();
      noiseOne.volume.value = 0;
      UI.backgroundvolume._value.update(0);
      UI.backgroundvolume.render();
      autoFilterOne.set({
        "baseFrequency": 150
      });
      autoFilterOne.set({
        "filter": {
          "rolloff": -24
        }
      });
      autoFilterOne.set({
        "frequency": "4m"
      });
      autoFilterOne.set({
        "octaves": 2.6
      });
      noiseOne.playbackRate = 1;
      UI.noiseOnePlaybackRate._value.update(1);
      UI.noiseOnePlaybackRate.render();
      noiseOne.playbackRate = 1;
      UI.vibratoFrequency._value.update(0);
      UI.vibratoFrequency.render();
      vibrato.frequency.value = 0;
      UI.vibratoDepth._value.update(0);
      UI.vibratoDepth.render();
      vibrato.depth.value = 0;
      */

      camera.position.x = 54;
      camera.position.y = 54;
      camera.position.z = 150;

      mouseDown = 0;
      isSceneOne = false;
      isSceneTwo = true;
      isSceneThree = false;
      isSceneFour = false;

      controls.enabled = true;

      scene.add(parentTransformDois);
      scene.remove(parentTransform);
      scene.remove(parentTransformTres);
      scene.remove(parentTransformQuatro);
    }

    if (event.which == "69") {

      /* Audio Third Scene Feedback

      console.log("E");
      currentSynthesizer.volume.value = -22.5;
      UI.synthvolume._value.update(-22.5);
      UI.synthvolume.render();
      noiseOne.volume.value = 0;
      UI.backgroundvolume._value.update(0);
      UI.backgroundvolume.render();
      autoFilterOne.set({
        "baseFrequency": 150
      });
      autoFilterOne.set({
        "filter": {
          "rolloff": -96
        }
      });
      autoFilterOne.set({
        "frequency": "2n"
      });
      UI.noiseOnePlaybackRate._value.update(1);
      UI.noiseOnePlaybackRate.render();
      noiseOne.playbackRate = 1;
      UI.vibratoFrequency._value.update(0);
      UI.vibratoFrequency.render();
      vibrato.frequency.value = 0;
      UI.vibratoDepth._value.update(0);
      UI.vibratoDepth.render();
      vibrato.depth.value = 0;
      currentSynthesizer.volume.value = -22.5;
      UI.synthvolume._value.update(-22.5);
      UI.synthvolume.render();
      noiseOne.volume.value = 0;
      UI.backgroundvolume._value.update(0);
      UI.backgroundvolume.render();
      autoFilterOne.set({
        "baseFrequency": 150
      });
      autoFilterOne.set({
        "filter": {
          "rolloff": -24
        }
      });
      */
      isSceneOne = false;
      isSceneTwo = false;
      isSceneThree = true;
      isSceneFour = false;
      controls.enabled = false;
      scene.add(parentTransformTres);
      scene.remove(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformQuatro);
    }

    if (event.which == "82") {

      /* Audio Second Scene Feedback

      console.log("R");
      currentSynthesizer.volume.value = 0;
      UI.synthvolume._value.update(0);
      UI.synthvolume.render();
      noiseOne.volume.value = -10;
      UI.backgroundvolume._value.update(-10);
      UI.backgroundvolume.render();
      UI.noiseOnePlaybackRate._value.update(15);
      UI.noiseOnePlaybackRate.render();
      noiseOne.playbackRate = 15;
      UI.vibratoFrequency._value.update(2.5);
      UI.vibratoFrequency.render();
      vibrato.frequency.value = 2.5;
      UI.vibratoDepth._value.update(0.2);
      UI.vibratoDepth.render();
      vibrato.depth.value = 0.2;
      autoFilterOne.set({
        "octaves": 2.6
      });
      noiseOne.playbackRate = 1;
      */

      isSceneOne = false;
      isSceneTwo = false;
      isSceneThree = false;
      isSceneFour = true;
      controls.enabled = false;
      scene.add(parentTransformQuatro);
      scene.remove(parentTransform);
      scene.remove(parentTransformDois);
      scene.remove(parentTransformTres);
    }

    /* Shader Keyboard Trigger */

    if (event.which == "67") {
      renderPostOne = false;
      renderPostTwo = false;
      renderPostThree = false;
      renderPostFour = false;
      glitchPass.goWild = false;
      glitchPass.renderToScreen = false;
    }
    if (event.which == "86") {
      renderPostOne = true;
      renderPostTwo = false;
      renderPostThree = false;
      renderPostFour = false;
      console.log(renderPostOne);
      glitchPass.goWild = false;
      glitchPass.renderToScreen = true;
      afterimagePass.renderToScreen = false;
    }
    if (event.which == "66") {
      renderPostOne = true;
      renderPostTwo = false;
      renderPostThree = false;
      renderPostFour = false;
      glitchPass.goWild = true;
      glitchPass.renderToScreen = true;
      afterimagePass.renderToScreen = false;
    }
    if (event.which == "78") {
      renderPostOne = false;
      renderPostTwo = true;
      renderPostThree = false;
      renderPostFour = false;
      glitchPass.goWild = false;
      glitchPass.renderToScreen = false;
      afterimagePass.renderToScreen = true;
    }
    if (event.which == "77") {
      renderPostOne = false;
      renderPostTwo = false;
      renderPostThree = false;
      renderPostFour = false;
      glitchPass.goWild = false;
      glitchPass.renderToScreen = false;
      afterimagePass.renderToScreen = true;

    }
  });
}

/* Scheduling the Rendering */

setInterval( function () {
  if ( ! document.webkitHidden ) requestAnimationFrame(animate);
}, 1000 / 55 );













/* Animation Function */

function animate() {
  parentTransformDois.rotation.y += 0.005;
  parentTransformDois.rotation.x += 0.005;
  parentTransformDois.rotation.z += 0.005;

  if (isSceneOne === true){
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
  }

  if (isSceneFour === true){
    var intersects1 = raycaster.intersectObjects(parentTransformQuatro.children);
    if (intersects1.length > 0) {
      if (INTERSECTED != intersects1[0].object) {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED = intersects1[0].object;
        INTERSECTED.material.wireframe = false;
      }
    } else {
      if (INTERSECTED) INTERSECTED.material.wireframe = true;
      INTERSECTED = null;
    }
  }
  //requestAnimationFrame(animate);
  render();
}

/* Sockets and Musical Interaction */

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
  if (isSceneThree === true){
    _mouseX = mouseX.map(0, window.innerWidth, 5, 15);
    _mouseY = mouseY.map(0, window.innerHeight, 5, 35);
  }
}

function onMouseDown(event) {

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  mouseXOnMouseDown = event.clientX - windowHalfX;
  targetRotationOnMouseDownX = targetRotationX;
  mouseYOnMouseDown = event.clientY - windowHalfY;
  targetRotationOnMouseDownY = targetRotationY;
  event.preventDefault();
  var data = {
    x: event.clientX,
    y: event.clientY
  };

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
      StartAudioContext(Tone.context).then(function() {
        currentSynthesizer.triggerAttackRelease(scale[note], "4n");
        console.log(note);
      })
      //Tone.context.resume().then(() => {
      //playNote("4n", scalePlaying[randomSequenceOfNotes]);
      /*var logs = document.getElementById('monitor_dialog'),
        output_node = document.createElement("div");
      output_node.innerHTML = scale[note];
      logs.appendChild(output_node);
      logs.scrollTop = logs.scrollHeight;*/
      //});
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
        currentSynthesizer.triggerAttackRelease(scale[note], "4n");
        console.log(note);
      });
    }
  }
}



function render() {

  theta += 0.2;
  if (isSceneOne == true || isSceneFour == true) {
    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
  }
  camera.lookAt(scene.position);
  raycaster.setFromCamera(mouse, camera);
  renderer.clear();
  renderer.render(scene, camera);
  //renderer.clearDepth();
  //renderer.render(scene2, camera2);
  renderer.autoClear = false;

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
  if (isSceneThree === true) {
    var time = Date.now() * 0.001;
    var rx = Math.sin(time * 0.7) * 0.5,
      ry = Math.sin(time * 0.3) * 0.5,
      rz = Math.sin(time * 0.2) * 0.5;
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    /*autoFilterOne.set({
      "octaves": rx + 1
    });*/
    camera.lookAt(scene.position);
    parentTransformTres.rotation.x = rx;
    parentTransformTres.rotation.y = ry;
    parentTransformTres.rotation.z = rz;
  }

  parentTransformDois.rotation.y += (targetRotationX - parentTransformDois.rotation.y) * 0.1;
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
