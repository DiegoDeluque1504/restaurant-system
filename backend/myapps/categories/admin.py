from django.contrib import admin
from .models import Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'status']
    list_filter = ['status']
    search_fields = ['name']

# Register your models here.
