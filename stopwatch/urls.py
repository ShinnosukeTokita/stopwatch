from django.urls import path

from . import views

urlpatterns = [
    path("signup/", views.RegisterView.as_view(), name="user-signup"),
    path("login/", views.LoginView.as_view(), name="user-login"),
]
