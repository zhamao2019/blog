from .serializers import *
from accounts.models import CustomUser, UserProfile
from blog.models import Post, Comment

from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.views.generic import ListView


class JSONResponse(HttpResponse):
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


class CustomUserViewSet(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]


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


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = CustomUser
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(generics.UpdateAPIView):
    # queryset = CustomUser.objects.get()
    # permission_classes = (IsAuthenticated,)
    serializer_class = PasswordResetSerializer

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)


class PostHistoryView(ListView):
    def get(self, request, *args, **kwargs):
        posts = Post.objects.filter(author=self.kwargs['author'])
        serializer = PostSerializer(posts, many=True)

        return JSONResponse(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user, post_id=self.request.data['post_id'])


class CommentListView(ListView):
    def get(self, request, *args, **kwargs):
        comments = Comment.objects.filter(post=self.kwargs['post'])
        serializer = CommentSerializer(comments, many=True)

        return JSONResponse(serializer.data)
