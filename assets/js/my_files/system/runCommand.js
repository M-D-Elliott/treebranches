DirObject.prototype.runCommand = function(command) {
  command = command.split('-');
  let flag = command.pop().toLowerCase();
  command = command.toString().toLowerCase();
  if (command === '') { command = flag; flag = ''; };
  obj_is_temporary = this.warnTemporary()

  switch(command) {
  case 'collapse':
    this.formation("collapse"); break;
  case 'expand':
    this.formation("expand"); break;
  case 'open':
    if (obj_is_temporary) { break; };
    this.open(); break;
  case 'rename':
    if (obj_is_temporary) { break; };
    this.openFormField(rename_form.clone()); break;
  case 'delete':
    if (obj_is_temporary) { break; };
    this.trashOrDelete(); break;
  case 'cut':
    if (obj_is_temporary) { break; };
    this.cut(); break;
  case 'copy':
    if (obj_is_temporary) { break; };
    this.copy(); break;
  case 'paste':
    if (obj_is_temporary) { break; };
    this.pasteHere(); break;
  case 'new folder':
    if (obj_is_temporary) { break; };
    this.addObject("folder"); break;
  case 'new file':
    if (obj_is_temporary) { break; };
    this.addObject("file"); break;
  case 'empty trash':
    this.empty(); break;
  case 'properties':
    this.properties(); break;
  case 'sort':
    this.sortBy(term=flag); break;
  case 'restore':
    this.restore(); break;
  default:
    console.error('Unknown command. Check string value.'); break;
  };
  return this;
};
