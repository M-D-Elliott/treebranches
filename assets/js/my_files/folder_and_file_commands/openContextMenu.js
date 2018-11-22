DirObject.prototype.openContextMenu = function(e) {
  obj = this.obj;

  if (obj.attr('data-path').match("://$")) {
    if (obj.attr('data-ext') === 'trash') {
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

  context_menu
    .removeClass('context-menu-template')
    .attr('id', 'context-menu')
    .appendTo(".my-projects-page")
    .css({top: e.pageY - 10 + "px", left: e.pageX + 15 + "px"});
  return this;
};
