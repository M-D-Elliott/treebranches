jQuery.fn.extend({
  activateForm: function(append_target) {
    if (this.is('form')) {
      // get the position of the name icon stored within this Dir Object.
      const offset = append_target.offset();
      const object_id = append_target.attr('data-object-id');
      // Append the form to the DirObject name-icon,
      // give it the DirObject ID and the class 'active',
      this
        .appendTo(append_target)
        .offset({top: offset.top, left: offset.left})
        .attr('data-object-ID', object_id)
        .addClass('active')
        .children('.form-input').focus();
    } else {
      console.error('Cannot activate a non-form element.');
    };
    return this;
  }
});


jQuery.fn.extend({
  attachData: function(data) {
    if (this.is('form')) {
      this.children('#data').attr('value', JSON.stringify(data));
    } else {
      console.error('Cannot attach data to a non-form element.');
    };
    return this;
  }
});


DirObject.prototype.openFormField = function(form) {
  // clone the form.
  const cloned_form = form.clone();
  const container_icon = this.obj.children('.container-icon');
  const name_icon = container_icon.children('.name-icon');
  // Focus the user's pointer on the form input.
  cloned_form.activateForm(name_icon);
}; // this now awaits finalization.

// finalization is triggered when a user clicks outside the input or presses enter.
function finalizeFormFields() {
  let form = $(active_form_ref);
  if (form.length !== 0) {
    var input = form.find('.form-input');
    if (input.exists()) {
      var folder_or_file = parseDirObjects(form.attr('data-object-ID'));
      if (form.attr('onsubmit').indexOf('Post') !== -1) {
        folder_or_file
          .changeName(new_name=input.val())
          .createDirObject(target='this', form=form);
      } else if (form.attr('onsubmit').indexOf('Put') !== -1) {
        folder_or_file.rename(new_name=input.val(), direction=0, form=form);
      };
      return true;
    };
  };
  return false;
};
