from django.contrib import admin
from .models import Trip, Category,Type,Accommodation

admin.site.register(Trip)
admin.site.register(Category)
admin.site.register(Type)
admin.site.register(Accommodation)