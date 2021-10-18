from rest_framework import routers
from .views import RegisterViewSet, CustomUserViewSet, ProfileViewSet, PostViewSet, CommentViewSet


router = routers.DefaultRouter()

router.register(r'register', RegisterViewSet, basename="register")
router.register(r'users', CustomUserViewSet, basename="users")
router.register(r'profiles', ProfileViewSet, basename="profiles")
router.register(r'posts', PostViewSet, basename="posts")
router.register(r'comments', CommentViewSet, basename="comments")

urlpatterns = router.urls
