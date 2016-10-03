#!/usr/bin/python
#
# For use with Python versions older than 2.7.9, follow the instruction of this StackOverflow answer:
#
#   https://stackoverflow.com/questions/18578439/using-requests-with-tls-doesnt-give-sni-support/18579484#18579484
#
# In a nutshell, that means to execute the following commands as root:
#
#   apt-get install libffi-dev openssl-dev python-dev build-essential python-dateutil
#   pip install urllib3 pyopenssl ndg-httpsclient pyasn1
#
# Also, you must install the pyperclip package, as root:
#
#   pip install pyperclip
#
# To use this script, insert the following into your ~/.netrc file and chmod it to 600:
#
#   machine domain.com
#   login YOUR_USER_NAME
#   password YOUR_API_KEY
#
# Then, upload files with:
#
#   /path/to/dump.py --url https://domain.com /path/to/file
#

import os
import json
import sys
import requests
import argparse
import dateutil.parser
import pyperclip
import netrc


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
    parser.add_argument('file', help='File to upload')
    parser.add_argument('--expiry', help='Expiry date of file', type=valid_date)
    parser.add_argument('--url', help='Base path to rsync web service', type=unicode, required=True)
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

if __name__ == '__main__':
    parser = get_parser()
    args = parser.parse_args()
    url = get_authenticated_url(args.url)

    size = sizeof_fmt(os.stat(args.file).st_size)

    files = {'file': open(args.file, 'r')}

    sys.stderr.write("Uploading '%s' (%s)\n" % (args.file, size))

    response = requests.post(url, files=files)

    response.raise_for_status()

    content = json.loads(response.text)

    sys.stdout.write("URL: %s\n" % content['url'])
    sys.stderr.write("Expires: %s\n" % content['expiry'])

    if not args.no_clipboard:
        pyperclip.copy(content['url'])
