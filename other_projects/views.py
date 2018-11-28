from django.views.generic import TemplateView
from django.template import TemplateDoesNotExist
from django.http import Http404


class StaticView(TemplateView):
    def get(self, request, page, *args, **kwargs):
        self.template_name = 'other_projects/' + page
        response = super(StaticView, self).get(request, *args, **kwargs)
        try:
            return response.render()
        except TemplateDoesNotExist:
            raise Http404()
