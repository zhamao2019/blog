import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.urls import reverse
from PIL import Image
from django.conf import settings
from django.conf.urls.static import static


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

    objects = CustomUserManager()

    def __str__(self):
        return self.username


class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(null=True, blank=True)
    avatar = models.ImageField(default="default.png", upload_to="img", null=True)

    def __str__(self):
        return self.user.username

    # Override the save method of the model
    def save(self):
        super().save()
        # Open image
        img = Image.open(self.avatar.path)

        # resize image
        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            # Resize image
            img.thumbnail(output_size)
            # Save it again and override the larger image
            img.save(self.avatar.path)

    def get_absolute_url(self):
        return reverse("profile", args=(str(self.user.id)))

    # @property
    # def get_avatar(self):
    #     if self.avatar:
    #         return self.avatar.url
    #     else:
    #         return static("default.png")


