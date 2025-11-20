from django.shortcuts import render
from .models import Delivery, DeliveryPerson

def delivery_list(request):
    """Lista todas las entregas"""
    deliveries = Delivery.objects.all()
    return render(request, 'deliveries/delivery_list.html', {
        'deliveries': deliveries
    })

def delivery_create(request):
    """Crear una nueva entrega (vista básica)"""
    return render(request, 'deliveries/delivery_create.html')

def delivery_person_list(request):
    """Lista todos los repartidores"""
    delivery_persons = DeliveryPerson.objects.all()
    return render(request, 'deliveries/delivery_person_list.html', {
        'delivery_persons': delivery_persons
    })
