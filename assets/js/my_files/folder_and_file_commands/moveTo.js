DirObject.prototype.attachTo = function(new_base, sort=true) {
  const obj = this.obj;
  if (!(new_base instanceof DirObject)) {
    new_base = parseDirObjects(new_base);
  };
  const new_base_obj = new_base.obj;
  const path = new_base_obj.attr('data-path') + new_base_obj.attr('id') + '/'
  // append the object to the new base folder
  // and adjust it's path accordingly.
  obj.appendTo(new_base_obj)
     .attr('data-path', path)
  if (new_base_obj.attr('data-form') === 'collapsed') {
    // hide the Dir Object then select the new base folder.
    obj.css('display', 'none');
    new_base.select();
  } else {
    // show then select the Dir Object.
    obj.css('display', 'block');
    this.select();
  };
  if (sort) { new_base.sort(); };
  return this;
};


Folder.prototype.attachTo = function(new_base_obj, sort=true) {
  this.formation('collapse');
  return DirObject.prototype.attachTo.call(this, new_base_obj, sort=sort);
};


DirObject.prototype.moveTo = function(new_base, sort=true, direction=0) {
  const obj = this.obj;
  const obj_id = obj.attr('id');
  if (!(new_base instanceof DirObject)) {
    new_base = parseDirObjects(new_base);
  };
  if (new_base === undefined) {
    console.error('Folder does not exist.');
  } else {
    const new_base_obj = new_base.obj;
    const prev_parent = obj.parent()
    const prev_parent_id = prev_parent.attr('id');
    const new_base_id = new_base_obj.attr('id');
    // reject any cyclical folder moves,
    // or attempts to move a folder within itself.
    if (!(new_base instanceof Folder) ){
      console.error('target base folder is not a folder.')
    } else if ($.contains(obj.get(0), new_base_obj.get(0)) ||
               obj_id == new_base_id) {
      console.error('Cannot create cyclical folders.');
    } else if (new_base_obj === new_folder) {
      console.error('Objects cannot be placed in template.');
    } else if (obj.attr('data-path').match("://$")) {
      console.error('Cannot move system folders.')
    } else {
      this
        .addToRecent('moveTo', direction=direction)
        .attachTo(new_base, sort=sort);
      if (new_base_obj.is(trash)) {
        obj.attr('data-special', prev_parent_id);
      } else if (prev_parent.is(trash)) {
        obj.attr('data-special', '');
      };
      this.changeName().updateDirObject();
    };
  };
  return this;
};
