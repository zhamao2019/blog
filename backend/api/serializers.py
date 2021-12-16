from rest_framework import serializers
from rest_framework.exceptions import NotAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_jwt.settings import api_settings

from accounts.models import CustomUser, UserProfile
from blog.models import Post, Comment


JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER


class TokenObtainSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(TokenObtainSerializer, self).validate(attrs)
        # Custom data
        data.update({'user': {
            'id': self.user.id,
            'uuid': self.user.uuid,
            'username': self.user.username,
            'email': self.user.email,
            'userprofile': self.user.userprofile.id,

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


class MiniUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id",
                  "uuid",
                  "username",
                  "email",
                  "date_joined",
                  "last_login",
                  ]


class UserProfileSerializer(serializers.ModelSerializer):
    user = MiniUserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ["id", "avatar", "bio", "user"]
        depth = 1


class CustomUserSerializer(serializers.ModelSerializer):
    userprofile = UserProfileSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = ["id", "uuid",
                  "username", "email",
                  "password", "is_superuser",
                  "is_active", "date_joined",
                  "last_login", "userprofile"]
        extra_kwargs = {
            'password': {'write_only': True},
        }


class ChangePasswordSerializer(serializers.Serializer):
    model = CustomUser

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class PasswordResetSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = Post
        fields = ["email"]
#
#     def validate(self, attrs):
#         try:
#             email = attrs.get("email")
#             if CustomUser.objects.filter(email=email).exists():
#                 user = CustomUser.objects.get(email=email)
#                 # uidb64 = urlsafe_base64_encode(user.id)
#                 token = PasswordResetTokenGenerator().make_token(user)
#                 pass
#             return attrs
#
#         except:
#
#         return


    # def validate(self, attrs):
    #     if attrs['password'] != attrs['password2']:
    #         raise serializers.ValidationError({"password": "Password fields didn't match."})
    #
    #     return attrs
    #
    # def update(self, instance, validated_data):
    #     instance.set_password(validated_data['password'])
    #     instance.save()
    #
    #     return instance


class PostSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ["id", "uuid", "title", "author", "content_body", "likes_num", "published_at", "edited_at"]
        depth = 1


class CommentSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "comment", "created_at", "post_id", "user"]
        depth = 1





