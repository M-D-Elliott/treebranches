function lowestIndex(numbers) {
  for (i = 1; i < numbers.length + 2; i++) {
    if (!numbers.includes(i)) { return i; };
  };
  console.error('No available index.')
  return 'error';
};

function getQueryValues(queryset, attr) {
  return queryset.map(function(){
    return $(this).attr(attr);
  }).get();
}

function indexOfSubstring(list, substring) {
  indexes = [];
  $.each(list, function(i, item) {
    if (item.match(substring)) {
      indexes.push(i);
    };
  });
  return indexes;
};

function matchingSubstrings(list, substring) {
  items = [];
  $.each(list, function(i, item) {
    if (item.indexOf(substring) !== -1) {
      items.push(item);
    };
  });
  return items;
};

function subtract(value, mask) {
  return value.split('').filter(function (a, i) {
    return a !== mask[i];
  }).join('');
}

// this function checks the value of the argued attr of this jQ object against
// each of its siblings. If it finds a single, identical match it sets
// attr(value) = value + '(1)'. If it finds multiple matches which have
// already been incremented it will find the lowest available index.
// e.g. sib_values = [value(1), value(2), value(4)] applies value = value(3).
// it then assigns the value to the attr and returns the value.
// Alternatively a value can be passed as a kwarg. This causes the increment to // applied to the passed value, which is then assigned to the attr and returned.
// if no duplicate is found this function is essentially $().attr(attr, value).
jQuery.fn.extend({
  incrementAttrValue: function(attr, value='') {
    if (value.length === 0) { value = this.attr(attr); };
    const sibling_values = getQueryValues(this.siblings(), attr);
    const matching_sib_values = matchingSubstrings(sibling_values, value);
    if (matching_sib_values.length > 0) {
      let numbered_duplicates = [];
      let duplicate = false;
      $.each(matching_sib_values, function(i, sib_value) {
        let reduced_sib = subtract(sib_value, value);
        let reduced_length = reduced_sib.length;
        if (reduced_length === 3 && reduced_sib.match(/\([0-9]+\)/)) {
          numbered_duplicates.push(parseInt(reduced_sib[1]));
          duplicate = true;
        } else if (reduced_length === 0) {
          duplicate = true;
        };
      });
      if (duplicate) {
        if (numbered_duplicates.length) {
          let lowest_index = lowestIndex(numbered_duplicates);
          value += '(' + lowest_index + ')';
        } else {
          value += '(1)';
        };
      };
    };
    this.attr(attr, value);
    return value;
  }
});
