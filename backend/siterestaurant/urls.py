from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Rutas tradicionales
    path('', include('myapps.categories.urls')),
    path('', include('myapps.dishes.urls')),
    path('', include('myapps.orders.urls')),
    path('', include('myapps.deliveries.urls')),
    
    # 1. ViewSet (categories):
    path('api/viewset/', include('myapps.categories.urls_viewset')),
    
    # 2. GenericAPIView (dishes):
    path('api/generic/', include('myapps.dishes.urls_generic')),
    
    # 3. API View (orders):
    path('api/apiview/', include('myapps.orders.urls_apiview')),
    
    # 4. Mixins (categories):
    path('api/mixins/', include('myapps.categories.urls_mixins')),
    
    # 5. APIView reescrito (orders):
    path('api/apiview-rewrite/', include('myapps.orders.urls_apiview_rewrite')),
    
    # 6. APIView con decorator (deliveries):
    path('api/decorator/', include('myapps.deliveries.urls_apiview_decorator')),

    # 7. ViewSet (tables):
    path('api/viewset/', include('myapps.orders.urls_viewset')),

        # ==================== DESCOMENTAR ESTO ====================
    path('api/auth/', include('myapps.users.urls')),
]
