from django.urls import path
from .views_apiview_decorator import delivery_list, delivery_detail

urlpatterns = [
    path('deliveries/', delivery_list),
    path('deliveries/<int:pk>/', delivery_detail),
]
