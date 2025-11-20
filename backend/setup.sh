#!/bin/bash

echo "=== Configuración del Sistema de Restaurante Django ==="

# Verificar Python
if ! command -v python3 &> /dev/null; then
    echo "Error: Python3 no está instalado"
    exit 1
fi

# Crear entorno virtual
echo "Creando entorno virtual..."
python3 -m venv .venv

# Activar entorno virtual
echo "Activando entorno virtual..."
source .venv/bin/activate

# Instalar dependencias
echo "Instalando dependencias..."
pip install -r requirements.txt

# Verificar archivo .env
if [ ! -f .env ]; then
    echo "⚠️  Advertencia: Archivo .env no encontrado"
    echo "Recuerda crear el archivo .env con la configuración de la base de datos"
fi

# Aplicar migraciones
echo "Aplicando migraciones..."
python manage.py migrate

# Preguntar por superusuario
echo ""
echo "¿Quieres crear un superusuario para el admin? (y/n)"
read answer
if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
    python manage.py createsuperuser
fi

echo ""
echo "✅ Configuración completada!"
echo "Para ejecutar el servidor:"
echo "  source .venv/bin/activate"
echo "  python manage.py runserver"
echo ""
echo "📝 Admin: http://127.0.0.1:8000/admin/"
