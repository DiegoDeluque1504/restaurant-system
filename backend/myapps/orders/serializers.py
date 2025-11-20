from rest_framework import serializers
from .models import Order, OrderDetail, Table
from myapps.dishes.serializers import DishSerializer  # Ruta completa con myapps

class OrderDetailSerializer(serializers.ModelSerializer):
    dish_name = serializers.CharField(source='dish.name', read_only=True)
    dish_details = DishSerializer(source='dish', read_only=True)

    class Meta:
        model = OrderDetail
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailSerializer(many=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    order_type_display = serializers.CharField(source='get_order_type_display', read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

class TableSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Table
        fields = '__all__'
