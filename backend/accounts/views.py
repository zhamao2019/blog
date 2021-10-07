from django.contrib.auth import views as auth_views
from rest_framework.viewsets import ModelViewSet
from django.views.generic import CreateView, DetailView, UpdateView
from django.urls import reverse_lazy
# from .serializers import CustomUserSerializer, UserProfileSerializer
from .models import CustomUser, UserProfile

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


class UpdateProfileView(UpdateView):
    model = UserProfile
    template_name = "profile/edit_profile.html"
    fields = ["bio", "avatar"]

    def get_success_url(self):
        return reverse_lazy("profile", kwargs={'pk': self.object.pk})

    # def get_object(self):
    #     return self.request.user


