import tastypie.resources

import web.core.models

class FileResource(tastypie.resources.ModelResource):
    class Meta:
        queryset = web.core.models.File.objects.all()
        allowed_methods = ['get', 'post']
