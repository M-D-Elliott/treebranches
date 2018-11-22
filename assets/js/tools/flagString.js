String.prototype.flagString = function(flag, flagging, error='') {
  string = this.valueOf();
  if (string.indexOf(flag) === -1) {
    if (flagging) {
      string = flag + string;
    } else {
      default_error = string + 'is already flagged as' + flag;
      logErrorOrDefault(error, default_error);
    }
  } else {
    if (!flagging){
      string = string.replace(flag, '');
    } else {
      default_error = string + 'is not flagged as' + flag;
      logErrorOrDefault(error, default_error);
    };
  };
  return string;
};
