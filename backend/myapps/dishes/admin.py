from django.contrib import admin
from .models import Dish


# Register your models here.
@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'category', 'status']
    list_filter = ['category', 'status']
    search_fields = ['name']