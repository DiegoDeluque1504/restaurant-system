from django.contrib import admin
from .models import Table, Order, OrderDetail
# Register your models here.

@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ['number', 'capacity', 'status']
    list_filter = ['status']
    search_fields = ['number']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'date', 'status', 'order_type', 'total']
    list_filter = ['status', 'order_type', 'date']
    search_fields = ['id']

@admin.register(OrderDetail)
class OrderDetailAdmin(admin.ModelAdmin):
    list_display = ['order', 'dish', 'quantity', 'unit_price', 'subtotal']
    list_filter = ['order']