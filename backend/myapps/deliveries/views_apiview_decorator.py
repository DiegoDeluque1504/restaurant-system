from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Delivery
from .serializers import DeliverySerializer

@api_view(['GET', 'POST'])
def delivery_list(request):
    """
    Lista todas las entregas o crea una nueva
    """
    if request.method == 'GET':
        deliveries = Delivery.objects.all()
        serializer = DeliverySerializer(deliveries, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = DeliverySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def delivery_detail(request, pk):
    """
    Obtiene, actualiza o elimina una entrega
    """
    try:
        delivery = Delivery.objects.get(pk=pk)
    except Delivery.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DeliverySerializer(delivery)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = DeliverySerializer(delivery, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        delivery.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
