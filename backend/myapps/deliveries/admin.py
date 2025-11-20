from django.contrib import admin
from .models import DeliveryPerson, Delivery
# Register your models here.


@admin.register(DeliveryPerson)
class DeliveryPersonAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'status']
    list_filter = ['status']
    search_fields = ['name']

@admin.register(Delivery)
class DeliveryAdmin(admin.ModelAdmin):
    list_display = ['customer_name', 'address', 'phone', 'cost', 'delivery_person']
    search_fields = ['customer_name', 'address']