from django.contrib import admin

import web.core.models

@admin.register(web.core.models.File)
class FileAdmin(admin.ModelAdmin):
    pass
