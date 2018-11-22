$.fn.hasClasses = function(classes) {
  const obj = this;
  const distinct_classes = classes.split(' ');
  let match = true;
  $.each(distinct_classes, function() {
    if (!obj.hasClass(this)) { match = false; };
  });
  return match;
}

$.fn.hasAnyClass = function(classes) {
  const obj = this;
  const distinct_classes = classes.split(' ');
  let match = false;
  $.each(distinct_classes, function() {
    if (obj.hasClass(this)) { match = true; };
  });
  return match;
}