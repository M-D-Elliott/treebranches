Folder.prototype.formation = function(command) {
  obj = this.obj;
  // add, remove, or toggle the folder's formation
  // based on the command issued.
  switch(command) {
    case 'collapse':
      obj.attr('data-form', 'collapsed'); break;
    case 'expand':
      obj.attr('data-form', 'expanded'); break;
    case 'toggle':
      obj.toggleAttr('data-form', 'collapsed', 'expanded'); break;
    default:
      console.error('Invalid command for Folder.formation()')
      return this;
  };

  // establish variables needed only after the switch.
  var icons = []
  var sub_objects = [];

  // if the post-state is collapsed target all descendant sub-folders,
  // otherwise only target direct child sub-folders.
  if (obj.attr('data-form') === 'collapsed') {
    // all sub_files are given a css display of none.
    obj.find(".file-container").css('display', 'none');
    // all sub_folders are altered here by .css('display') and data-form.
    obj.find(".folder-container").css('display', 'none').attr('data-form', 'collapsed');
    // all folder and arrow icons, owned this folder or its sub-folders, have their src attr replaced.
    obj
      .find(".folder-icon, .arrow-icon")
      .each(function(i, item) {
        item_obj = $(item);
        new_src = item_obj.attr('src').replace('expanded', 'collapsed')
        item_obj.attr('src', new_src);
      });
  } else {
    // all child folders and files are given a css display of block.
    obj.children(".folder-container, .file-container").css('display', 'block');
    // folder and arrow icons owned by this folder have their src attr replaced.
    obj
      .children(container_icon_ref)
      .children(".folder-icon, .arrow-icon")
      .each(function(i, item) {
        item_obj = $(item);
        new_src = item_obj.attr('src').replace('collapsed', 'expanded');
        item_obj.attr('src', new_src);
      });
  };
  return this;
};
