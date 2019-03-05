// check https://doc.esdoc.org/github.com/adzialocha/osc-js/

/*const mediaSource = new MediaSource();
console.log(mediaSource);
https://github.com/webrtc/samples/tree/gh-pages/src/content/capture/canvas-record
https://github.com/imgntn/j360
Media Source Recorder */

var osc = new OSC();
osc.open(); // connect by default to ws://localhost:8080

document.getElementById('send').addEventListener('click', () => {
  var message = new OSC.Message('/test/random', Math.random());
  osc.send(message);
});
console.log("osc y");
/* For post Process
function shaderButtons(v) {
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "This doesn't work right now, sorry.<br> Post processing shaders can be acessed through the keyboard keys A, S and D. <br> This is not fully implemented so use at your own risk.";
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
}*/