from django.contrib import admin

import web.core.models

@admin.register(web.core.models.File)
class FileAdmin(admin.ModelAdmin):
    list_display = ['slug', 'file', 'author', 'created', 'expiry']
    readonly_fields = ['id', 'slug']
    ordering = ['-created']
    fields = ['file', 'expiry']
