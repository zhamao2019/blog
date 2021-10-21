from rest_framework import routers
from django.urls import path, include
from django.conf.urls import url
from .views import (
    RegisterViewSet, CustomUserViewSet, ProfileViewSet, PostViewSet, CommentViewSet,
    PostHistoryView
)

router = routers.DefaultRouter()

router.register(r'register', RegisterViewSet, basename="register")
router.register(r'users', CustomUserViewSet, basename="users")
router.register(r'profiles', ProfileViewSet, basename="profiles")
router.register(r'posts', PostViewSet, basename="posts")
router.register(r'comments', CommentViewSet, basename="comments")

urlpatterns = [
    # path('posts/author/<int:author>', PostHistoryView, name='post-history'),
    # url(r'^posts/author/(?P<author>\d+)/$', PostHistoryView, name='post-history'),
    # url(r'^posts/author/(?P<author>\d+)/$', PostHistoryViewSet, name='post-history'),
    url(r'^posts/author/(?P<author>\d+)/$', PostHistoryView.as_view(), name='post-history'),
]
urlpatterns += router.urls
