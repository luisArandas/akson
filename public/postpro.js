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

/*afterimagePass.renderToScreen = false;
glitchPass.goWild = false;
if (glitchPass.renderToScreen == false) {
  renderPostOne = true;
  glitchPass.renderToScreen = true;
}*/