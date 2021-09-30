from django.contrib.auth import views as auth_views
from django.views.generic import CreateView, DetailView, UpdateView, View
from django.urls import reverse_lazy
from .serializers import CustomUserSerializer
from .models import CustomUser, UserProfile

from .forms import CustomUserCreationForm, CustomUserLoginForm, UpdateUserProfileForm


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
    # success_url = "/profile/{profile_id}"

    def get_success_url(self):
        return reverse_lazy("profile", kwargs={'pk': self.object.pk})

    # def get_object(self):
    #     return self.request.user



# class LoginViewSet(ViewSet):
#     serializer_class = CustomUserSerializer
#     # queryset = CustomUser.objects.all()
#
#     def get_queryset(self):
#         return CustomUser.objects.filter(self.request.user)
