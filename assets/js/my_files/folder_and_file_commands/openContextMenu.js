DirObject.prototype.openContextMenu = function(e) {
  const obj = this.obj;

  if (obj.attr('data-path').match("://$")) {
    if (obj.attr('data-ext') === 'trash') {
      // context_menu is a global value
      context_menu = $(context_menu_refs['trash']).clone();
    } else {
      context_menu = $(context_menu_refs['root']).clone();
    }
  } else if (obj.attr('data-special').indexOf('folder-') !== -1) {
    context_menu = $(context_menu_refs['in-trash']).clone();
  } else if (obj.is(folder_container_ref)) {
    context_menu = $(context_menu_refs['folder']).clone();
  } else if (obj.is(file_container_ref)) {
    context_menu = $(context_menu_refs['file']).clone();
  };

  const icon_container = obj.children(".container-icon");
  const container_height = icon_container.height()
  const top = icon_container.offset().top + (1/2) * container_height
  const left = e.pageX;


  const context_wrapper = $("<div class='context-wrapper'>")
  context_menu
    .removeClass('context-menu-template')
    .attr('id', 'context-menu')
    .appendTo(context_wrapper);

  context_wrapper
    .appendTo(system_folder)
    .offset({top: top, left: left});
  return this;
};
