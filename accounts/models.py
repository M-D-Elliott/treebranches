from datetime import datetime
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
import pytz

from . import managers
from .filters import dir_object_exact_filter


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, unique=True)
    display_name = models.CharField(max_length=140)
    bio = models.CharField(max_length=140, blank=True, default="")
    avatar = models.ImageField(blank=True, null=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = managers.UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["display_name", "username"]

    def __str__(self):
        return "@{}".format(self.username)

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)

    def get_short_name(self):
        return self.display_name

    def get_long_name(self):
        return "{} (@{})".format(self.display_name, self.username)

    def get_or_create_my_projects_object(self, **kwargs):
        user_objects = self.myfiles_objects.select_related('user').all()
        requested_object = dir_object_exact_filter(self, **kwargs)
        if not requested_object:
            requested_object = user_objects.create(user=self, **kwargs)
        return requested_object

    def get_or_create_session(self):
        user_sessions = self.myfiles_sessions.select_related('user').all()
        if user_sessions:
            latest_session = user_sessions.latest('modified')
            has_open_files = len(latest_session.get_open_files())
            young = latest_session.limit_age()
            if has_open_files or young:
                return latest_session.continue_session()
        return user_sessions.create(user=self)

    def create_session(self):
        user_sessions = self.myfiles_sessions.select_related('user').all()
        return user_sessions.create(user=self)
