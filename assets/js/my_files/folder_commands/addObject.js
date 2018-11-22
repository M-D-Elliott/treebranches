DirObject.prototype.addObject = function(obj_type, target=this) {
  // expand the folder.
  target.formation("expand");
  // isolate the template, folder or file.
  var obj_template = $();
  if (obj_type === 'file') { obj_template = new_file; }
  else { obj_template = new_folder; };

  // clone the template, and instantiate the clone
  // as a new folder or file object on the front end.
  var folder_or_file = parseDirObjects(obj_template.clone());
  // assign the object a temporary id.
  folder_or_file.makeTemporary();

  // move the object to this folder
  // and prompt the user to give it a name.
  folder_or_file
    .attachTo(target.obj, sort=false)
    .openFormField(post_form);
  return this;
};

File.prototype.addObject = function(obj_type) {
  target = parseDirObjects(this.obj.parent());
  return DirObject.prototype.addObject.call(this, obj_type, target=target);
}

Trash.prototype.addObject = function(obj_type) {
  console.error('Cannot add ' + obj_type + 's to trash bin.');
  return this;
};
