from rest_framework import routers
from django.conf.urls import url
from .views import (
    RegisterViewSet,
    CustomUserViewSet, ProfileViewSet, PostViewSet, CommentViewSet,
    PostHistoryView, CommentListView
)

router = routers.DefaultRouter()

router.register(r'register', RegisterViewSet, basename="register")
router.register(r'users', CustomUserViewSet, basename="users")
router.register(r'profiles', ProfileViewSet, basename="profiles")
router.register(r'posts', PostViewSet, basename="posts")
router.register(r'comments', CommentViewSet, basename="comments")

urlpatterns = [
    url(r'^posts/author/(?P<author>\d+)/$', PostHistoryView.as_view(), name='post-history'),
    url(r'^comments/post/(?P<post>\d+)/$', CommentListView.as_view(), name='comments-list'),
]
urlpatterns += router.urls
