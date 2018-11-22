jQuery.fn.extend({
  toggleAttr: function( attr_type, one, two ) {
    this.attr(attr_type, this.attr(attr_type) === one ? two : one);
    return this.attr(attr_type);
  }
});