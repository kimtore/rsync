#!/usr/bin/env python3
#
# Installation and setup:
#
#   apt-get install python3-requests python3-dateutil python3-pyperclip
#
# To use this script, insert the following into your ~/.netrc file and chmod it to 600:
#
#   machine example.com
#   login YOUR_USER_NAME
#   password YOUR_API_KEY
#
# Then, upload files with:
#
#   /path/to/dump.py --url https://example.com /path/to/file [/path/to/more/files] [...]
#

HAS_PYPERCLIP = False

import os
import json
import sys
import requests
import argparse
import dateutil.parser
import netrc


try:
    import pyperclip
    HAS_PYPERCLIP = True
except ImportError:
    pass


def valid_date(s):
    try:
        return dateutil.parser.parse(s)
    except ValueError:
        msg = "Not a valid date: '{0}'.".format(s)
        raise argparse.ArgumentTypeError(msg)


def sizeof_fmt(num, suffix='B'):
    for unit in ['','Ki','Mi','Gi','Ti','Pi','Ei','Zi']:
        if abs(num) < 1024.0:
            return "%3.1f%s%s" % (num, unit, suffix)
        num /= 1024.0
    return "%.1f%s%s" % (num, 'Yi', suffix)


def get_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('file', nargs='+', help='File to upload')
    parser.add_argument('--url', help='Base path to rsync web service', type=str, required=True)
    parser.add_argument('--expiry', help='Expiry date of file', type=valid_date)
    if HAS_PYPERCLIP:
        parser.add_argument('--no-clipboard', help='Do not copy URL to clipboard', action='store_true')
    return parser


def get_authenticated_url(url):
    netrc_file = netrc.netrc()
    credentials = netrc_file.authenticators(os.path.basename(url))
    username = credentials[0]
    api_key = credentials[2]
    return '%(path)s/api/v1/file/?username=%(username)s&api_key=%(api_key)s' % {
        'path': url,
        'username': username,
        'api_key': api_key,
    }


def upload_file(url, path, expiry=None):
    """!
    @returns str URL to uploaded file.
    """
    data = {}
    if expiry:
        data['expiry'] = expiry.strftime('%Y-%m-%dT%H:%M:%SZ')

    size = sizeof_fmt(os.stat(path).st_size)
    files = {'file': open(path, 'rb')}

    sys.stderr.write("Uploading '%s' (%s)\n" % (path, size))

    response = requests.post(url, data, files=files)
    response.raise_for_status()

    content = json.loads(response.text)

    sys.stdout.write("URL: %s\n" % content['url'])
    sys.stderr.write("Expires: %s\n" % content['expiry'])

    return content['url']


if __name__ == '__main__':
    parser = get_parser()
    args = parser.parse_args()
    url = get_authenticated_url(args.url)

    uploaded_urls = []
    for path in args.file:
        uploaded_urls += [upload_file(url, path, expiry=args.expiry)]

    if HAS_PYPERCLIP and not args.no_clipboard:
        urls = '\n'.join(uploaded_urls)
        pyperclip.copy(urls)
