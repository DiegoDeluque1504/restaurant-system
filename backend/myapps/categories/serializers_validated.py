from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    name_length = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = '__all__'

    def get_name_length(self, object):
        return len(object.name)

    def validate(self, data):
        if data['name'] == data['description']:
            raise serializers.ValidationError('Nombre y descripción no pueden ser iguales')
        return data

    def validate_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError('El nombre debe tener al menos 3 caracteres')
        return value
