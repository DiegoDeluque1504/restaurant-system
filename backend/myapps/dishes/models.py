from django.db import models
from myapps.categories.models import Category

# Create your models here.
class Dish(models.Model):
    STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('INACTIVE', 'Inactive'),
    ]
    
    name = models.CharField(
        max_length=100,
        help_text="Ingrese el nombre del plato"
    )
    description = models.TextField(
        help_text="Ingrese la descripción del plato"
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Ingrese el precio del plato"
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        help_text="Seleccione la categoría del plato"
    )
    status = models.CharField(
        max_length=8,
        choices=STATUS_CHOICES,
        default='ACTIVE',
        help_text="Estado del plato"
    )
    
    def __str__(self):
        return f"{self.name} - ${self.price}"
    
    class Meta:
        verbose_name = "plato"
        verbose_name_plural = "platos"