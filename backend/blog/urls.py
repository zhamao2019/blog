from django.urls import path
from .views import IndexView, PostDetailView, CreatePostView, UpdatePostView, DeletePostView, CreateCommentView


urlpatterns = [
    path('', IndexView.as_view(), name='home'),
    path('post_details/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('post_details/create/', CreatePostView.as_view(), name='add-post'),
    path('post_details/edit/<int:pk>/', UpdatePostView.as_view(), name='edit-post'),
    path('post_details/<int:pk>/remove/', DeletePostView.as_view(), name='delete-post'),
    path('post_details/<int:pk>/comment/create/', CreateCommentView.as_view(), name='add-comment'),
]