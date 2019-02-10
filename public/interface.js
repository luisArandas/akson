window.WUI_Reporting = true;

var master_dialog = WUI_Dialog.create("master_dialog", {
  title: "Master Controls",
  width: "275px",
  height: "400px",
  halign: "left",
  valign: "center",
  open: true,
  minimized: false,
  on_open: null,
  on_close: function() {
    //WUI_Dialog.open("cockpit_dialog");
    //WUI_Dialog.create("master_dialog");
  },
  on_pre_detach: function() {},
  on_detach: function(new_window) {
    new_window.document.title = "Master";
    bind_contextmenu();
  },
  on_resize: function(new_width, new_height) {},
  modal: false,
  closable: false,
  draggable: true,
  minimizable: true,
  resizable: false,
  detachable: true,
  keep_align_when_resized: false,
  top: -250,
  left: 0
});


var cockpit_dialog = WUI_Dialog.create("cockpit_dialog", {
  title: "Instruments", //'<div style="font-family: Monospace; font-size: 10px; color: lightgrey; position: absolute; margin-left: 8px;">---</div><span style="font-family: Monospace; font-size: 10px; color: lightgrey;">Instruments</span>',
  width: "850px",
  height: "280px",
  halign: "center",
  valign: "bottom",
  open: true,
  minimized: false,
  on_open: null,
  on_close: null,
  on_pre_detach: function() {},
  on_detach: function(new_window) {
    new_window.document.title = "Instruments and Controls"; // replace the detached dialog title
  },
  on_resize: function(new_width, new_height) {},
  header_btn: [{
    title: "?",
    on_click: function() {
      console.log("BOTON");
    },
    class_name: ""
  }],
  modal: false,
  closable: false,
  draggable: true,
  minimizable: true,
  detachable: true,
  min_width: "title",
  min_height: 64,
  keep_align_when_resized: true,
  top: 0,
  left: 0,
});

WUI_Tabs.create("my_tabs", {
  // function called when a tab is clicked (tab index will be passed as argument)
  // on_tab_click: console.log("ok"),
  // style value for the content height
});

WUI_Dialog.create("demo_integrated_dialog", {
  title: "adsr",
  halign: "left",
  valign: "top",
  closable: false,
  draggable: true,
  //minimizable: true,
  status_bar: false,
  width: "195px",
  height: "195px",
  top: 3,
  left: -325,
  header_btn: [{
    title: "?",
    on_click: function() {
      console.log("BOTON");
    },
    class_name: ""
  }],
});

WUI_Dialog.create("demo_integrated_dialog_2", {
  title: "methods",
  halign: "left",
  valign: "top",
  closable: false,
  draggable: true,
  //minimizable: true,
  status_bar: false,
  width: "195px",
  height: "195px",
  top: -192,
  left: -125,
  header_btn: [{
    title: "?",
    on_click: function() {
      console.log("BOTON");
    },
    class_name: ""
  }],
});

WUI_Dialog.create("demo_integrated_dialog_3", {
  title: "methods",
  halign: "left",
  valign: "top",
  closable: false,
  draggable: true,
  //minimizable: true,
  status_bar: false,
  width: "195px",
  height: "195px",
  top: -387,
  left: 75,
  header_btn: [{
    title: "?",
    on_click: function() {
      console.log("BOTON");
    },
    class_name: ""
  }],
});


WUI_Dialog.create("logs_ok", {
  title: "Logs",
  width: "275px",
  height: "400px",
  halign: "right",
  valign: "center",
  closable: false,
  draggable: true,
  minimizable: true,
  resizable: false,
  status_bar: true
});