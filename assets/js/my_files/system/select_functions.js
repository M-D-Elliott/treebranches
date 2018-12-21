function deselectAll() {
  // de-select the previous object.
  $("div.selector.myFiles-o234a8i0").remove();
  $(selected_ref).attr('data-selected', false);
};

// selects a directory or file object.
DirObject.prototype.select = function() {
  // de-select the previous object.
  deselectAll();
  const obj = this.obj;
  // add the class 'selected' to the obj, turning the text white.
  obj.attr('data-selected', true);
  // find the 'container-icon'
  const icon_container = obj.children(".container-icon");
  // a new selector div is constructed from the
  // prefix, directory name, and suffix found above.
  const selector = selector_prefix + obj.attr('id') + selector_suffix;
  // the selector is appended to the icon container
  // at one z-index value below, highlighting the icons.
  const top = icon_container.offset().top;
  const left = system_folder.offset().left;
  const width = system_folder.width()
  const height = icon_container.height() + 1;
  // console.log('top:', top, "left:", left)
  $(selector)
    .appendTo(system_folder)
    .offset({left: left, top: top})
    .width(width)
    .height(height);
  return this;
};

DirObject.prototype.selectNeighbor = function(change, position=-1) {
  const obj = this.obj;
  const visible_dir_objs =
    $('.folder-container:not_none, .file-container:not_none');
  const last_index = visible_dir_objs.length - 1;
  if (position === -1) { position = visible_dir_objs.index(obj); };
  let new_position = position + change;
  if (new_position > last_index) { new_position = 0; }
  else if (new_position < 0) { new_position = last_index; };
  const new_selected_obj = visible_dir_objs.get(new_position);
  parseDirObjects($(new_selected_obj)).select();
  return this;
};

DirObject.prototype.selectNext = function() {
  return this.selectNeighbor(1);
};

DirObject.prototype.selectPrev = function() {
  return this.selectNeighbor(-1);
};
