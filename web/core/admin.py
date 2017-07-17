from django.contrib import admin

import web.core.models

@admin.register(web.core.models.File)
class FileAdmin(admin.ModelAdmin):
    list_display = ['slug', 'file', 'author', 'created', 'expiry']
    readonly_fields = ['id', 'slug']
    ordering = ['-created']
    fields = ['author', 'file', 'expiry']

@admin.register(web.core.models.Option)
class OptionAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'key', 'value']
    ordering = ['author', 'key']
    readonly_fields = ['id']
