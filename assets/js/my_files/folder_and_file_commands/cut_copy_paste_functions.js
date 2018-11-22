function removePreviousClipboard() {
  if (copied_object.length) {
    // remove the copied object from the temporary Dir Object list.
    parseDirObjects(copied_object).removeFromTemp();
    // clear the copied object.
    copied_object = $()
  };
  // clear the cut variable.
  cut_object = $()

};

DirObject.prototype.cut = function() {
  const obj = this.obj;

  if (!obj.attr('data-path').match("://$")) {
    removePreviousClipboard();
    // set the cut object as this object.
    cut_object = obj;
  };
  return this;
};


DirObject.prototype.copy = function() {
  obj = this.obj

  if (!obj.attr('data-path').match("://$")) {
    removePreviousClipboard();
    // clear any cut objects.
    // assign a temporary ID to the copied object and its sub_objects
    copied_object = obj.clone();
    parseDirObjects(copied_object).makeTemporary();
  };
  return this;
};


Folder.prototype.pasteHere = function() {
  // check if a cutting or copying took place,
  // and parse the DirObject from the clipboard.
  if (cut_object.length) {
    // "cut/paste" or move the object to the target folder.
    const dir_object = parseDirObjects(cut_object);
    dir_object.moveTo(this);
    // cut objects cannot be moved twice without cutting again:
    removePreviousClipboard();
  } else if (copied_object.length) {
    const copy = copied_object.clone();
    const dir_object = parseDirObjects(copy);
    const form_append = copy.children('.container-icon').children('.name-icon');
    let form = copy_paste_form.clone();
    // the form has to be activated because this event must preceed
    // the standard POST CRUD function.
    form.activateForm(form_append);
    // since a create event is taking place the object must be
    // added to the temporary list and given a temporary id.
    dir_object.makeTemporary();
    dir_object
      .attachTo(this.obj)
      .createDirObject(target='all', form=form);
  } else {
    console.error('No paste object.');
  };
  return this;
};


File.prototype.pasteHere = function() {
  parseDirObjects(this.obj.parent()).pasteHere();
  return this;
};
