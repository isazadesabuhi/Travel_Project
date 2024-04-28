from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from .models import Trip,UserProfile

class SignupForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username','email', 'password1', 'password2']

class LoginForm(forms.Form):
    email = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)
    def clean(self):
        cleaned_data = super().clean()
        email = cleaned_data.get("email")
        # Optional: Add extra steps to validate the email, if needed
        return cleaned_data
        
class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['firstname', 'lastname', 'bio', 'location', 'birth_date']

    
class TripForm(forms.ModelForm):
    duration = forms.IntegerField(validators=[MinValueValidator(1)], help_text="Duration in days")
    
    class Meta:
        model = Trip
        fields = ['title', 'place', 'price', 'starting_time', 'description', 'duration', 'slug']
