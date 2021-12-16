from django.db.models.signals import post_save
from django.dispatch import receiver
from django.urls import reverse
from django.contrib.auth import get_user_model
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

from .models import UserProfile


CustomUser = get_user_model()


@receiver(post_save, sender=CustomUser)
def create_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # render email text
    email_plaintext_message = "{}?token={}".format(
        instance.request.build_absolute_uri(
            reverse('password_reset:reset-password-confirm')),
            reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="BlogSite"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@BlogSite.local",
        # to:
        [reset_password_token.user.email]
    )
