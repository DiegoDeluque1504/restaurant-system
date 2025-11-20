from django.urls import path
from .views_apiview import OrderListCreateAPIView, OrderRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('orders/', OrderListCreateAPIView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderRetrieveUpdateDestroyAPIView.as_view(), name='order-detail'),
]
