from django.shortcuts import render, get_object_or_404
from .models import Order, Table, OrderDetail

def order_list(request):
    """Lista todas las órdenes"""
    orders = Order.objects.all().order_by('-date')
    return render(request, 'orders/order_list.html', {
        'orders': orders
    })

def order_detail(request, order_id):
    """Detalle de una orden específica"""
    order = get_object_or_404(Order, id=order_id)
    order_details = OrderDetail.objects.filter(order=order)
    return render(request, 'orders/order_detail.html', {
        'order': order,
        'order_details': order_details
    })

def order_create(request):
    """Crear una nueva orden (vista básica)"""
    return render(request, 'orders/order_create.html')

def table_list(request):
    """Lista todas las mesas"""
    tables = Table.objects.all()
    return render(request, 'orders/table_list.html', {
        'tables': tables
    })
