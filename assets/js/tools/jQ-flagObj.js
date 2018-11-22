jQuery.fn.extend({
  flagObj: function(attrs, flag, flagging, error='') {
    for (var i = 0; i < attrs.length; i++) {
      attr = attrs[i];
      value = this.attr(attr);
      this.attr(attr, value.flagString(flag, flagging, error=error));
    };
  }
});
