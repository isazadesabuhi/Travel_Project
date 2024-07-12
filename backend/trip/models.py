from django.db import models
from django.core.validators import MinValueValidator
from django.conf import settings
from autoslug import AutoSlugField

class Category(models.Model):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
class Type(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name

class Accommodation(models.Model):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
class Trip(models.Model):
            
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='users')
  
    title = models.CharField(max_length=255)
    place = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    starting_time = models.DateField()
    description = models.CharField(max_length=3000)
    duration = models.IntegerField(validators=[MinValueValidator(1)], help_text="Duration in days")
    slug = AutoSlugField(populate_from='title', unique_with=['title'])
    categories = models.ManyToManyField(Category, related_name='trips', null=True, blank=True)
    trip_type = models.ForeignKey(Type,on_delete=models.CASCADE , related_name='types',null=True, blank=True)
    accommodation_types = models.ManyToManyField(Accommodation, related_name='accommodation', null=True, blank=True)
    accommodation_info = models.CharField(max_length=255,null=True, blank=True)
    
    def __str__(self):
        return self.title