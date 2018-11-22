from datetime import datetime, timedelta
from django.conf import settings
from django.db import models
from django.urls import reverse
from django.utils import timezone
import misaka
import pytz


class Session(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             related_name="%(app_label)s_sessions",
                             null=True,
                             on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    last_continued = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        last_update = timezone.localtime(self.modified)
        return last_update.strftime("%m/%d/%Y %I:%M %p")

    def get_open_files(self):
        return list(self.open_files.select_related('session').all())

    def continue_session(self):
        self.last_continued = pytz.utc.localize(datetime.utcnow())
        self.save()
        return self

    def limit_age(self):
        age_limit = timedelta(hours=24)
        age = pytz.utc.localize(datetime.utcnow()) - self.created
        return age_limit >= age

    class Meta:
        ordering = ["-modified"]


class DirObject(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             related_name="%(app_label)s_objects",
                             null=True,
                             on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    ext = models.CharField(max_length=6)
    object_html = models.TextField(editable=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    sort_term = models.CharField(max_length=10, default='name')
    special = models.CharField(max_length=15, null=True, blank=True)
    par_fldr = models.ForeignKey('self', related_name="child_objects",
                                 null=True, blank=True,
                                 on_delete=models.CASCADE)
    temp_id = models.CharField(max_length=20, null=True, blank=True, default='')
    session = models.ForeignKey(Session, related_name="open_files",
                                null=True, blank=True,
                                on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name) + '.' + str(self.ext)

    def save(self, *args, **kwargs):
        self.object_html = misaka.html(str(self.name) + '-' + str(self.ext))
        return super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse(
            "dirObjects:single",
            kwargs={
                "username": self.user.username,
                "pk": self.pk
            }
        )

    def format_id(self):
        id_prefix = 'file'
        if self.ext == 'fldr' or self.ext == 'root' or self.ext == 'trash':
            id_prefix = 'folder'
        return id_prefix + '-' + str(self.pk)

    def clear_temp(self, *args, **kwargs):
        self.temp_id = ''
        return super().save(*args, **kwargs)

    def get_child_objects(self, exclude=False, **kwargs):
        sub_objects = self.child_objects
        if exclude:
            select_objects = sub_objects.exclude(**kwargs)
        else:
            select_objects = sub_objects.filter(**kwargs)
        if not select_objects:
            return ''
        return select_objects.order_by(self.sort_term)

    def open_in_session(self, session_id):
        if self.ext != 'fldr' and self.ext != 'root' and self.ext != 'trash':
            self.session = self.user.myfiles_sessions.filter(pk__iexact=session_id)
            self.save()

    class Meta:
        ordering = ["name"]
        unique_together = ["par_fldr", "name", "ext"]
