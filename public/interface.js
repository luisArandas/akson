window.WUI_Reporting = true;

//allow console.log reporting

var master_dialog = WUI_Dialog.create("master_dialog", {
  title: "Master Controls",
  width: "275px",
  height: "400px",
  halign: "left",
  valign: "center",
  open: true, // wether the dialog is opened or not after creation
  minimized: false, // wether the dialog is minimized or not after creation
  on_open: null, // function called when the dialog has been opened
  on_close: null, // function called when the dialog has been closed
  on_pre_detach: function() {}, // function called before the dialog is detached
  on_detach: function(new_window) { // function called when the dialog is detached, the new `window` object is passed as argument
    new_window.document.title = "Master"; // replace the detached dialog title
    bind_contextmenu();
  },
  // function called when the dialog is resized, `new_width` and `new_height` is the new dimension of the dialog content
  on_resize: function(new_width, new_height) {},
  // you can add header buttons easily by using this (such as a help "?" button)
  header_btn: [{
    title: "Help",
    on_click: function() {
      // code called when the header button is clicked, redirecting to a documentation for example
    },
    class_name: "" // class name to use (you will generally need it if you want to show an icon like "?", use the background-image property to do so)
  }],
  modal: false,
  closable: false,
  draggable: true,
  minimizable: true,
  resizable: false,
  detachable: true,
  min_width: "title",
  min_height: 64,
  keep_align_when_resized: false,
  top: 10,
  left: 0
});


var cockpit_dialog = WUI_Dialog.create("cockpit_dialog", {
  title: "Instruments", //'<div style="font-family: Monospace; font-size: 10px; color: lightgrey; position: absolute; margin-left: 8px;">---</div><span style="font-family: Monospace; font-size: 10px; color: lightgrey;">Instruments</span>',
  width: "850px",
  height: "35%",
  halign: "center",
  valign: "bottom",
  open: true, // wether the dialog is opened or not after creation
  minimized: false, // wether the dialog is minimized or not after creation
  on_open: null, // function called when the dialog has been opened
  on_close: null, // function called when the dialog has been closed
  on_pre_detach: function() {}, // function called before the dialog is detached
  // function called when the dialog is detached, the new `window` object is passed as argument
  on_detach: function(new_window) {
    // you can modify the detachable window there, example:
    new_window.document.title = "Instruments and Controls"; // replace the detached dialog title
  },
  // function called when the dialog is resized, `new_width` and `new_height` is the new dimension of the dialog content
  on_resize: function(new_width, new_height) {},
  // you can add header buttons easily by using this (such as a help "?" button)
  header_btn: [{
    title: "?",
    on_click: function() {
      console.log("BOTON");
    },
    class_name: "" // class name to use (you will generally need it if you want to show an icon like "?", use the background-image property to do so)
  }],
  modal: false,

  // wether the dialog have a status bar
  //status_bar: true,
  // HTML content of the status bar
  //status_bar_content: "status bar content",

  closable: false,
  draggable: true,
  minimizable: true,
  //resizable: true,
  detachable: true,
  // the minimun width/height the dialog can be when resized (min_width accept a value or "title")
  min_width: "title",
  min_height: 64,
  // option to keep the align when resized, example: if the dialog is centered in the window, the dialog will always be in center when it is resized
  keep_align_when_resized: true,
  // can be used to position the dialog, default to 0
  top: 0,
  left: 0,
});

WUI_Tabs.create("my_tabs", {
  // function called when a tab is clicked (tab index will be passed as argument)
  on_tab_click: console.log("ok"),
  // style value for the content height
  height: "100%" // this is the default value
});


WUI_DropDown.create("my_dropdown", {
    width: "100px",
    height: "35px",
    // the space between the floating list of items and the dropdown "button"
    vspacing: 10,
    // time before the floating list close
    ms_before_hiding: 500,
    // default item (id) to be selected after creation
    selected_id: 0,
    vertical: false,
    // function called when an item is selected, the item index is passed as argument
    on_item_selected: console.log("on_item_selected_func")
  },
  // a list of items
  ["First item", "Second item", "Third item"]
);

WUI_Dialog.create("demo_integrated_dialog", {
  title: "adsr",
  halign: "left",
  valign: "top",
  closable: false,
  draggable: true,
  minimizable: true,
  status_bar: false,
  width: "195px",
  height: "195px",
  top: 3,
  left: -325
});

WUI_Dialog.create("demo_integrated_dialog_2", {
  title: "methods",
  halign: "left",
  valign: "top",
  closable: false,
  draggable: true,
  minimizable: true,
  status_bar: false,
  width: "195px",
  height: "195px",
  top: -192,
  left: -125
});

WUI_Dialog.create("demo_integrated_dialog_3", {
  title: "methods",
  halign: "left",
  valign: "top",
  closable: false,
  draggable: true,
  minimizable: true,
  status_bar: false,
  width: "195px",
  height: "195px",
  top: -387,
  left: 75
});


function bind_contextmenu(win) {
  console.log("ok");
  win.document.addEventListener("contextmenu", function(ev) {
    ev.preventDefault();

    WUI_CircularMenu.create({
      x: ev.pageX,
      y: ev.pageY,

      rx: 34,
      ry: 34,

      window: win
    }, circular_menu_items);
  });
}
bind_contextmenu(window);