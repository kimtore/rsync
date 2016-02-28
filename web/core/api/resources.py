import tastypie.resources
import tastypie.authentication
import tastypie.fields

import django.contrib.auth.models

import web.core.models
import web.core.api.authorization

class FileResource(tastypie.resources.ModelResource):
    url = tastypie.fields.CharField(attribute='url', readonly=True)

    class Meta:
        queryset = web.core.models.File.objects.all()
        allowed_methods = ['get', 'post', 'delete']
        always_return_data = True
        authentication = tastypie.authentication.MultiAuthentication(
            tastypie.authentication.SessionAuthentication(),
            tastypie.authentication.ApiKeyAuthentication()
        )
        authorization = web.core.api.authorization.UserObjectsOnlyAuthorization()

    def hydrate(self, bundle, request=None):
        bundle.obj.author = django.contrib.auth.models.User.objects.get(pk=bundle.request.user.id)
        return bundle 

    def deserialize(self, request, data, format=None):
        if not format:
            format = request.META.get('CONTENT_TYPE', 'application/json')

        if format == 'application/x-www-form-urlencoded':
            return request.POST

        if format.startswith('multipart'):
            data = request.POST.copy()
            data.update(request.FILES)

            return data

        return super(FileResource, self).deserialize(request, data, format)
