from django.urls import path
from .views import IndexView, PostDetailView


urlpatterns = [
    path('', IndexView.as_view(), name='home'),
    path('details/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
]