from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from stopwatch.views import UserViewSet

router = DefaultRouter()
router.register(r'Users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('stopwatch/', include(router.urls)),
]
