// |||| GENERAL DEFINITIONS ||||
const app_serial = $('#my_projects_serial').attr('data-serial');
const app_icon = '[class$="-icon ' + app_serial + '"]';
const navbar_ref = '.navbar';
let app_color = '#18FC0F';

const collapsed_ref = '[data-formation="collapsed"]';
const selected_ref = '[data-selected=true].' + app_serial;
const project_level_ref = '[data-path$="://"].' + app_serial;
const folder_container_ref = '.folder-container';
const file_container_ref = '.file-container';
const form_ref = 'form.' + app_serial;
const active_form_ref = form_ref + '.active';
const input_ref = '.input.' + app_serial;
const username_ref = $('#username').text();
const hidden_ref = '.my-projects-page #hidden';
const container_icon_ref = '.container-icon'
let unkn_file_type = ''

// |||| METHOD SPECIFIC VARIABLES ||||

// || Dir Object methods: ||
// select method:
const selector_prefix = "<div data-object-id='";
const selector_suffix = "' class='selector pseudo-icon " + app_serial + "'></div>";
let system_folder = $();

// openContextMenu method:
let context_menu = $();
let context_menu_refs = [];

// temporary methods:
let temp_object_array = new Array();

// deleteDirObject method,
// and those related to the trash:
let trash = $();
let trash_ID = '';

// cut/copy/paste methods:
let copied_object = $();
let cut_object = $();

// reverseCommand function for undo and redo:
let recent_commands = [];
let recent_undos = [];
const max_undo = 3;
let root_object = $();
let base_path = '';

// CRUD methods
let new_folder = $();
let new_file = $();
let post_form = $();
let put_form = $();
let delete_form = $();
let rename_form = $();
let copy_paste_form = $();
let csrf_input = $();
let csrf_token = '';

// Method-specific DOM Elements and DOM data.
document.addEventListener("DOMContentLoaded", function(event) {
  // delete variable(s).
  trash = $('[data-ext="trash"]');
  trash_ID = poundID(trash.attr('id'));

  // select variable(s).
  system_folder = $('#system-folder.' + app_serial);
  const navbar = $(navbar_ref);
  app_color = navbar.css('background-color');

  // context-menu template refs and global functions
  context_templates = $('.context-menu-template-wrapper.myFiles-o234a8i0')
  context_templates.children().each(function(i, item) {
    type = $(item).attr('data-type');
    context_menu_refs[type] = "div[data-type='" + type + "'].context-menu-template";
  });

  // undo variable(s).
  root_object = $('[data-ext=root]');
  base_path = root_object.attr('data-path');

  // CRUD
  new_folder = $('[data-name="New Folder"]' + project_level_ref);
  new_file = $('[data-name="New File"]' + project_level_ref);
  post_form = $(hidden_ref + ' #post-form.' + app_serial);
  put_form = $(hidden_ref + ' #put-form.' + app_serial);
  delete_form = $(hidden_ref + ' #delete-form.' + app_serial);
  rename_form = $(hidden_ref + ' #rename-form.' + app_serial);
  copy_paste_form = $(hidden_ref + ' #copy-paste-form.' + app_serial);
  csrf_input = $(hidden_ref + ' input[name="csrfmiddlewaretoken"]');
  csrf_token = csrf_input.attr('value');

  // rename variable(s).
  unkn_file_type = '.' + new_file.find('.name-icon').text().split('.')[1]

  // debug variable(s).

}); // End DOM Content Loaded.
