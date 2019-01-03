DirObject.prototype.addToRecent = function(dir_event, direction=0) {
  let write = [];
  if (direction) {
    write = recent_undos
  } else {
    write = recent_commands;
    if (direction === 0) { recent_undos = []; };
  };
  let value = '';
  let obj = this.obj;
  switch(dir_event) {
  case 'moveTo':
    value = obj.parent().attr('data-object-id'); break;
  case 'sortBy':
    value = obj.attr('data-sort'); break;
  case 'rename':
    value = obj.attr('data-name'); break;
  default: break;
  };
  write.push({'obj': obj, 'event': dir_event, 'value': value});
  if (write.length > max_undo) {
    write.shift();
    console.log('max write')
  };
  // console.log(direction, 'write:', write.slice(0));
  return this;
};

function reverseCommand(direction) {
  let mode = '';
  let read = []
  if (direction) {
    mode = 'redo';
    read = recent_undos;
  } else {
    mode = 'undo';
    read = recent_commands;
  };
  if (read.length) {
    const last = read.pop();
    // console.log(direction, 'read:', read.slice(0));
    const obj = (last['obj']);
    const obj_exists = system_folder.find(obj).length;
    if (obj_exists) {
      const dir_event = last['event'];
      const value = last['value'];
      let dir_object = parseDirObjects(last['obj']);

      switch(dir_event) {
      case 'create':
        dir_object.deleteDirObject();
        break;
      case 'moveTo':
        dir_object.moveTo(value, sort=true, direction=!direction);
        break;
      case 'sortBy':
        dir_object.sortBy(term=value, direction=!direction);
        break;
      case 'rename':
        dir_object.rename(new_name=value, direction=!direction);
        break;
      default: break;
      };
    } else {
      reverseCommand(direction)
    };
  } else {
    console.error('Nothing to ' + mode + '.')
  };
};

function undo() {
  reverseCommand(0);
};

function redo() {
  reverseCommand(1);
};
