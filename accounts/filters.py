from django.db.models import Q
from functools import reduce
import operator


def exact_filter(user, fields, **kwargs):
    argument_list = []

    for field in fields:
        argument = kwargs.get(field)
        if argument:
            argument_list.append(Q(**{field+'__iexact': argument}))

    arguments = reduce(operator.or_, argument_list)
    try:
        query = user.myfiles_objects.filter(arguments)
        requested_object = list(query)[0]
        return requested_object
    except IndexError:
        print('Object not found')
        return False


def dir_object_exact_filter(user, **kwargs):

    fields = ('user', 'name', 'ext', 'par_fldr',)

    return exact_filter(user, fields, **kwargs)