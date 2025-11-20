from django.urls import path
from . import views

urlpatterns = [
    path('deliveries/', views.delivery_list, name='delivery_list'),
    path('deliveries/create/', views.delivery_create, name='delivery_create'),
    path('delivery-persons/', views.delivery_person_list, name='delivery_person_list'),
]
