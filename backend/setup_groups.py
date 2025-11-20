"""
Script para configurar grupos y permisos del sistema de restaurante
Ejecutar: python setup_groups.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'siterestaurant.settings')
django.setup()

from django.contrib.auth.models import Group, Permission, User
from django.contrib.contenttypes.models import ContentType
from myapps.categories.models import Category
from myapps.dishes.models import Dish
from myapps.orders.models import Order, OrderDetail, Table
from myapps.deliveries.models import Delivery, DeliveryPerson


def create_groups_and_permissions():
    print("🔧 Configurando grupos y permisos del restaurante...")
    
    # ==================== CREAR GRUPOS ====================
    admin_group, created = Group.objects.get_or_create(name='Administradores')
    if created:
        print("✓ Grupo 'Administradores' creado")
    
    manager_group, created = Group.objects.get_or_create(name='Gerentes')
    if created:
        print("✓ Grupo 'Gerentes' creado")
    
    waiter_group, created = Group.objects.get_or_create(name='Meseros')
    if created:
        print("✓ Grupo 'Meseros' creado")
    
    chef_group, created = Group.objects.get_or_create(name='Chefs')
    if created:
        print("✓ Grupo 'Chefs' creado")
    
    delivery_group, created = Group.objects.get_or_create(name='Repartidores')
    if created:
        print("✓ Grupo 'Repartidores' creado")
    
    customer_group, created = Group.objects.get_or_create(name='Clientes')
    if created:
        print("✓ Grupo 'Clientes' creado")
    
    # ==================== OBTENER CONTENT TYPES ====================
    category_ct = ContentType.objects.get_for_model(Category)
    dish_ct = ContentType.objects.get_for_model(Dish)
    order_ct = ContentType.objects.get_for_model(Order)
    order_detail_ct = ContentType.objects.get_for_model(OrderDetail)
    table_ct = ContentType.objects.get_for_model(Table)
    delivery_ct = ContentType.objects.get_for_model(Delivery)
    delivery_person_ct = ContentType.objects.get_for_model(DeliveryPerson)
    
    print("\n📋 Configurando permisos por grupo...")
    
    # ==================== ADMINISTRADORES: TODOS LOS PERMISOS ====================
    admin_permissions = Permission.objects.filter(
        content_type__in=[category_ct, dish_ct, order_ct, order_detail_ct, 
                         table_ct, delivery_ct, delivery_person_ct]
    )
    admin_group.permissions.set(admin_permissions)
    print(f"✓ Administradores: {admin_permissions.count()} permisos (CRUD completo)")
    
    # ==================== GERENTES: CRUD EXCEPTO ELIMINAR ====================
    manager_permissions = Permission.objects.filter(
        content_type__in=[category_ct, dish_ct, order_ct, order_detail_ct, 
                         table_ct, delivery_ct, delivery_person_ct]
    ).exclude(codename__startswith='delete_')
    manager_group.permissions.set(manager_permissions)
    print(f"✓ Gerentes: {manager_permissions.count()} permisos (CRU sin Delete)")
    
    # ==================== MESEROS ====================
    waiter_permissions = []
    # Ver categorías y platos
    waiter_permissions.extend(Permission.objects.filter(
        content_type__in=[category_ct, dish_ct],
        codename__startswith='view_'
    ))
    # CRUD completo de órdenes y detalles
    waiter_permissions.extend(Permission.objects.filter(
        content_type__in=[order_ct, order_detail_ct]
    ))
    # Gestionar mesas
    waiter_permissions.extend(Permission.objects.filter(
        content_type=table_ct
    ))
    waiter_group.permissions.set(waiter_permissions)
    print(f"✓ Meseros: {len(waiter_permissions)} permisos (Órdenes y Mesas)")
    
    # ==================== CHEFS ====================
    chef_permissions = []
    # Ver categorías y platos
    chef_permissions.extend(Permission.objects.filter(
        content_type__in=[category_ct, dish_ct],
        codename__startswith='view_'
    ))
    # Ver y actualizar órdenes
    chef_permissions.extend(Permission.objects.filter(
        content_type=order_ct,
        codename__in=['view_order', 'change_order']
    ))
    # Ver detalles de órdenes
    chef_permissions.extend(Permission.objects.filter(
        content_type=order_detail_ct,
        codename='view_orderdetail'
    ))
    chef_group.permissions.set(chef_permissions)
    print(f"✓ Chefs: {len(chef_permissions)} permisos (Ver órdenes y platos)")
    
    # ==================== REPARTIDORES ====================
    delivery_permissions = []
    # Ver entregas y actualizarlas
    delivery_permissions.extend(Permission.objects.filter(
        content_type=delivery_ct,
        codename__in=['view_delivery', 'change_delivery']
    ))
    # Ver órdenes relacionadas
    delivery_permissions.extend(Permission.objects.filter(
        content_type=order_ct,
        codename='view_order'
    ))
    delivery_group.permissions.set(delivery_permissions)
    print(f"✓ Repartidores: {len(delivery_permissions)} permisos (Entregas)")
    
    # ==================== CLIENTES ====================
    customer_permissions = []
    # Ver categorías y platos
    customer_permissions.extend(Permission.objects.filter(
        content_type__in=[category_ct, dish_ct],
        codename__startswith='view_'
    ))
    # Ver sus propias órdenes
    customer_permissions.extend(Permission.objects.filter(
        content_type=order_ct,
        codename='view_order'
    ))
    customer_group.permissions.set(customer_permissions)
    print(f"✓ Clientes: {len(customer_permissions)} permisos (Solo consultas)")
    
    print("\n🎉 ¡Configuración de permisos completada!")


def create_test_users():
    print("\n👥 Creando usuarios de prueba...")
    
    users_data = [
        ('admin', 'admin@restaurant.com', 'admin123', 'Administradores', True, True),
        ('gerente', 'gerente@restaurant.com', 'gerente123', 'Gerentes', True, False),
        ('mesero', 'mesero@restaurant.com', 'mesero123', 'Meseros', False, False),
        ('chef', 'chef@restaurant.com', 'chef123', 'Chefs', False, False),
        ('repartidor', 'repartidor@restaurant.com', 'repartidor123', 'Repartidores', False, False),
        ('cliente', 'cliente@restaurant.com', 'cliente123', 'Clientes', False, False),
    ]
    
    for username, email, password, group_name, is_staff, is_superuser in users_data:
        if not User.objects.filter(username=username).exists():
            user = User.objects.create_user(username, email, password)
            user.is_staff = is_staff
            user.is_superuser = is_superuser
            user.save()
            
            group = Group.objects.get(name=group_name)
            user.groups.add(group)
            
            status = "superuser" if is_superuser else "staff" if is_staff else "user"
            print(f"✓ Usuario '{username}' creado ({group_name} - {status})")
        else:
            print(f"⚠️  Usuario '{username}' ya existe")
    
    print("\n📝 Credenciales de acceso:")
    print("=" * 60)
    for username, email, password, group_name, is_staff, is_superuser in users_data:
        print(f"  {username:12} / {password:15} ({group_name})")


if __name__ == '__main__':
    create_groups_and_permissions()
    create_test_users()
    print("\n ¡Configuración completa!")
    print("   Ahora puedes usar autenticación JWT con permisos granulares.")
    print("   Para habilitar JWT, actualiza settings.py (ver comentarios)")