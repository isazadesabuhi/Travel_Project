# myapp/backends/email_auth_backend.py

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.core.exceptions import MultipleObjectsReturned, ObjectDoesNotExist

User = get_user_model()

class EmailAuthBackend(ModelBackend):
    """Authenticate using an e-mail address."""

    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None
        except MultipleObjectsReturned:
            return User.objects.filter(email=email).order_by('id').first()
        return None
