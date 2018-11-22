from django.contrib import admin

from . import models

# Register your models here.

admin.site.register(models.DirObject)
admin.site.register(models.Session)
