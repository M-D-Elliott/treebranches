// general DirObject constructor.
function DirObject(obj=$()) {
  this.obj = obj
  this.type = '';
  this.trashed = (obj.attr('data-special').indexOf('folder-') !== -1);
};


// Folder constructor.
function Folder(obj=$()) {
  DirObject.call(this, obj=obj);
  this.type = 'folder';
};


// File constructor.
function File(obj=$()) {
  DirObject.call(this, obj=obj);
  this.type = 'file';
};

// Trash constructor.
function Trash(obj=$()) {
  Folder.call(this, obj=obj);
  this.type = 'trash';
};

// prototype calls.
Folder.prototype = Object.create(DirObject.prototype);
File.prototype = Object.create(DirObject.prototype);
Trash.prototype = Object.create(Folder.prototype);


// ||| Dir Object Control Functions |||

// clears the passed id of the # character then returns the id starting with '#'
function poundID(id){
  return '#' + id.replace(/\#/g, '');
};

// chooses the constructor to use, folder or file.
function parseDirObjects(obj) {
  // accept passed DOM id as well as JQ object.
  if (typeof obj === 'string') { obj = $(poundID(obj)) };
  // parse the Dir Object and instantiate it.
  if (obj.is(folder_container_ref)) {
    if (obj.attr('data-ext') === 'trash') { return new Trash(obj=obj); }
    else { return new Folder(obj=obj); };
  } else if (obj.is(file_container_ref)) {
    return new File(obj=obj);
  } else {
    console.error("Not a valid Dir Object. Requires .folder-container or .file-container class, as well as an app_serial if protection is used.")
  };
  return undefined;
};

// ||| Basic DirObject Functions |||

// placeholder so File.getSubObjects returns an empty list.
DirObject.prototype.getSubObjects = function() {
  return [];
};

// placeholder so File.getAllObjects returns a list containing the file only.
DirObject.prototype.getObjects = function() {
  return [this.obj];
};

DirObject.prototype.getVisiblePosition = function() {
  const obj = this.obj;
  const visible_dir_objs = $('.folder-container:block, .file-container:block');
  const position = visible_dir_objs.index(obj);
  return position;
};

DirObject.prototype.getParentId = function() {
  let parent_id = this.obj.parent().attr('id');
  if (parent_id.match('system')) {
    parent_id = null;
  } else {
    if (parent_id.indexOf('temp') === -1) {
      parent_id = parent_id.split('-')[1];
    };
  }
  return parent_id;
};

DirObject.prototype.flagAll = function(attrs, flag, flagging, bulk=false,
                                       error='')
{
  // fix generalized inputs.
  if (!(attrs instanceof Array)) { attrs = [attrs]; };
  if (flag.charAt(flag.length - 1) !== '-') {flag = flag + '-'; };

  if (bulk) {
    // get a list of this object and potential sub_objects stored in all_objs.
    this.setAllObjects();
    // iterate through all related objects and flag them as specified.
    $.each(this.getObjects(target='all'), function(i, item) {
      $(item).flagObj(attrs, flag, flagging, error=error)
    });
  } else {
    // flag only this Dir Object.
    this.obj.flagObj(attrs, flag, flagging, error=error)
  };
  return this;
};


// ||| Basic Folder Functions |||

// finds all Dir Object types: folder and file
// then maps them to an Array.
Folder.prototype.getSubObjects = function() {
  return this.obj.find(folder_container_ref + ', ' + file_container_ref)
                 .map(function(i, v) { return v; })
                 .toArray();
}

// creates a list containing the folder object then
// uses the Folder.getSubObjects method to attach
// its sub-obects if they exist.
Folder.prototype.getObjects = function(target='all') {
  let objects = [this.obj];
  switch(target){
  case 'all':
    objects = objects.concat(this.getSubObjects()); break;
  case 'this':
    break;
  case 'descendants':
    objects = this.getSubObjects(); break;
  default:
    console.error('Invalid target. Valid: "all", "this", or "descendants" '); break;
  }
  return objects;
};

Folder.prototype.getChildFolders = function() {
  return this.obj.children(folder_container_ref)
                 .map(function(i,v) { return v; })
                 .toArray();
};

Folder.prototype.getChildFiles = function() {
  return this.obj.children(file_container_ref)
                 .map(function(i,v) { return v; })
                 .toArray();
};

Folder.prototype.getChildObjects = function() {
  return this.getChildFolders().concat(this.getChildFiles());
};
