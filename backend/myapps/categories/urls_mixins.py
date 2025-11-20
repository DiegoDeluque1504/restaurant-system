from django.urls import path
from .views_mixins import CategoryList, CategoryDetail

urlpatterns = [
    path('categories/', CategoryList.as_view()),
    path('categories/<int:pk>/', CategoryDetail.as_view()),
]
