from django.urls import path
from . import views

urlpatterns = [
    path('dishes/', views.dish_list, name='dish_list'),
    path('dishes/<int:dish_id>/', views.dish_detail, name='dish_detail'),
    path('dishes/category/<int:category_id>/', views.dishes_by_category, name='dishes_by_category'),
]
