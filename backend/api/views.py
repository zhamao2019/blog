from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CustomUserSerializer, UserProfileSerializer, PostSerializer, CommentSerializer
from accounts.models import CustomUser, UserProfile
from blog.models import Post, Comment


class CustomUserViewSet(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = Comment.objects.all()
