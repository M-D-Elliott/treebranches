from django.conf.urls import url

from . import views

urlpatterns = [
    url(
        r"list/$",
        views.ProjectViewSet.as_view({'get': 'list',
                                      'post': 'create',
                                      'put': 'update',
                                      'delete': 'delete'
                                     }),
        name="list"
    ),
]
