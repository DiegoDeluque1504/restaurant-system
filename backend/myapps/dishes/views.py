from django.shortcuts import render, get_object_or_404
from .models import Dish, Category

def dish_list(request):
    """Lista todos los platos activos"""
    dishes = Dish.objects.filter(status='ACTIVE')
    return render(request, 'dishes/dish_list.html', {
        'dishes': dishes
    })

def dish_detail(request, dish_id):
    """Detalle de un plato específico"""
    dish = get_object_or_404(Dish, id=dish_id, status='ACTIVE')
    return render(request, 'dishes/dish_detail.html', {
        'dish': dish
    })

def dishes_by_category(request, category_id):
    """Platos filtrados por categoría"""
    category = get_object_or_404(Category, id=category_id, status='ACTIVE')
    dishes = Dish.objects.filter(category=category, status='ACTIVE')
    return render(request, 'dishes/dishes_by_category.html', {
        'category': category,
        'dishes': dishes
    })
