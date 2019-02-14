var shaderGlitchAmmount = Math.random() / 90;
var shaderSeedY = THREE.Math.randFloat(-0.3, 0.3);

var shaderControlOne = new Nexus.Slider('#shaderControlOne', {
  min: -5,
  max: 5,
  step: 0.001,
  mode: 'absolute',
  value: 0
});
shaderControlOne.on('change', function(v) {
  glitchPass.uniforms.seed_x = v
  console.log(glitchPass.uniforms.seed_x);
});