from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Category

def category_list(request):
    """Lista todas las categorías"""
    categories = Category.objects.filter(status='ACTIVE')
    return render(request, 'categories/category_list.html', {
        'categories': categories
    })

def category_detail(request, category_id):
    """Detalle de una categoría específica"""
    category = get_object_or_404(Category, id=category_id, status='ACTIVE')
    return render(request, 'categories/category_detail.html', {
        'category': category
    })

def home(request):
    """Página principal del restaurante"""
    return render(request, 'home.html')
