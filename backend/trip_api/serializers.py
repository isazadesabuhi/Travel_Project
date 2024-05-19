from rest_framework import serializers
from trip.models import Trip
from users.models import User
from django.conf import settings   

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # Add more fields as needed

class TripSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Nest the UserSerializer

    class Meta:
        model = Trip
        fields = ['id', 'user', 'title', 'place', 'price', 'starting_time', 'description', 'duration', 'slug']
        
        
        

class UserRegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('email', 'user_name', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}