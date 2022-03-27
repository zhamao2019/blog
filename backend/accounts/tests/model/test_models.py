import shutil
import tempfile

from io import BytesIO
from PIL import Image
from django.core.files.base import File

from django.test import TestCase, override_settings
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile

MEDIA_ROOT = tempfile.mkdtemp()


class CustomUserManagerModelTests(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(
            username="test_user",
            email="testuser@example.com",
            password="password"
        )
        user.save()

        self.assertEqual(str(user), "test_user")
        self.assertEqual(user.username, "test_user")
        self.assertEqual(user.email, "testuser@example.com")

    def test_create_user_raise_error_without_email(self):
        User = get_user_model()
        with self.assertRaises(ValueError, msg="User must have an email address"):
            User.objects.create_user(
                username="test_user",
                email=None,
                password="password"
            )

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser(
            username="test_admin",
            email="testadmin@example.com",
            password="password"
        )
        admin_user.save()

        self.assertEqual(str(admin_user), "test_admin")
        self.assertEqual(admin_user.username, "test_admin")
        self.assertEqual(admin_user.email, "testadmin@example.com")
        self.assertTrue(admin_user.is_admin)
        self.assertTrue(admin_user.is_superuser)
        self.assertTrue(admin_user.is_staff)


class CustomUserProfileModelTests(TestCase):
    @staticmethod
    def get_image_file(name, ext='png', size=(400, 400), color=(256, 0, 0)):
        file_obj = BytesIO()
        image = Image.new("RGB", size=size, color=color)

        image.save(file_obj, ext)
        file_obj.seek(0)
        return File(file_obj, name=name)

    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(MEDIA_ROOT, ignore_errors=True)  # delete the temp dir
        super().tearDownClass()

    @classmethod
    def setUpTestData(cls):
        User = get_user_model()
        cls.user = User.objects.create_user(username="test_user",
                                             email="testuser@example.com",
                                             password="password")

    def test_create_userprofile(self):
        profile = get_user_model().objects.last().userprofile

        self.assertEqual(str(profile), "test_user")
        self.assertEqual(profile.user.username, "test_user")
        self.assertEqual(profile.avatar.name, "default.png")
        self.assertEqual(profile.bio, None)

    @override_settings(MEDIA_ROOT=MEDIA_ROOT)
    def test_userprofile_upload_and_resize_img(self):
        profile = get_user_model().objects.last().userprofile
        img = CustomUserProfileModelTests.get_image_file("test_image.png")
        profile.avatar = SimpleUploadedFile(img.name, img.read(), content_type='image/png')

        profile.save()

        self.assertEqual(profile.avatar.name, "img/test_image.png")
        self.assertEqual(profile.avatar.width, 300)
        self.assertEqual(profile.avatar.height, 300)








