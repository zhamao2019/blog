from rest_framework import routers
from django.urls import include, path
from .views import CustomUserViewSet, ProfileViewSet, PostViewSet, CommentViewSet


router = routers.DefaultRouter()
router.register(r'users', CustomUserViewSet, basename="users")
router.register(r'profiles', ProfileViewSet, basename="profiles")
router.register(r'posts', PostViewSet, basename="posts")
router.register(r'comments', CommentViewSet, basename="comments")

urlpatterns = router.urls
