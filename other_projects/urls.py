from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^(?P<page>.+\.html)/$', views.StaticView.as_view()),
]