"""
Clases de permisos personalizados para el sistema de restaurante
"""
from rest_framework import permissions


class IsAdminUser(permissions.BasePermission):
    """
    Permite acceso solo a usuarios administradores
    """
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.groups.filter(name='Administradores').exists()
        )


class IsManagerOrAdmin(permissions.BasePermission):
    """
    Permite acceso a gerentes y administradores
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        user_groups = request.user.groups.values_list('name', flat=True)
        return 'Administradores' in user_groups or 'Gerentes' in user_groups


class IsEmployeeOrAbove(permissions.BasePermission):
    """
    Permite acceso a empleados, gerentes y administradores
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        user_groups = request.user.groups.values_list('name', flat=True)
        allowed_groups = ['Administradores', 'Gerentes', 'Meseros', 'Chefs']
        return any(group in user_groups for group in allowed_groups)


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Permite acceso al propietario del objeto o a administradores
    """
    def has_object_permission(self, request, view, obj):
        # Los administradores pueden acceder a todo
        if request.user.groups.filter(name='Administradores').exists():
            return True
        
        # El propietario puede acceder a su propio objeto
        if hasattr(obj, 'user'):
            return obj.user == request.user
        
        return False


class ReadOnly(permissions.BasePermission):
    """
    Permite solo lectura (GET, HEAD, OPTIONS)
    """
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS