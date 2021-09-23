from django.shortcuts import render
from django.views.generic import ListView
from.models import Post, Comment

# def index(request):
#     return render(request, "base.html")

class IndexView(ListView):
    model = Post
    template_name = "index.html"
