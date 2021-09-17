import uuid
from django.conf import settings
from django.db import models
from django.utils.timezone import now


class Post(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length=100)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    content_body = models.TextField(default="")
    published_at = models.DateTimeField(default=now)
    edited_at = models.DateTimeField(default=now, editable=True)
    likes_num = models.IntegerField(default=0)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.TextField(default="", max_length=500)
    created_at = models.DateTimeField(default=now)

