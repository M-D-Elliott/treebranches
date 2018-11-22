DirObject.prototype.changeName = function(new_name='') {
  const obj = this.obj;
  // collect the name icon, which displays the Dir Object name to the user.
  const name_icon = obj.children(container_icon_ref).children('.name-icon');
  // Assign the Dir Object container the new name.
  new_name = obj.incrementAttrValue('data-name', value=new_name);
  let full_name = new_name;
  // If the Dir Object is a folder then set the marker to ':'.
  if (obj.is(folder_container_ref)) {
    full_name += ':';
  } else {
    if (new_name.indexOf('.') === -1) {
      full_name += unkn_file_type;
    };
  };
  // Assign the name icon the new name.
  name_icon.html('&nbsp;' + full_name);
  parseDirObjects(this.obj.parent()).sort();
  return this;
}


// a new name is applied to the DirObject container element and related sub-elements.
DirObject.prototype.rename = function(new_name='', direction=0,
                                      form=rename_form.clone()) {
  this
    .addToRecent('rename', direction=direction)
    .changeName(new_name=new_name)
    .updateDirObject(target='this', form=form);
  return this;
};
