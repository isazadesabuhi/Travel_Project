from django.db import models

from django.core.validators import MinValueValidator
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from autoslug import AutoSlugField
    
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