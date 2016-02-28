from __future__ import unicode_literals

from django.db import models
from django.conf import settings

import web.core

import re
import os
import uuid

class File(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL)
    file = models.FileField(upload_to=web.core.get_file_path)
    created = models.DateTimeField(auto_now_add=True)
    expiry = models.DateTimeField(default=web.core.default_expiry, blank=True)
