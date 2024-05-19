from django.db import models
# from django.contrib.auth import get_user_model

# User = get_user_model()

from django.core.validators import MinValueValidator
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from autoslug import AutoSlugField

# class UserProfile(models.Model):
#     firstname = models.CharField(max_length=100, blank=True)  # Added field for first name
#     lastname = models.CharField(max_length=100, blank=True)   # Added field for last name
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
#     bio = models.TextField(max_length=500, blank=True)
#     location = models.CharField(max_length=30, blank=True)
#     birth_date = models.DateField(null=True, blank=True)
    
    
#     def __str__(self):
#         return self.user.user_name

# # Automatically create a UserProfile when a User is created
# @receiver(post_save, sender=User)
# def create_or_update_user_profile(sender, instance, created, **kwargs):
#     if created:
#         UserProfile.objects.create(user=instance)
#     instance.profile.save()
    
    
    
    
    
class Trip(models.Model):
            
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='users')
  
    title = models.CharField(max_length=255)
    place = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    starting_time = models.DateField()
    description = models.CharField(max_length=3000)
    duration = models.IntegerField(validators=[MinValueValidator(1)], help_text="Duration in days")
    slug = AutoSlugField(populate_from='title', unique_with=['starting_time'])
    
    def __str__(self):
        return self.title
    
# 
# Additional user information

    