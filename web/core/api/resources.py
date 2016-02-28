import tastypie.resources
import tastypie.authentication

import web.core.models

class FileResource(tastypie.resources.ModelResource):
    class Meta:
        queryset = web.core.models.File.objects.all()
        allowed_methods = ['get', 'post']
        authentication = tastypie.authentication.MultiAuthentication(
            tastypie.authentication.SessionAuthentication(),
            tastypie.authentication.ApiKeyAuthentication()
        )
