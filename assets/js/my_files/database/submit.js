submitPost = function(form) {
  // console.log('submitPost!');
  const data = form.data.value;
  $.ajax({
    url : "", // the endpoint
    type : "POST", // http method
    data : { 'csrfmiddlewaretoken': csrf_token,
             'data': data
           }, // data sent with the post request

    // handle a successful response
    success : function(json) {
      // console.log('Success!\n', json);
      const temp_ids = json['temp_ids'];
      const new_ids = json['return_ids'];
      $.each(temp_ids, function(i, id) {
        parseDirObjects(id).makePermanent(new_id=new_ids[i]);
        // remove temp flags
      });
    },
    // handle a non-successful response
    error : function(xhr, errmsg, err) {
      temp_ids = JSON.parse(data).pop();
      $.each(temp_ids, function(i, id) {
        dir_obj = parseDirObjects(id);
        dir_obj.removeFromTemp();
        dir_obj.obj.remove();
      });
    },
  }); // End ajax POST request.
  return false;
};


submitPut = function(form) {
  // console.log('submitPut!');
  const data = form.data.value;
  $.ajax({
    url : "", // the endpoint
    type : "PUT", // http method
    data : { 'csrfmiddlewaretoken': csrf_token,
             'data': data
           }, // data sent with the post request

    // handle a successful response
    success : function(json) {
      // console.log('Success!\n', json);
      const updated_ids = json['return_ids']
      $.each(updated_ids, function(i, id) {
        parseDirObjects(id).unflagReadOnly();
      });
    },
    // handle a non-successful response
    error : function(xhr, errmsg, err) {
      console.log(xhr.responseText)
      const error_ids = JSON.parse(data).pop();
      $.each(error_ids, function(i, id) {
        parseDirObjects(id).unflagReadOnly();
      });
    },
  }); // End ajax POST request.
  return false;
};


submitDelete = function(form) {
  // console.log('submitDelete!');
  data = form.data.value
  $.ajax({
    url : "", // the endpoint
    type : "DELETE", // http method
    data : { 'csrfmiddlewaretoken': csrf_token,
             'data': data
           }, // data sent with the post request

    // handle a successful response
    success : function(json) {
      // console.log('Success!\n', json);
      //reverse the ids so that children are removed first.
      const deleted_ids = json['return_ids'].reverse();
      $.each(deleted_ids, function(i, id) {
          $('#' + id).remove();
      });
    },
    // handle a non-successful response
    error : function(xhr, errmsg, err) {
      const error_ids = JSON.parse(data).pop();
      $.each(error_ids, function(i, id) {
        parseDirObjects(id).unflagReadOnly();
      });
    },
  }); // End ajax POST request.
  return false;
};
