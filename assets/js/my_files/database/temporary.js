// provides the user with an error message when
// the user attempts to manipulate an object that
// is opened by a program or has an active CRUD operation.
DirObject.prototype.warnTemporary = function(name_long='UNKNOWN OBJECT ERROR') {
  if (this.obj.attr('data-object-id').indexOf('temp-') === -1) {
    return false;
  } else {
    console.error("Action cannot be completed at this time. " + name_long + " is being used by another program.")
    return true;
  };
};

Folder.prototype.warnTemporary = function() {
  name_long = 'Folder "' + this.obj.attr('data-name') + '"';
  return DirObject.prototype.warnTemporary.call(this, name_long=name_long);
};

File.prototype.warnTemporary = function() {
  name_long = this.obj.attr('data-name') + '.' + obj.attr('data-ext');
  return DirObject.prototype.warnTemporary.call(this, name_long=name_long);
};

DirObject.prototype.flagReadOnly = function(bulk=false) {
  this.flagAll(['data-object-id'], 'temp', 1, bulk=bulk,
               error='This object is already read only.');
  return this;
;}

DirObject.prototype.unflagReadOnly = function(bulk=false) {
  this.flagAll(['data-object-id'], 'temp', 0, bulk=bulk,
               error='This object is not read only.');
  return this;
};

DirObject.prototype.makeTemporary = function() {
  obj = this.obj;
  var temp_ids = new Array();

  $.each(this.getObjects(), function(i, item) {
    item_obj = $(item);
    item_id = item_obj.attr('data-object-id').slice(0);
    index = temp_object_array.push(item_id) - 1;
    temp_id = 'temp-' + index;

    item_obj.attr('data-object-id', temp_id)
            .attr('id', temp_id)
            .find("[data-object-id='" + item_id + "']")
            .each(function(i, item) {
                $(item).attr('data-object-id', temp_id);
            });
    temp_ids.push(temp_id);
  });
  return temp_ids;
};

DirObject.prototype.removeFromTemp = function() {
  var previous_id = '';
  previous_id = temp_id = this.obj.attr('id');
  if (temp_id.split('-')[0] === 'temp'){
    previous_id = temp_object_array.pop(temp_id.split('-')[1]);
    if (!temp_object_array.length) {
      temp_object_array = new Array();
      // console.log(temp_object_array);
    };
  } else {
    console.error('Object is not temporary.')
  };
  return [temp_id, previous_id];
};

DirObject.prototype.makePermanent = function(new_id=null) {
  obj = this.obj;
  ids = this.removeFromTemp();
  var temp_id = ids[0];
  var permanent_id = ids[1];
  if (new_id !== null) { permanent_id = new_id; };

  obj.attr('id', permanent_id)
     .attr('data-object-id', permanent_id)
     .find("[data-object-id='" + temp_id + "']")
     .each(function(i, item) {
          $(item).attr('data-object-id', permanent_id);
      });
  return this;
};
