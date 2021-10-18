from rest_framework import serializers
from rest_framework.exceptions import NotAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from accounts.models import CustomUser, UserProfile
from blog.models import Post, Comment


class TokenObtainSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(TokenObtainSerializer, self).validate(attrs)
        # Custom data
        data.update({'user': {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
        }})

        return data


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ["username", "email", "password", "password2"]

        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = CustomUser(
            email=self.validated_data['email'],
            username=self.validated_data['username']
        )

        user.set_password(validated_data["password"])
        user.save()

        return user


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "uuid", "username", "email", "password", "is_superuser", "is_active", "date_joined", "last_login")
    #     extra_kwargs = {
    #         'password': {'write_only': True},
    #     }
    #
    # def create(self, validated_data):
    #     user = CustomUser().objects.create_user(**validated_data)
    #     return user
    #
    # def update(self, instance, validated_data):
    #     if 'password' in validated_data:
    #         password = validated_data.pop('password')
    #         instance.set_password(password)
    #     return super(CustomUserSerializer, self).update(instance, validated_data)


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


