from django.conf import settings
from django.contrib import messages
from django.contrib.auth import logout, views
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views import generic

from . import models
from . import forms


class LoginView(views.LoginView):
    form_class = AuthenticationForm
    success_url = reverse_lazy(settings.LOGIN_REDIRECT_URL)
    template_name = "accounts/login.html"


class LogoutView(generic.RedirectView):
    url = reverse_lazy("home")

    def get(self, request, *args, **kwargs):
        logout(request)
        return super().get(request, *args, **kwargs)


class SignUpView(generic.CreateView):
    form_class = forms.SignUpForm
    success_url = reverse_lazy(settings.LOGIN_REDIRECT_URL)
    template_name = "accounts/signup.html"

    def form_valid(self, form):
        messages.success(self.request, "You're all signed up!")
        return super().form_valid(form)
