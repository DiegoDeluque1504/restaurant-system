from rest_framework import serializers
from .models import Delivery, DeliveryPerson

class DeliveryPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryPerson
        fields = '__all__'

class DeliverySerializer(serializers.ModelSerializer):
    delivery_person_name = serializers.CharField(source='delivery_person.name', read_only=True)
    order_id = serializers.IntegerField(source='order.id', read_only=True)
    customer_name = serializers.CharField(source='order.customer_name', read_only=True)

    class Meta:
        model = Delivery
        fields = '__all__'
