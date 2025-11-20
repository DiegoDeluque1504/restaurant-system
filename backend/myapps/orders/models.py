from django.db import models
from myapps.dishes.models import Dish
from myapps.deliveries.models import Delivery

# Create your models here.
class Table(models.Model):
    STATUS_CHOICES = [
        ('AVAILABLE', 'Available'),
        ('OCCUPIED', 'Occupied'),
        ('RESERVED', 'Reserved'),
    ]
    
    number = models.IntegerField(
        unique=True,
        help_text="Ingrese el número de mesa"
    )
    capacity = models.IntegerField(
        help_text="Ingrese la capacidad de la mesa"
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='AVAILABLE',
        help_text="Estado de la mesa"
    )
    
    def __str__(self):
        return f"Mesa {self.number}"
    
    class Meta:
        verbose_name = "mesa"
        verbose_name_plural = "mesas"


class Order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pendiente'),
        ('PREPARING', 'En Preparación'),
        ('READY', 'Listo'),
        ('DELIVERED', 'Entregado'),
        ('CANCELLED', 'Cancelado'),
    ]
    
    TYPE_CHOICES = [
        ('DINE_IN', 'Para comer aquí'),
        ('TAKEOUT', 'Para llevar'),
        ('DELIVERY', 'Delivery'),
    ]
    
    date = models.DateTimeField(
        auto_now_add=True,
        help_text="Fecha y hora de la orden"
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='PENDING',
        help_text="Estado de la orden"
    )
    total = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Total de la orden"
    )
    order_type = models.CharField(
        max_length=10,
        choices=TYPE_CHOICES,
        default='DINE_IN',
        help_text="Tipo de orden"
    )
    table = models.ForeignKey(
        Table,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="Seleccione la mesa (si aplica)"
    )
    delivery = models.ForeignKey(
        Delivery,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="Información de delivery (si aplica)"
    )
    dishes = models.ManyToManyField(
        Dish,
        through='OrderDetail',
        help_text="Platos de la orden"
    )
    
    def __str__(self):
        return f"Orden #{self.id} - {self.date.strftime('%Y-%m-%d %H:%M')}"
    
    class Meta:
        verbose_name = "orden"
        verbose_name_plural = "órdenes"


class OrderDetail(models.Model):
    quantity = models.IntegerField(
        help_text="Cantidad del plato"
    )
    unit_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Precio unitario"
    )
    subtotal = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Subtotal"
    )
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        help_text="Orden asociada"
    )
    dish = models.ForeignKey(
        Dish,
        on_delete=models.CASCADE,
        help_text="Plato ordenado"
    )
    
    def __str__(self):
        return f"{self.dish.name} x{self.quantity} - Orden #{self.order.id}"
    
    class Meta:
        verbose_name = "detalle de orden"
        verbose_name_plural = "detalles de órdenes"
        unique_together = ('order', 'dish')
    def get_status_display(self):
        return dict(self.STATUS_CHOICES).get(self.status, self.status)

    def get_order_type_display(self):
        return dict(self.TYPE_CHOICES).get(self.order_type, self.order_type)
