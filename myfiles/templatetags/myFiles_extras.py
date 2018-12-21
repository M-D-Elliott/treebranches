from django.conf import settings
from django import template

from ..models import DirObject

register = template.Library()


# ***** Static Dict(s) *****

data = {'extensions': {'fldr': 'fldr', 'root': 'fldr', 'trash': 'trash', 'txt': 'txt'},
        'sub_menus': {'sort': ['Name', 'Created', 'Modified']}}

# ***** All Tags *****


# ||||| Project Tags |||||

@register.simple_tag(takes_context=True)
def open_session_files(context):
    return context['session'].get_open_files()


@register.simple_tag(takes_context=True)
def get_project_root(context):
    return context['user'].get_or_create_my_projects_object(name='C', ext='root')


@register.simple_tag(takes_context=True)
def get_user_trash_bin(context):
    return context['user'].get_or_create_my_projects_object(name=settings.TRASH_NAME, ext='trash')


@register.simple_tag()
def get_new_folder():
    return DirObject.objects.get_or_create(name='New Folder', ext='fldr', user=None)[0]


@register.simple_tag()
def get_new_file():
    return DirObject.objects.get_or_create(name='New File', ext='txt', user=None)[0]


# ||||| Directory Tags |||||

@register.simple_tag()
def app_serial():
    return settings.APP_SERIAL


@register.simple_tag()
def project_path(current_path, folder_id):
    return current_path + 'folder-' + str(folder_id) + '/'


@register.simple_tag()
def sub_folders_of(folder):
    return folder.get_child_objects(ext='fldr')


@register.simple_tag()
def sub_files_of(folder):
    return folder.get_child_objects(exclude=True, ext='fldr')


# ||||| General Tags |||||

@register.simple_tag()
def hide_all(folder_or_file):
    if folder_or_file.par_fldr is None and folder_or_file.user is not None:
        return 'inline-flex'
    else:
        return 'none'


# ***** All Filters *****


@register.filter()
def possessive(noun):
    if noun[-1:] == 's':
        return noun + "'"
    else:
        return noun + "'s"

# ||||| General Filters |||||


@register.filter()
def lookup(d, key):
    if isinstance(data[d][key], list):
        val: list = data[d][key]
    else:
        val: str = data[d][key]
    return val
