/**
 * @author Luis Arandas  http://luisarandas.org
 * @author José Alberto Gomes  http://jasg.net/Home.html
 * @author Rui Penha  http://ruipenha.pt/
 *
 *  All this code was done under the context of a research
 *  between Braga Media Arts and the University of Porto © 2019
 */


window.WUI_Reporting = true;

WUI_Dialog.create("master_dialog", {
  title: "Master Controls",
  width: "264px",
  height: "350px",
  open: true,
  minimized: false,
  on_open: null,
  on_close: function() {},
  on_pre_detach: function() {},
  on_detach: function(new_window) {},
  on_resize: function(new_width, new_height) {},
  on_minimize: function() {
    console.log("");
  },
  modal: false,
  closable: true,
  draggable: true,
  minimizable: true,
  resizable: false,
  detachable: false,
  keep_align_when_resized: true,
  top: 5,
  left: 10
});

WUI_Dialog.create("savesettings_dialog", {
  title: "Save Settings",
  width: "300px",
  height: "230px",
  open: false,
  minimized: false,
  modal: false,
  closable: true,
  draggable: true,
  minimizable: true,
  resizable: false,
  //detachable: false,
  keep_align_when_resized: false,
  top: 5,
  left: 10
});



WUI_Dialog.create("cockpit_dialog", {
  title: "Instruments",
  width: "853px",
  height: "330px",
  open: true,
  minimized: true,
  minimized: false,
  on_open: null,
  on_close: function() {},
  on_pre_detach: function() {},
  on_detach: function(new_window) {},
  on_resize: function(new_width, new_height) {},
  on_minimize: function() {
    console.log("");
  },
  modal: false,
  closable: true,
  draggable: true,
  minimizable: true,
  resizable: false,
  detachable: false,
  keep_align_when_resized: true,
  top: 75,
  left: 10
});

WUI_Tabs.create("tabs_instrumentos", {
  // function called when a tab is clicked (tab index will be passed as argument)
  // on_tab_click: console.log("ok"),
  // style value for the content height
});

WUI_Tabs.create("tabs_about", {
  // function called when a tab is clicked (tab index will be passed as argument)
  // on_tab_click: console.log("ok"),
  // style value for the content height
});


WUI_Dialog.create("logs_dialog", {
  title: "Logs",
  width: "275px",
  height: "400px",
  open: true,
  minimized: true,
  minimized: false,
  on_open: null,
  on_close: function() {},
  on_pre_detach: function() {},
  on_detach: function(new_window) {},
  on_resize: function(new_width, new_height) {},
  on_minimize: function() {
    console.log("");
  },
  modal: false,
  closable: true,
  draggable: true,
  minimizable: true,
  resizable: false,
  detachable: false,
  keep_align_when_resized: true,
  top: 40,
  left: 10
});

WUI_Dialog.create("alocate_dialog", {
  title: "Allocate System",
  width: "380px",
  height: "176px",
  open: false,
  minimized: false,
  on_open: function() {},
  on_close: function() {
    document.getElementById('inst1').style.pointerEvents = "auto";
    document.getElementById('inst2').style.pointerEvents = "auto";
    document.getElementById('inst3').style.pointerEvents = "auto";
    document.getElementById('inst4').style.pointerEvents = "auto";
  },
  on_pre_detach: function() {},
  on_detach: function(new_window) {
    new_window.document.title = "Alocate";
    bind_contextmenu();
  },
  on_resize: function(new_width, new_height) {},
  on_minimize: function() {
    console.log("teste");
  },
  modal: false,
  closable: true,
  draggable: true,
  minimizable: true,
  resizable: false,
  //detachable: true,
  keep_align_when_resized: false,
  top: 5,
  left: 10
});

WUI_Dialog.create("about_this_dialog", {
  title: "System",
  width: "420px",
  height: "530px",
  open: false,
  closable: true,
  draggable: true,
  minimizable: true,
  resizable: false,
  status_bar: true,
  top: 5,
  left: 10
});
