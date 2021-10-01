from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import UserRegisterView, UserLoginView, ProfileView, UpdateProfileView


urlpatterns = [
    path('login/', UserLoginView.as_view(), name="login"),
    path('register/', UserRegisterView.as_view(), name="register"),
    path('blogger/<int:pk>/', ProfileView.as_view(), name="profile"),
    path('blogger/edit/<int:pk>/', UpdateProfileView.as_view(), name="edit-profile"),

    # path('register/', viewset=LoginViewSet, name='register'),
    # path('logout',),
]

# Only add this when we in debug mode
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
