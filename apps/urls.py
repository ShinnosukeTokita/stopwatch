from django.contrib import admin
from django.urls import include, path

from stopwatch.views import CsrfView, PingView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("stopwatch/", include("stopwatch.urls")),
    path("csrf/", CsrfView),
    path("ping/", PingView),
]
