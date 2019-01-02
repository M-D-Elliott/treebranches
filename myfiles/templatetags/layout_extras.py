from django import template

register = template.Library()


@register.simple_tag(takes_context=True)
def highlight_button(context, path):
    print(context['request'].get_full_path(), path)
    if context['request'].get_full_path() == path:
        return 'btn-primary'
    else:
        return 'btn-secondary'
