from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    first_name = None
    last_name = None
    date_joined = None
    groups = None
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
