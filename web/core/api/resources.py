import tastypie.resources
import tastypie.authentication

import django.db.models

import web.core.models
import web.core.api.authorization

class FileResource(tastypie.resources.ModelResource):
    class Meta:
        queryset = web.core.models.File.objects.all()
        allowed_methods = ['get', 'post']
        authentication = tastypie.authentication.MultiAuthentication(
            tastypie.authentication.SessionAuthentication(),
            tastypie.authentication.ApiKeyAuthentication()
        )
        authorization = web.core.api.authorization.UserObjectsOnlyAuthorization()

    def hydrate(self, bundle, request=None):
        bundle.obj.owner = django.db.models.User.objects.get(pk=bundle.request.user.id)
        return bundle 
