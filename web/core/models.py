from __future__ import unicode_literals

from django.db import models
from django.conf import settings

import django.db.models.signals
import django.dispatch.dispatcher

import web.core

import re
import os
import uuid

class File(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.CharField(max_length=64, default=web.core.random_slug_default_length, editable=False, unique=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL)
    file = models.FileField(upload_to=web.core.get_file_path)
    created = models.DateTimeField(auto_now_add=True)
    expiry = models.DateTimeField(default=web.core.default_expiry, blank=True)

    def uri(self):
        """
        @returns The URI of this file, which can be used to retrieve it using a redirect.
        """
        filename = re.sub(r'^%s' % settings.UPLOAD_BASE_DIR, '', self.file.name).lstrip('/')
        return os.path.join(settings.FILES_DIR, filename)

    def url(self):
        """
        @returns The short URL of this file, including the protocol and domain.
        """
        return os.path.join(settings.SITE_URL, self.slug)

    def delete_file(self):
        base_path = os.path.dirname(self.file.name)
        if os.path.exists(self.file.name):
            os.unlink(self.file.name)
        if os.path.exists(base_path):
            os.rmdir(base_path)

    def __unicode__(self):
        return self.file.name


@django.dispatch.dispatcher.receiver(django.db.models.signals.post_delete, sender=File)
def file_delete(sender, instance, **kwargs):
    instance.delete_file()
