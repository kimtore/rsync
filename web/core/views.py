import django.http
import django.template
import django.shortcuts
import django.contrib.auth

import web.core.models

def redirect(request, slug):
    file = django.shortcuts.get_object_or_404(web.core.models.File, slug=slug)
    return django.http.HttpResponseRedirect(file.uri())

def serve(request, slug, filename):
    file = django.shortcuts.get_object_or_404(web.core.models.File, slug=slug)
    raise Exception('Serving files through the application server is not supported')

def frontend(request):
    if not request.user.is_active:
        return django.http.HttpResponseRedirect('/login/')
    return django.shortcuts.render_to_response(
        'core/index.html',
        {},
        context_instance=django.template.RequestContext(request))

def login(request):
    if request.user.is_active:
        return django.http.HttpResponseRedirect('/')
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = django.contrib.auth.authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                django.contrib.auth.login(request, user)
                return django.http.HttpResponseRedirect('/')
    return django.shortcuts.render_to_response(
        'core/login.html',
        {},
        context_instance=django.template.RequestContext(request))

def logout(request):
    django.contrib.auth.logout(request)
    return django.http.HttpResponseRedirect('/')
