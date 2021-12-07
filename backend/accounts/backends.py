from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q


class EmailOrUsernameBackend(ModelBackend):
    """
    This is a ModelBacked that allows authentication with either a username or an email address.

    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        user_model = get_user_model()

        # if username is None:
        #     username = kwargs.get(user_model.USERNAME_FIELD)
        try:
            user = user_model.objects.get(Q(username__iexact=username) | Q(email__iexact=username))
        except user_model.DoesNotExist:
            user_model().set_password(password)
            return
        except user_model.MultipleObjectsReturned:
            user = user_model.objects.filter(Q(username__iexact=username) | Q(email__iexact=username)).order_by('id').first()

        if user.check_password(password) and self.user_can_authenticate(user):
            return user

    def get_user(self, user_id):
        try:
            user_model = get_user_model()
            user = user_model.objects.get(pk=user_id)
            return user
        except user_model.DoesNotExist:
            return None
