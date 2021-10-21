import uuid
from django.conf import settings
from django.db import models
from django.utils.timezone import now
from django.urls import reverse


class Post(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length=100, null=False, blank=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    content_body = models.TextField(null=False, blank=False)
    published_at = models.DateTimeField(default=now)
    edited_at = models.DateTimeField(default=now)
    likes_num = models.IntegerField(default=0)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("post-detail", args=(str(self.id)))
    #
    # def save(self):
    #    author = self.objects.get("author")
    #    self.author.save()


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="comment_user", on_delete=models.CASCADE, default=1)
    post = models.ForeignKey(Post, related_name="post_comments", on_delete=models.CASCADE)
    comment = models.TextField(max_length=500, null=False, blank=False)
    created_at = models.DateTimeField(default=now)

    def __str__(self):
        return "Comment {} by {}".format(self.comment, self.user)

