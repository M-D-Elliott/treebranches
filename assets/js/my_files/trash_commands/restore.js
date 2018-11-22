DirObject.prototype.restore = function() {
  const obj = this.obj;
  const prev_parent = obj.attr('data-special');
  this.moveTo(prev_parent);
  obj.attr('data-special', '');
  return this;
};
