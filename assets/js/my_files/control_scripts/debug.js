$.fn.show = function() {
  if (this.css('display') === 'block') {
    this.css('display', 'none');
  } else {
    this.css('display', 'block');
  };
  return this;
}

function showNewFolder() {
  new_folder.show();
};

function showNewFile() {
  new_file.show();
};

function deleteDirObject(obj) {
  dir_object = parseDirObjects($(obj));
  dir_object.obj.attr('data-special', 'trashed');
  dir_object.deleteDirObject(delete_form.clone(),
                             many=true,
                             force=true);
};

function deleteRoot() {
  deleteDirObject('[data-ext=root]');
};

function deleteTrash() {
  deleteDirObject('[data-ext=trash]');
}

function deleteSystemFolders() {
  deleteRoot();
  deleteTrash();
  return "System folders removed."
}
