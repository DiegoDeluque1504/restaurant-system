from django.db import models

# Create your models here.
class Category(models.Model):
    STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('INACTIVE', 'Inactive'),
    ]
    
    name = models.CharField(
        max_length=100, 
        help_text="Ingrese el nombre de la categoría"
    )
    description = models.TextField(
        help_text="Ingrese la descripción de la categoría"
    )
    status = models.CharField(
        max_length=8,
        choices=STATUS_CHOICES,
        default='ACTIVE',
        help_text="Estado de la categoría"
    )
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "categoría"
        verbose_name_plural = "categorías"