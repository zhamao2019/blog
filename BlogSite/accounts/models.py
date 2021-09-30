import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.urls import reverse
# from django.contrib.staticfiles.storage import


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, username, email, password=None):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError("User must have an email address")
        # elif not username:
        #     raise ValueError("User must have an username")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        user = self.create_user(username, email, password, **extra_fields)
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True
    )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    avatar = models.ImageField(upload_to="img/avatar", null=True, blank=True)

    objects = CustomUserManager()

    def __str__(self):
        return self.username

    # def get_absolute_url(self):
    #     return reverse("profile", args=(str(self.user.id)))
    #


class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(null=True, blank=True)
    avatar = models.ImageField(default="default.png", upload_to="static/img/", null=True, blank=True)

    def __str__(self):
        return self.user.username

    def get_absolute_url(self):
        return reverse("profile", args=(str(self.user.id)))

    # @property
    # def get_avatar(self):
    #     if self.avatar:
    #         return self.avatar.url
    #     else:
    #         return static("img/avatar/default.png")


