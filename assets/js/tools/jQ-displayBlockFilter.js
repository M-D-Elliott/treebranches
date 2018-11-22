$.extend($.expr[':'], {
  "block": function(a, i, m) {
    return $(a).css("display") == "block";
  }
});