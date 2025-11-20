from django.urls import path
from .views_generic import DishListCreateGenericAPIView, DishRetrieveUpdateDestroyGenericAPIView

urlpatterns = [
    path('dishes/', DishListCreateGenericAPIView.as_view(), name='dish-list-create'),
    path('dishes/<int:pk>/', DishRetrieveUpdateDestroyGenericAPIView.as_view(), name='dish-detail'),
]
