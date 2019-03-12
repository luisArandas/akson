/* Graphics Post Production */

var sceneMaster = new Nexus.Dial('#sceneMaster', {
  'size': [40, 40],
  'interaction': 'vertical',
  'mode': 'absolute', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0.001,
  'value': -15
});
sceneMaster.on('change', function(e) {
  light.intensity = e;
  light1.intensity = e;
  light2.intensity = e;
  ambientLight1.intensity = e;
  ambientLight2.intensity = e;
  ambientLight.intensity = e;
});

var geometryWidth = new Nexus.Dial('#geometryWidth', {
  'size': [40, 40],
  'interaction': 'vertical',
  'mode': 'absolute', // "absolute" or "relative"
  'min': 0.5,
  'max': 5,
  'step': 0.001,
  'value': 0
});
geometryWidth.on('change', function(e) {
  console.log(parentTransform.children);
  var v = parentTransform.children;
  v.forEach(function(a) {
    a.scale.x = e;
  });
});

/* Visualizations http://annaxambo.me/pub/Roma_et_al_2018_A_Javascript_library.pdf */

/*afterimagePass.renderToScreen = false;
glitchPass.goWild = false;
if (glitchPass.renderToScreen == false) {
  renderPostOne = true;
  glitchPass.renderToScreen = true;
}*/