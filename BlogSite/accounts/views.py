from django.contrib.auth import views as auth_views
from django.views import generic
from django.urls import reverse_lazy

from .forms import CustomUserCreationForm, CustomUserLoginForm


class UserLoginView(auth_views.LoginView):
    form_class = CustomUserLoginForm
    template_name = "registration/login.html"


class UserRegisterView(generic.CreateView):
    form_class = CustomUserCreationForm
    template_name = "registration/register.html"
    success_url = reverse_lazy("login")


# def register(request):
#     if request.method == "GET":
#         return render(
#             request, "registration/register.html",
#             {"register_form": CustomUserCreationForm}
#         )
#     elif request.method == "POST":
#         form = CustomUserCreationForm(request.POST)
#         if form.is_valid():
#             user = form.save()
#             login(request, user)
#             messages.success(request, "Registration successful")
#             return redirect(reverse_lazy("login"))
#
#         messages.error(request, "Unsuccessful registration. Invalid information.")
#
