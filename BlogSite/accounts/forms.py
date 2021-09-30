from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UserChangeForm
from django.contrib.auth import get_user_model
from .models import CustomUser, UserProfile


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = get_user_model()
        fields = ("username", "email", "password1", "password2")


class CustomUserLoginForm(AuthenticationForm):
    username = forms.CharField(label="Email / Username")


class UpdateCustomUserForm(UserChangeForm):
    email = forms.EmailField()

    class Meta:
        model = CustomUser
        fields = ["username", "email"]


class UpdateUserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ["avatar", "bio"]

