from .serializers import RegistrationSerializer, CustomUserSerializer, UserProfileSerializer, PostSerializer, CommentSerializer

from accounts.models import CustomUser, UserProfile
from blog.models import Post, Comment

from rest_framework import viewsets, response
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from .serializers import TokenObtainSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class CustomUserViewSet(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
    # permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class TokenObtainView(TokenObtainPairView):
    serializer_class = TokenObtainSerializer

# Todo: TokenRefreshView
# class TokenRefreshView(TokenRefreshView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = TokenRefreshView
#     queryset = CustomUser.objects.all()


class RegisterViewSet(viewsets.ModelViewSet):
    serializer_class = RegistrationSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    permission_classes = [IsAuthenticated]


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    # def list(self, request, *args, **kwargs):
    #     posts = Post.objects.all()
    #     serializer = PostSerializer(posts, many=True)
    #     return response.Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

