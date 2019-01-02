document.addEventListener("DOMContentLoaded", function(event) {
  const root = parseDirObjects($(root_object));
  const page = $(document);

  // open root and trash for debug.
  // root.formation('expand');
  // parseDirObjects($('[data-ext=trash]')).formation('expand');

  // Start MouseClick event listener.
  page.on('dblclick mousedown', function(e) {
    // turn the target into a jQ object.
    const target = $(e.target);
    // remove any previously created context menus.
    context_menu.remove();
    // finalize any previously created forms.
    finalizeFormFields();
    // filter for clicks inside this app's scope.
    if (target.is(app_icon)) {
      // prevent default browser click events.
      e.preventDefault();

      // define the values used within click listener:
      const is_menu_icon = target.is('.menu-icon');
      let ref_element = target;
      // if the target is a menu icon set the ref_element to the selected Dir Object.
      if (is_menu_icon) { ref_element = $(selected_ref) };
      // get the data-object-id which refers to a Dir Object.
      const data_id = ref_element.attr('data-object-id');
      // parse and instantiate the Dir Object in this scope.
      const dir_object = parseDirObjects(data_id);
      const trashed = dir_object.trashed;

      // the select function highlights the object in green for the user.
      dir_object.select();

      // separate the click events by which(l/r clicks), type(single/double), and target class.
      if (e.which === 1) {
        if (e.type === 'dblclick') {
          if (dir_object.type === "folder" && !trashed) {
            const folder = dir_object;
            if (target.hasAnyClass('folder-icon name-icon')) {
                folder.formation("toggle");
            };
          } else if (dir_object.type === 'file' && !trashed) {
            file = dir_object;
            file.open();
          };
        } else if (e.type === 'mousedown') {
          if (target.hasClass('arrow-icon') && !trashed) {
            const folder = dir_object;
            folder.formation("toggle");
          } else if (is_menu_icon) {
            command = target.text();
            dir_object.runCommand(command);
          };
        };
      } else if (e.which === 3) {
        if (e.type === 'mousedown') {
          if (!is_menu_icon && !target.hasClass('arrow-icon')) {
            dir_object.openContextMenu(e);
          };
        }
      }; // end click-control switch.
    } else {
      deselectAll();
    };
  });  // end myProjects Click Listener

  // listen for keydown events as hotkeys
  page.on('keydown', function(e) {
    const x = e || window.event;
    const key = (x.keyCode || x.which);
    const obj = $(selected_ref);
    // console.log(key);
    // remove any previously created context menus
    context_menu.remove();
    if ($(active_form_ref).length === 0) {
      // if the user is not typing characters, use hotkeys.
      e.preventDefault();
      if (obj.length) {
        const dir_object = parseDirObjects(obj);
        const trashed = dir_object.trashed;
        // hotkey switch.
        switch(key) {
        case 13: case 3: // Enter key
          if (!trashed) {
            const type = dir_object.type;
            if (type === 'folder' || type === 'trash') {
              const folder = dir_object;
              folder.formation('toggle');
            } else if (type === 'file') {
              const file = dir_object;
              file.open();
            };
          }; break;
        case 37: case 38: // Up and Left arrow keys
          dir_object.selectPrev(); break;
        case 39: case 40: // Down and Right arrow keys
          dir_object.selectNext(); break;
        case 46: // Delete key
          dir_object.trashOrDelete(); break;
        case 78: // 'n' key
          if (!trashed) { dir_object.addObject('folder'); }; break;
        case 70: // 'f' key
          if (!trashed) { dir_object.addObject('file'); }; break;
        case 82: // 'r' key
          if (!trashed) { dir_object.openFormField(rename_form); }
          else { dir_object.restore(); }; break;
        case 83: // 's' key
          if (!trashed) { dir_object.sortBy(); }; break;
        case 67: // 'c' key
          if (!trashed && e.ctrlKey) { dir_object.copy(); }; break;
        case 86: // 'v' key
          if (!trashed && e.ctrlKey) { dir_object.pasteHere(); }; break;
        case 88: // 'x' key
          if (e.ctrlKey) { dir_object.cut(); }; break;
        case 89:// 'y' key
          if (e.ctrlKey) { redo(); }; break;
        case 90: // 'z' key
          if (e.ctrlKey) {
            if (e.shiftKey) { redo(); } else { undo(); };
          }; break;
        default: break;
        };
      } else {
        // if a folder is not selected arrow keys select root.
        switch(key) {
        case 37: case 38: case 39: case 40: // arrow keys
          root.select(); break;
        case 89:// 'y' key
          if (e.ctrlKey) { redo(); }; break;
        case 90: // 'z' key
          if (e.ctrlKey) {
            if (e.shiftKey) { redo(); } else { undo() };
          }; break;
        default: break;
        }
      }; // end global hotkey switch.
    } else {
      // if a form is active then allow regular typing.
      // Enter or arrow keys will finalize the form.
      switch(key) {
      case 13: case 3: case 37: case 38: case 39: case 40: // Enter/Arrow keys
        e.preventDefault();
        finalizeFormFields();
        break;
      };
    };
  }); // end myProjects hotkey Listener

}); // end DOM Content Loaded
