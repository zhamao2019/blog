from rest_framework import serializers
from accounts.models import CustomUser, UserProfile
from blog.models import Post, Comment


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("uuid", "username", "email", "is_superuser", "is_active", "date_joined", "last_login")


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ("id", "avatar", "bio")


class PostSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer()

    class Meta:
        model = Post
        fields = ["id", "uuid", "title", "author", "content_body", "likes_num", "published_at", "edited_at"]


class CommentSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Comment
        fields = "__all__"


