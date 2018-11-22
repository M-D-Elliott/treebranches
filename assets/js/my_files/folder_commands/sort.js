Folder.prototype.sort = function () {
  const current_sort = this.obj.attr('data-sort');
  const sub_folders = this.getChildFolders();
  const sub_files = this.getChildFiles();
  const sub_objects = sub_folders.concat(sub_files);
  let sorted_sub_folders = sub_folders.slice(0);
  let sorted_sub_files = sub_files.slice(0);

  let dir = 1;
  if (current_sort.includes('-')) { dir=-1; };
  let term = current_sort.replace(/\-/g, '');

  const sort_method = function(obj) {
    const target_data = 'data-' + term;
    return $(obj).attr(target_data);
  };

  $.each([sorted_sub_folders, sorted_sub_files], function(i, item) {
    item.sort(function(a, b) {
      const value_a = sort_method(a);
      const value_b = sort_method(b);
      return value_b<value_a ? (1*dir) : value_b>value_a ? (-1*dir) : 0;
    });
  });

  $.each(sub_objects, function(i, item){ $(item).remove(); });
  this.obj.append(sorted_sub_folders.concat(sorted_sub_files));
  return this;
};

Folder.prototype.sortBy = function(term='', direction=0) {
  this.addToRecent('sortBy', direction=direction);
  const obj = this.obj;
  const current_sort = this.obj.attr('data-sort');
  if (!term.length) { term = current_sort.replace(/\-/g, ''); };
  const target_data = 'data-' + term;
  if (current_sort.includes(term) && (!current_sort.includes('-'))) {
    obj.attr('data-sort', '-' + term);
  } else {
    obj.attr('data-sort', term);
  };
  this.sort().updateDirObject(target='this');
  return this;
};


File.prototype.sort = function() {
  parseDirObjects(this.obj.parent()).sort();
  return this;
};

File.prototype.sortBy = function(term='') {
  parseDirObjects(this.obj.parent()).sortBy(term=term)
  return this;
};
