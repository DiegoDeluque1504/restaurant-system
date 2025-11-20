from django.db import models

# Create your models here.
class DeliveryPerson(models.Model):
    STATUS_CHOICES = [
        ('AVAILABLE', 'Available'),
        ('BUSY', 'Busy'),
        ('OFFLINE', 'Offline'),
    ]
    
    name = models.CharField(
        max_length=100,
        help_text="Ingrese el nombre del repartidor"
    )
    phone = models.CharField(
        max_length=20,
        help_text="Ingrese el teléfono del repartidor"
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='AVAILABLE',
        help_text="Estado del repartidor"
    )
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "repartidor"
        verbose_name_plural = "repartidores"


class Delivery(models.Model):
    address = models.CharField(
        max_length=255,
        help_text="Ingrese la dirección de entrega"
    )
    phone = models.CharField(
        max_length=20,
        help_text="Ingrese el teléfono de contacto"
    )
    customer_name = models.CharField(
        max_length=100,
        help_text="Ingrese el nombre del cliente"
    )
    cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Ingrese el costo del delivery"
    )
    delivery_person = models.ForeignKey(
        DeliveryPerson,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="Seleccione el repartidor"
    )
    
    def __str__(self):
        return f"Delivery a {self.customer_name} - {self.address}"
    
    class Meta:
        verbose_name = "entrega"
        verbose_name_plural = "entregas"