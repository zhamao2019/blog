from django.contrib.auth import views as auth_views
from rest_framework.viewsets import ModelViewSet
from django.views.generic import CreateView, DetailView, UpdateView, ListView
from django.urls import reverse_lazy
# from .serializers import CustomUserSerializer, UserProfileSerializer
from .models import CustomUser, UserProfile
from blog.models import Post

from .forms import CustomUserCreationForm, CustomUserLoginForm


class UserLoginView(auth_views.LoginView):
    form_class = CustomUserLoginForm
    template_name = "registration/login.html"


class UserRegisterView(CreateView):
    form_class = CustomUserCreationForm
    template_name = "registration/register.html"
    success_url = reverse_lazy("login")


class ProfileView(DetailView):
    model = UserProfile
    template_name = "profile/profile.html"

    def get_context_data(self, **kwargs):
        context = super(ProfileView, self).get_context_data(**kwargs)
        user = self.object.user
        context["user_posts"] = Post.objects.filter(author=user)
        return context

    # def get_queryset(self):
    #     user = self.request.user
    #     user_posts = Post.objects.filter(author=user)
    #     return user_posts


class UpdateProfileView(UpdateView):
    model = UserProfile
    template_name = "profile/edit_profile.html"
    fields = ["bio", "avatar"]

    def get_success_url(self):
        return reverse_lazy("profile", kwargs={'pk': self.object.pk})

    # def get_object(self):
    #     return self.request.user
