import os
import re
import uuid
import datetime

from django.conf import settings

def uuid2slug(uuidstring):
    """
    @brief Convert an UUID object to a short, reversible string slug.
    """
    return uuidstring.bytes.encode('base64').rstrip('=\n').replace('/', '_')

def slug2uuid(slug):
    """
    @brief Convert a string slug into an UUID object.
    """
    return uuid.UUID(bytes=(slug + '==').replace('_', '/').decode('base64'))

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
    rand = uuid2slug(uuid.uuid4())
    path = os.path.realpath(os.path.join(settings.BASE_DIR, 'files', rand, filename))
    return path

def default_expiry():
    """
    @returns A datetime object representing the expiry time of a file uploaded
    now, according to the EXPIRY_TIME setting.
    """
    return datetime.datetime.now() + datetime.timedelta(seconds=settings.EXPIRY_TIME)
