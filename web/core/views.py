import django.http
import django.template
import django.shortcuts

import web.core.models

def redirect(request, slug):
    file = django.shortcuts.get_object_or_404(web.core.models.File, slug=slug)
    return django.http.HttpResponseRedirect(file.uri())

def serve(request, slug, filename):
    file = django.shortcuts.get_object_or_404(web.core.models.File, slug=slug)
    raise Exception('Serving files through the application server is not supported')

def frontend(request):
    return django.shortcuts.render_to_response(
        'core/index.html',
        {},
        context_instance=django.template.RequestContext(request))
