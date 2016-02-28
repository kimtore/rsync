import os
import re
import datetime
import random
import string

from django.conf import settings

def clean_filename(filename):
    """
    @return A filename stripped of special characters.
    """
    return re.sub(r'[^\w\d\._-]', '-', filename).lower()

def get_file_path(instance, filename):
    """
    @returns A randomly generated path to file uploaded through a Django FileField.
    """
    filename = clean_filename(filename)
    path = os.path.realpath(os.path.join(settings.UPLOAD_BASE_DIR, instance.slug, filename))
    return path

def default_expiry():
    """
    @returns A datetime object representing the expiry time of a file uploaded
    now, according to the EXPIRY_TIME setting.
    """
    return datetime.datetime.now() + datetime.timedelta(seconds=settings.EXPIRY_TIME)

def random_slug(length):
    """
    @returns A random slug consisting of letters and digits.
    """
    return ''.join(random.SystemRandom().choice(
        string.ascii_uppercase + \
        string.ascii_lowercase + \
        string.digits
    ) for _ in range(length))

def random_slug_default_length():
    """
    @returns A random slug of SLUG_LENGTH consisting of letters and digits.
    """
    return random_slug(settings.SLUG_LENGTH)
