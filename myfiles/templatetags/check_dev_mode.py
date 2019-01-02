from django.conf import settings
from django import template

register = template.Library()

@register.simple_tag(takes_context=True)
def open_session_files(context):
    return context['session'].get_open_files()