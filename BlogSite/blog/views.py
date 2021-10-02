from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from.models import Post, Comment
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin


class IndexView(ListView):
    model = Post
    template_name = "index.html"


class PostDetailView(DetailView):
    model = Post
    template_name = "post_detail.html"

    # def get_comments(self):
    #     return self.object.post.


class CreatePostView(CreateView, LoginRequiredMixin):
    model = Post
    template_name = "add_post.html"
    fields = ("title", "content_body", )

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def get_success_url(self):
        return reverse_lazy("post-detail", kwargs={'pk': self.object.pk})


class UpdatePostView(UpdateView):
    model = Post
    template_name = "edit_post.html"
    fields = ("title", "content_body", )


class DeletePostView(DeleteView):
    model = Post
    template_name = "delete_post.html"
    success_url = reverse_lazy("home")


class CreateCommentView(CreateView, LoginRequiredMixin):
    model = Comment
    template_name = "add_comment.html"
    fields = ["comment"]

    def form_valid(self, form):
        form.instance.user = self.request.user
        form.instance.post = Post.objects.get(id=self.kwargs.get('pk'))
        return super(CreateCommentView, self).form_valid(form)

    def get_success_url(self):
        return reverse_lazy("post-detail", kwargs={'pk': self.object.post.pk})
