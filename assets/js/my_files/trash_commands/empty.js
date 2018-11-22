Trash.prototype.empty = function() {
  const trash_has_objects = this.getChildObjects().length;
  if (trash_has_objects) {
    DirObject.prototype.deleteDirObject.call(this, target='descendants');
  } else {
    console.log('Trash is empty.');
  };
  return this;
};

Trash.prototype.deleteDirObject = function(target='trashed objects') {
  return this.empty();
};
