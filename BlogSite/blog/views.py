from django.shortcuts import render
from django.views.generic import ListView, DetailView
from.models import Post, Comment


class IndexView(ListView):
    model = Post
    template_name = "index.html"


class PostDetailView(DetailView):
    model = Post
    template_name = "post_detail.html"
