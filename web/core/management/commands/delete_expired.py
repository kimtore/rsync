import django.core.management.base
import datetime

import web.core.models

class Command(django.core.management.base.BaseCommand):
    help = 'Deletes uploaded files that have expired'

    def add_arguments(self, parser):
        parser.add_argument('--dry-run',
                            action='store_true',
                            default=False,
                            help="Print a list of which files would be deleted")

    def handle(self, *args, **options):
        now = datetime.datetime.now()
        qs = web.core.models.File.objects.filter(expiry__lte=now)
        for file in qs:
            message = '%s by %s, expiry time %s' % (
                file,
                file.author.username,
                file.expiry,
            )
            if options['dry_run']:
                message = 'Would delete ' + message
            else:
                file.delete()
                message = 'Deleted ' + message
            print message
