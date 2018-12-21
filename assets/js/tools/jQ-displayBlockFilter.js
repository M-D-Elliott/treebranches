$.extend($.expr[':'], {
  "block": function(a, i, m) {
    return $(a).css("display") == "block";
  }
});

$.extend($.expr[':'], {
  "not_none": function(a, i, m) {
    return $(a).css("display") != "none";
  }
});