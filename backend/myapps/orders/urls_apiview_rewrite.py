from django.urls import path
from .views_apiview_rewrite import OrderListAPIView, OrderDetailAPIView

urlpatterns = [
    path('orders/', OrderListAPIView.as_view()),
    path('orders/<int:pk>/', OrderDetailAPIView.as_view()),
]
