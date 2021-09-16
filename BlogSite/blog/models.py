import uuid
from django.db import models


class User(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=16)
    email = models.EmailField()
    created_at = models.DateTimeField("datetime created")


class Post(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4)

    title = models.CharField(max_length=100)
    published_at = models.DateTimeField("date published")
