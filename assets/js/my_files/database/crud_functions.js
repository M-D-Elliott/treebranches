// ||| Primary CRUD functions  |||

DirObject.prototype.createDirObject = function(target='all',
                                               form=post_form.clone()) {
  const obj = this.obj;
  let data = [];
  let temp_ids = [];

  this.addToRecent('create')
  $.each(this.getObjects(target=target), function(i, item) {
    const item_obj = $(item);
    const temp_id = item_obj.attr('id');
    const dir_obj = parseDirObjects(item_obj);
    const parent_id = dir_obj.getParentId();
    temp_ids.push(temp_id);
    data.push({
      'user': username_ref,
      'name': item_obj.attr('data-name'),
      'par_fldr': parent_id,
      'ext': item_obj.attr('data-ext'),
      'temp_id': temp_id,
    });
  });
  data.push(temp_ids);
  form
    .attachData(data)
    .submit()
    .remove();
  return this;
};


DirObject.prototype.updateDirObject = function(target='all',
                                               form=put_form.clone()) {
  const obj = this.obj;
  let data = [];
  let formatted_ids = [];

  $.each(this.getObjects(target=target), function(i, item) {
    const item_obj = $(item);
    const id = item_obj.attr('id');
    const id_as_pk = id.split('-')[1];
    const dir_obj = parseDirObjects(item_obj);
    const parent_id = dir_obj.getParentId();

    formatted_ids.push(id);
    data.push({
      'id': id_as_pk,
      'user': username_ref,
      'name': item_obj.attr('data-name'),
      'par_fldr': parent_id,
      'ext': item_obj.attr('data-ext'),
      'special': item_obj.attr('data-special'),
      'sort_term': item_obj.attr('data-sort'),
    });
    dir_obj.flagReadOnly();
  });

  data.push(formatted_ids);
  form
    .attachData(data)
    .activateForm(obj)
    .submit()
    .remove();
  return this;
};


DirObject.prototype.deleteDirObject = function(target='all',
                                               form=delete_form.clone()) {
  const obj = this.obj;
  const dir_objects = this.getObjects(target=target);
  let change = 0;
  if (dir_objects.includes(this.obj)) { change = -1 };
  // prevent deletion of basic app objects.
  if (obj.attr('data-path').match("://$") && change === -1) {
    console.error('Cannot delete system objects.')
  } else {
    // de-select the object.
    deselectAll();
    const data = [];
    const formatted_ids = [];
    let position = this.getVisiblePosition();

    $.each(dir_objects, function(i, item) {
      const item_obj = $(item);
      const id = item_obj.attr('id');
      const id_as_pk = id.split('-')[1];
      const dir_obj = parseDirObjects(item_obj);
      data.push(id_as_pk);
      formatted_ids.push(id);
      dir_obj.flagReadOnly();
    });
    data.push(formatted_ids);
    form
      .attachData(data)
      .activateForm(obj)
      .submit();
    this.selectNeighbor(change, position=position);
  };
  form.remove();
  return this;
};


// ||| Secondary CRUD functions |||

DirObject.prototype.createTo = function(new_base_obj) {
  this.makeTemporary();
  this
    .attachTo(new_base_obj)
    .createDirObject();
  parseDirObjects(new_base_obj).sort();
  return this;
};

DirObject.prototype.trashOrDelete = function(target='all') {
  const obj = this.obj;
  if (this.trashed || obj === trash) {
    this.deleteDirObject(target=target)
  } else {
    // move the object to the trash.
    this.moveTo(trash);
  };
  return this;
};
