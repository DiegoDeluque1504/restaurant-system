from rest_framework.routers import DefaultRouter
from .views_viewset import TableViewSet

router = DefaultRouter()
router.register(r'tables', TableViewSet)

urlpatterns = router.urls