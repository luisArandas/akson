window.WUI_Reporting = true;

WUI_Dialog.create("master_dialog", {
  title: "Master Controls",
  width: "264px",
  height: "350px",
  halign: "left",
  valign: "center",
  open: true,
  minimized: false,
  on_open: null,
  on_close: function() {
    //WUI_Dialog.open("cockpit_dialog");
    //WUI_Dialog.open("master_dialog");
  },
  on_pre_detach: function() {},
  on_detach: function(new_window) {
    new_window.document.title = "Master";
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
  //detachable: false,
  keep_align_when_resized: false,
  top: -1850,
  left: 20
});

WUI_Dialog.create("savesettings_dialog", {
  title: "Save Settings",
  width: "300px",
  height: "310px",
  halign: "center",
  valign: "center",
  open: false,
  minimized: false,
  modal: false,
  closable: true,
  draggable: true,
  minimizable: true,
  resizable: false,
  //detachable: false,
  keep_align_when_resized: false,
  top: -1550,
  left: 0
});


WUI_Dialog.create("cockpit_dialog", {
  title: "Instruments", //'<div style="font-family: Monospace; font-size: 10px; color: lightgrey; position: absolute; margin-left: 8px;">---</div><span style="font-family: Monospace; font-size: 10px; color: lightgrey;">Instruments</span>',
  width: "850px",
  height: "325px",
  open: true,
  minimized: false,
  on_open: null,
  on_close: null,
  closable: true,
  draggable: true,
  minimizable: true,
  halign: "center",
  valign: "bottom",
  top: -2300
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

WUI_Dialog.create("demo_integrated_dialog", {
  title: "adsr - fazer um grande ",
  halign: "left",
  valign: "top",
  closable: false,
  draggable: true,
  //minimizable: true,
  status_bar: false,
  width: "195px",
  height: "210px",
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
  title: "mod_adsr",
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

WUI_Dialog.create("demo_integrated_dialog_4", {
  title: "reverb",
  halign: "left",
  valign: "top",
  closable: false,
  draggable: true,
  //minimizable: true,
  status_bar: false,
  width: "195px",
  height: "195px",
  top: -582,
  left: 280,
  header_btn: [{
    title: "?",
    on_click: function() {
      console.log("BOTON");
    },
    class_name: ""
  }],
});

WUI_Dialog.create("logs_dialog", {
  title: "Logs",
  width: "275px",
  height: "400px",
  halign: "right",
  valign: "center",
  closable: true,
  draggable: true,
  minimizable: true,
  resizable: false,
  status_bar: true,
  top: -700
});

WUI_Dialog.create("demo_integrated_dialog_5", {
  title: "background",
  halign: "left",
  valign: "top",
  closable: false,
  draggable: true,
  //minimizable: true,
  status_bar: false,
  width: "195px",
  height: "210px",
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

WUI_Dialog.create("demo_integrated_dialog_6", {
  title: "autoFilter",
  halign: "left",
  valign: "top",
  closable: false,
  draggable: true,
  //minimizable: true,
  status_bar: false,
  width: "195px",
  height: "210px",
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

WUI_Dialog.create("monitor_dialog", {
  title: "Monitor",
  width: "600px",
  height: "600px",
  halign: "center",
  valign: "center",
  open: false,
  minimized: false,
  on_open: function() {},
  on_close: function() {},
  on_pre_detach: function() {},
  on_detach: function(new_window) {
    new_window.document.title = "Monitor";
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
  top: -350,
  left: 0
});

WUI_Dialog.create("alocate_dialog", {
  title: "Allocate System",
  width: "380px",
  height: "176px",
  halign: "center",
  valign: "center",
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
  top: 0,
  left: 0
});

WUI_Dialog.create("about_this_dialog", {
  title: "System",
  width: "420px",
  height: "530px",
  halign: "center",
  valign: "center",
  open: false,
  closable: true,
  draggable: true,
  minimizable: true,
  resizable: false,
  status_bar: true,
  top: 350
});