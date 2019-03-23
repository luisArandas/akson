/* Graphics Post Production */

var w = window.innerWidth;
var h = window.innerHeight;
var fullWidth = w * 3;
var fullHeight = h * 2;

var sceneMaster = new Nexus.Slider('#sceneMaster', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': -15
});
sceneMaster.on('change', function(e) {
  light.intensity = e; //todas
  /*light2.intensity = e; //quatro
  light7.intensity = e; //3
  directionalLight5.intensity = e; //dois
  directionalLight7.intensity = e; //3
  ambientLight.intensity = e; //todas
  ambientLight2.intensity = e; //quatro
  ambientLight5.intensity = e;
  ambientLight7.intensity = e; //3
  light1._value.update(e);
  light1.render();*/
});

var light1 = new Nexus.Slider('#light1', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': 1
});
light1.on('change', function(e) {
  light.intensity = e;
});
//camera.position.x


var cameraM1 = new Nexus.Slider('#cameraM1', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': -170,
  'max': 170,
  'step': 0.001,
  'value': 80
});
cameraM1.on('change', function(e) {
  camera.fov = e;
  console.log(camera.fov);
  camera.updateProjectionMatrix();
});

var cameraM2 = new Nexus.Slider('#cameraM2', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 2,
  'step': 0.001,
  'value': 1
});
cameraM2.on('change', function(e) {
  camera.zoom = e;
  console.log(camera.zoom);
  camera.updateProjectionMatrix();
});

var cameraM3 = new Nexus.Slider('#cameraM3', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5,
  'step': 0.0001,
  'value': 1
});
cameraM3.on('change', function(e) {
  /* See this!!! */
  camera.aspect = e;
  camera.updateProjectionMatrix();
});

var cameraM4 = new Nexus.Slider('#cameraM4', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 1,
  'max': 2000,
  'step': 0.001,
  'value': 1
});
cameraM4.on('change', function(e) {
  camera.near = e;
  camera.updateProjectionMatrix();
});

var cameraM5 = new Nexus.Slider('#cameraM5', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5000,
  'step': 0.001,
  'value': 1000
});
cameraM5.on('change', function(e) {
  camera.setViewOffset(e, fullHeight, w * 1, h * 0, w, h);
  camera.updateProjectionMatrix();
});

var cameraM6 = new Nexus.Slider('#cameraM6', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5000,
  'step': 0.001,
  'value': 1000
});
cameraM6.on('change', function(e) {
  camera.setViewOffset(fullWidth, e, w * 1, h * 0, w, h);
  camera.updateProjectionMatrix();
});

var cameraM7 = new Nexus.Slider('#cameraM7', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': 1
});
cameraM7.on('change', function(e) {
  camera.setViewOffset(fullWidth, fullHeight, w * e, h * 0, w, h);
  camera.updateProjectionMatrix();
});

var cameraM8 = new Nexus.Slider('#cameraM8', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5,
  'step': 0.001,
  'value': 1
});
cameraM8.on('change', function(e) {
  camera.setViewOffset(fullWidth, fullHeight, w * 1, h * e, w, h);
  camera.updateProjectionMatrix();
});

var cameraM9 = new Nexus.Slider('#cameraM9', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': -5,
  'max': 5,
  'step': 0.001,
  'value': 0
});
cameraM9.on('change', function(e) {
  camera.setViewOffset(fullWidth, fullHeight, w * e, h * 0, fullWidth, fullHeight);
  camera.updateProjectionMatrix();
});

var cameraM10 = new Nexus.Slider('#cameraM10', {
  'size': [120, 20],
  'mode': 'relative', // "absolute" or "relative"
  'min': -5,
  'max': 5,
  'step': 0.001,
  'value': 0
});
cameraM10.on('change', function(e) {
  camera.setViewOffset(fullWidth, fullHeight, w * 0, h * e, fullWidth, fullHeight);
  camera.updateProjectionMatrix();
});



function camOffsetDefault(a) {
  if (a === 'set1') {
    camera.setViewOffset(fullWidth, fullHeight, w * 1, h * 0, w, h);
  }
  if (a === 'set2') {
    camera.setViewOffset(fullWidth, fullHeight, w * 0, h * 0, w, h);
  }
  if (a === 'set3') {
    camera.setViewOffset(fullWidth, fullHeight, w * 2, h * 0, w, h);
  }
  if (a === 'set4') {
    camera.setViewOffset(fullWidth, fullHeight, w * 0, h * 1, w, h);
  }
  if (a === 'set5') {
    camera.setViewOffset(fullWidth, fullHeight, w * 1, h * 1, w, h);
  }
  if (a === 'set6') {
    camera.setViewOffset(fullWidth, fullHeight, w * 2, h * 1, w, h);
  }
  if (a === 'clear') {
    camera.clearViewOffset();
  }
}

function camNear(a) {
  if (a === 'kill') {
    camera.near = 0;
    camera.updateProjectionMatrix();
    console.log("kill");
  }
  if (a === 'born') {
    camera.near = 1;
    camera.updateProjectionMatrix();
    console.log("no");
  }

}

//4 lights

/* PostPro */

var camera1_1 = new Nexus.Slider('#camera1_1', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera1_1.on('change', function(e) {
  parentTransform.scale.x = e;
  //parentTransform.scale.y = e;
  //parentTransform.scale.z = e;
});

var camera1_2 = new Nexus.Slider('#camera1_2', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera1_2.on('change', function(e) {
  parentTransform.scale.y = e;
});

var camera1_3 = new Nexus.Slider('#camera1_3', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera1_3.on('change', function(e) {
  parentTransform.scale.z = e;
});

document.getElementById("cockpit_dialog").addEventListener("mouseenter", function() {
  mouseDown = 0;
});
document.getElementById("cockpit_dialog").addEventListener("mouseout", function() {
  mouseDown = 0;
});

var camera2_1 = new Nexus.Slider('#camera2_1', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera2_1.on('change', function(e) {
  parentTransformDois.scale.x = e;
  mouseDown = 0;
});

var camera2_2 = new Nexus.Slider('#camera2_2', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera2_2.on('change', function(e) {
  parentTransformDois.scale.y = e;
  mouseDown = 0;
});

var camera2_3 = new Nexus.Slider('#camera2_3', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera2_3.on('change', function(e) {
  parentTransformDois.scale.z = e;
  mouseDown = 0;
});

var camera3_1 = new Nexus.Slider('#camera3_1', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera3_1.on('change', function(e) {
  parentTransformTres.scale.x = e;
  mouseDown = 0;
});

var camera3_2 = new Nexus.Slider('#camera3_2', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera3_2.on('change', function(e) {
  parentTransformTres.scale.y = e;
  mouseDown = 0;
});

var camera3_3 = new Nexus.Slider('#camera3_3', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera3_3.on('change', function(e) {
  parentTransformTres.scale.z = e;
  mouseDown = 0;
});

var camera4_1 = new Nexus.Slider('#camera4_1', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera4_1.on('change', function(e) {
  parentTransformQuatro.scale.x = e;
  mouseDown = 0;
});

var camera4_2 = new Nexus.Slider('#camera4_2', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera4_2.on('change', function(e) {
  parentTransformQuatro.scale.y = e;
  mouseDown = 0;
});

var camera4_3 = new Nexus.Slider('#camera4_3', {
  'size': [120, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0.35,
  'max': 3,
  'step': 0.00001,
  'value': 1
});
camera4_3.on('change', function(e) {
  parentTransformQuatro.scale.z = e;
  mouseDown = 0;
});

/* Fazer 4 luzes diferentes */

// change
/*
var camera2 = new Nexus.Dial('#camera2', {
  'size': [40, 40],
  'interaction': 'vertical',
  'mode': 'absolute', // "absolute" or "relative"
  'min': 0.8,
  'max': 1.2,
  'step': 0.0001,
  'value': 0
});
camera2.on('change', function(e) {
  parentTransformDois.scale.x = e;
  parentTransformDois.scale.y = e;
  parentTransformDois.scale.z = e;
});

var camera3 = new Nexus.Dial('#camera3', {
  'size': [40, 40],
  'interaction': 'vertical',
  'mode': 'absolute', // "absolute" or "relative"
  'min': 0.8,
  'max': 3,
  'step': 0.0001,
  'value': 0
});
camera3.on('change', function(e) {
  parentTransformTres.scale.x = e;
  parentTransformTres.scale.y = e;
  parentTransformTres.scale.z = e;
});

var camera4 = new Nexus.Dial('#camera4', {
  'size': [40, 40],
  'interaction': 'vertical',
  'mode': 'absolute', // "absolute" or "relative"
  'min': 0.8,
  'max': 3,
  'step': 0.0001,
  'value': 0
});
camera4.on('change', function(e) {
  parentTransformQuatro.scale.x = e;
  parentTransformQuatro.scale.y = e;
  parentTransformQuatro.scale.z = e;
});

*/


/* Shaders */

/*
afterimagePass.renderToScreen = false;
     effectSobel.renderToScreen = false;
     pixelPass.renderToScreen = false;
     glitchPass.goWild = false;
     if (glitchPass.renderToScreen == false) {
       renderPostOne = true;
       glitchPass.renderToScreen = true;
     }
*/

function shaderButtons(v) {
  if (v == "noise1") {
    renderPostOne = true;
    glitchPass.renderToScreen = true;
  }
  if (v == "noise2") {

  }
  if (v == "rev") {

  }
}








/*geometryWidth.on('change', function(e) {
  console.log(parentTransform.children);
  var v = parentTransform.children;
  v.forEach(function(a) {
    a.scale.x = e;
  });
});*/

/* Visualizations http://annaxambo.me/pub/Roma_et_al_2018_A_Javascript_library.pdf */

/*afterimagePass.renderToScreen = false;
glitchPass.goWild = false;
if (glitchPass.renderToScreen == false) {
  renderPostOne = true;
  glitchPass.renderToScreen = true;
}*/

/* Shaders

<
script id = "vertex-shader"
type = "x-shader/x-vertex" >
  uniform float time;
varying vec2 vUv;


void main() {
    vec3 posChanged = position;
    posChanged.x = posChanged.x * (abs(sin(time * 1.0)));
    posChanged.y = posChanged.y * (abs(cos(time * 1.0)));
    posChanged.z = posChanged.z * (abs(sin(time * 1.0)));
    //gl_Position = projectionMatrix * modelViewMatrix * vec4(position*(abs(sin(time)/2.0)+0.5),1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(posChanged, 1.0);
  }

  <
  /script>

  <
  script id = "fragment-shader-1"
type = "x-shader/x-fragment" >
  precision highp float;
uniform float time;
uniform float alpha;
uniform vec2 resolution;
varying vec2 vUv;

void main2(void) {
  vec2 position = vUv;
  float red = 1.0;
  float green = 0.25 + sin(time) * 0.25;
  float blue = 0.0;
  vec3 rgb = vec3(red, green, blue);
  vec4 color = vec4(rgb, alpha);
  gl_FragColor = color;
}

# define PI 3.14159# define TWO_PI(PI * 2.0)# define N 68.5

void main(void) {
    vec2 center = (gl_FragCoord.xy);
    center.x = -10.12 * sin(time / 200.0);
    center.y = -10.12 * cos(time / 200.0);

    vec2 v = (gl_FragCoord.xy - resolution / 20.0) / min(resolution.y, resolution.x) * 15.0;
    v.x = v.x - 10.0;
    v.y = v.y - 200.0;
    float col = 0.0;

    for (float i = 0.0; i < N; i++) {
      float a = i * (TWO_PI / N) * 61.95;
      col += cos(TWO_PI * (v.y * cos(a) + v.x * sin(a) + sin(time * 0.004) * 100.0));
    }

    col /= 5.0;

    gl_FragColor = vec4(col * 1.0, -col * 1.0, -col * 4.0, 1.0);
  }


  <
  /script>

  <
  script id = "fragment-shader-2"
type = "x-shader/x-fragment" >
  // from http://glsl.heroku.com/e#7906.0


  uniform float time;
uniform vec2 resolution;

// 2013-03-30 by @hintz

#
define CGFloat float# define M_PI 3.14159265359

vec3 hsvtorgb(float h, float s, float v) {
  float c = v * s;
  h = mod((h * 6.0), 6.0);
  float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
  vec3 color;

  if (0.0 <= h && h < 1.0) {
    color = vec3(c, x, 0.0);
  } else if (1.0 <= h && h < 2.0) {
    color = vec3(x, c, 0.0);
  } else if (2.0 <= h && h < 3.0) {
    color = vec3(0.0, c, x);
  } else if (3.0 <= h && h < 4.0) {
    color = vec3(0.0, x, c);
  } else if (4.0 <= h && h < 5.0) {
    color = vec3(x, 0.0, c);
  } else if (5.0 <= h && h < 6.0) {
    color = vec3(c, 0.0, x);
  } else {
    color = vec3(0.0);
  }

  color += v - c;

  return color;
}

void main(void) {

    vec2 position = (gl_FragCoord.xy - 0.5 * resolution) / resolution.y;
    float x = position.x;
    float y = position.y;

    CGFloat a = atan(x, y);

    CGFloat d = sqrt(x * x + y * y);
    CGFloat d0 = 0.5 * (sin(d - time) + 1.5) * d;
    CGFloat d1 = 5.0;

    CGFloat u = mod(a * d1 + sin(d * 10.0 + time), M_PI * 2.0) / M_PI * 0.5 - 0.5;
    CGFloat v = mod(pow(d0 * 4.0, 0.75), 1.0) - 0.5;

    CGFloat dd = sqrt(u * u + v * v);

    CGFloat aa = atan(u, v);

    CGFloat uu = mod(aa * 3.0 + 3.0 * cos(dd * 30.0 - time), M_PI * 2.0) / M_PI * 0.5 - 0.5;
    // CGFloat vv = mod(dd*4.0,1.0) - 0.5;

    CGFloat d2 = sqrt(uu * uu + v * v) * 1.5;

    gl_FragColor = vec4(hsvtorgb(dd + time * 0.5 / d1, sin(dd * time), d2), 1.0);
  }

  <
  /script>

  <
  script id = "fragment-shader-3"
type = "x-shader/x-fragment" >
  uniform vec2 resolution;
uniform float time;

vec2 rand(vec2 pos) {
  return fract(0.00005 * (pow(pos + 2.0, pos.yx + 1.0) * 22222.0));
}
vec2 rand2(vec2 pos) {
  return rand(rand(pos));
}

float softnoise(vec2 pos, float scale) {
  vec2 smplpos = pos * scale;
  float c0 = rand2((floor(smplpos) + vec2(0.0, 0.0)) / scale).x;
  float c1 = rand2((floor(smplpos) + vec2(1.0, 0.0)) / scale).x;
  float c2 = rand2((floor(smplpos) + vec2(0.0, 1.0)) / scale).x;
  float c3 = rand2((floor(smplpos) + vec2(1.0, 1.0)) / scale).x;

  vec2 a = fract(smplpos);
  return mix(
    mix(c0, c1, smoothstep(0.0, 1.0, a.x)),
    mix(c2, c3, smoothstep(0.0, 1.0, a.x)),
    smoothstep(0.0, 1.0, a.y));
}

void main(void) {
    vec2 pos = gl_FragCoord.xy / resolution.y;
    pos.x += time * 0.1;
    float color = 0.0;
    float s = 1.0;
    for (int i = 0; i < 8; i++) {
      color += softnoise(pos + vec2(i) * 0.02, s * 4.0) / s / 2.0;
      s *= 2.0;
    }
    gl_FragColor = vec4(color);
  }

  <
  /script>

  <
  script id = "fragment-shader-4"
type = "x-shader/x-fragment" >


  uniform float time;
uniform vec2 resolution;

vec2 rand(vec2 pos) {
  return
  fract(
    (
      pow(
        pos + 2.0,
        pos.yx + 2.0
      ) * 555555.0
    )
  );
}

vec2 rand2(vec2 pos) {
  return rand(rand(pos));
}

float softnoise(vec2 pos, float scale) {
  vec2 smplpos = pos * scale;
  float c0 = rand2((floor(smplpos) + vec2(0.0, 0.0)) / scale).x;
  float c1 = rand2((floor(smplpos) + vec2(1.0, 0.0)) / scale).x;
  float c2 = rand2((floor(smplpos) + vec2(0.0, 1.0)) / scale).x;
  float c3 = rand2((floor(smplpos) + vec2(1.0, 1.0)) / scale).x;

  vec2 a = fract(smplpos);
  return mix(mix(c0, c1, smoothstep(0.0, 1.0, a.x)),
    mix(c2, c3, smoothstep(0.0, 1.0, a.x)),
    smoothstep(0.0, 1.0, a.x));
}

void main(void) {
    vec2 pos = gl_FragCoord.xy / resolution.y - time * 0.4;

    float color = 0.0;
    float s = 1.0;
    for (int i = 0; i < 6; ++i) {
      color += softnoise(pos + vec2(0.01 * float(i)), s * 4.0) / s / 2.0;
      s *= 2.0;
    }
    gl_FragColor = vec4(color, mix(color, cos(color), sin(color)), color, 1);
  }

  <
  /script>

  <
  script id = "fragment-shader-5"
type = "x-shader/x-fragment" >

  uniform float time;
uniform vec2 resolution;

// tie nd die by Snoep Games.

void main(void) {

    vec3 color = vec3(1.0, 0., 0.);
    vec2 pos = ((1.4 * gl_FragCoord.xy - resolution.xy) / resolution.xx) * 1.5;
    float r = sqrt(pos.x * pos.x + pos.y * pos.y) / 15.0;
    float size1 = 2.0 * cos(time / 60.0);
    float size2 = 2.5 * sin(time / 12.1);

    float rot1 = 13.00; //82.0+16.0*sin(time/4.0);
    float rot2 = -50.00; //82.0+16.0*sin(time/8.0);
    float t = sin(time);
    float a = (60.0) * sin(rot1 * atan(pos.x - size1 * pos.y / r, pos.y + size1 * pos.x / r) + time);
    a += 200.0 * acos(pos.x * 2.0 + cos(time / 2.0)) + asin(pos.y * 5.0 + sin(time / 2.0));
    a = a * (r / 50.0);
    a = 200.0 * sin(a * 5.0) * (r / 30.0);
    if (a > 5.0) a = a / 200.0;
    if (a < 0.5) a = a * 22.5;
    gl_FragColor = vec4(cos(a / 20.0), a * cos(a / 200.0), sin(a / 8.0), 1.0);
  }


  <
  /script>

  <
  script id = "fragment-shader-6"
type = "x-shader/x-fragment" >


  uniform float time;
uniform vec2 resolution;


void main(void) {

    vec2 uPos = (gl_FragCoord.xy / resolution.xy); //normalize wrt y axis
    //suPos -= vec2((resolution.x/resolution.y)/2.0, 0.0);//shift origin to center

    uPos.x -= 1.0;
    uPos.y -= 0.5;

    vec3 color = vec3(0.0);
    float vertColor = 2.0;
    for (float i = 0.0; i < 15.0; ++i) {
      float t = time * (0.9);

      uPos.y += sin(uPos.x * i + t + i / 2.0) * 0.1;
      float fTemp = abs(1.0 / uPos.y / 100.0);
      vertColor += fTemp;
      color += vec3(fTemp * (10.0 - i) / 10.0, fTemp * i / 10.0, pow(fTemp, 1.5) * 1.5);
    }

    vec4 color_final = vec4(color, 1.0);
    gl_FragColor = color_final;
  }

  <
  /script>*/