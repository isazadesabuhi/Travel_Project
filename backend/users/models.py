from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager
from django_countries.fields import CountryField
class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, password, **other_fields)

    def create_user(self, email, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user
    
# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=255,unique=True)
    email = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    profile_picture = models.ImageField(upload_to='profile_pics', null=True, blank=True)
    password = models.CharField(max_length=255)
    
    countries_visited = CountryField(multiple=True, blank=True)  # Optional field
    objects = CustomAccountManager()

    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []