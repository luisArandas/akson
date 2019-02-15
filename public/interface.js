window.WUI_Reporting = true;

WUI_Dialog.create("master_dialog", {
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
  closable: false,
  draggable: true,
  minimizable: true,
  resizable: false,
  //detachable: true,
  keep_align_when_resized: false,
  top: -250,
  left: 0
});

WUI_Dialog.create("cockpit_dialog", {
  title: "Instruments", //'<div style="font-family: Monospace; font-size: 10px; color: lightgrey; position: absolute; margin-left: 8px;">---</div><span style="font-family: Monospace; font-size: 10px; color: lightgrey;">Instruments</span>',
  width: "850px",
  height: "325px",
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
  //detachable: true,
  min_width: "title",
  min_height: 64,
  keep_align_when_resized: true,
  top: 0,
  left: 0,
});

WUI_Tabs.create("tabs_instrumentos", {
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

WUI_Dialog.create("logs_dialog", {
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

/*---------------------------------------------------*/
WUI_RangeSlider.create("slider_teste", {
  // width/height of the slider, if you make a vertical slider, you should swap theses values
  width: 300,
  height: 8,
  // the value range, -100 <-> 100, optional
  min: -100,
  max: 100,
  // standard increment when dragging NOTE : can be "any" if you need to accept both decimals and integers for the validation ("step" is just the bare "step" input attribute value actually!)
  step: 1,
  // on mouse wheel increment
  scroll_step: 2,
  vertical: false,
  // max number of decimals to display for decimal values (default to 4)
  decimals: 4,
  // the widget default value (used for "reset to default" behaviors)
  default_value: 0,
  // the widget current value
  value: 0.5,
  // this will place the title on top and the value at the bottom, good for vertical sliders
  title_on_top: true,
  title: "my range slider",
  // enable the slider to be controllable by MIDI
  // can be a boolean (or anything) if you do not need to configure it, otherwise an object with a fiel "type" with value "rel" or "abs", by default the control type is set to "abs"
  midi: false,
  // used to line up multiple sliders perfectly
  title_min_width: 150,
  value_min_width: 48,
  // allow the user to configure the parameters of the slider, a settings button will appear around the slider and when it is clicked, a box with input fields will allow the user to change range and step values
  // this can be usefull if an "unlimited" slider is needed or simply to allow the step to be changed by the user
  // Note: if you want a few parameters to be configurable, just remove those you don't want in that object
  configurable: {
    // this allow the "min" parameter of the slider to be configurable
    // "min" and "max" is the allowed range of the created input field, it is used to set some boundaries to what range of values the user can set
    // it is also possible to leave the object empty (like "max" below) to allow unlimited sliders (any values for min/max will be then allowed, allowing the user to extend the range as he like)
    min: {
      min: -100,
      max: 100
    },
    max: {},
    step: {
      min: 0.1,
      max: 2
    },
    scroll_step: {
      max: 5
    }
  },
  // function to call when the slider value change with the value passed as argument
  on_change: function() {
    console.log("");
  } //slider_change
});
/*---------------------------------------------------*/