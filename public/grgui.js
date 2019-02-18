/* For post Process */

function shaderButtons(v) {
  var logs = document.getElementById('logs'),
    output_node = document.createElement("div");
  output_node.innerHTML = "This doesn't work right now, sorry.<br> Post processing shaders can be acessed through the keyboard keys A, S and D. <br> This is not fully implemented so use at your own risk.";
  logs.appendChild(output_node);
  logs.scrollTop = logs.scrollHeight;
}