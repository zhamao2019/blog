from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    # email = forms.EmailField(required=True)
    class Meta:
        model = get_user_model()
        fields = ("username", "email", "password1", "password2")

    # def save(self, commit=True):
    #     user = super(CustomUserCreationForm, self).save(commit=False)
    #     user.email = self.cleaned_data["email"]
    #     if commit:
    #         user.save()
    #
    #     return user


class CustomUserLoginForm(AuthenticationForm):
    username = forms.CharField(label="Email / Username")
