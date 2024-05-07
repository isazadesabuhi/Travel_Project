from rest_framework import serializers
from trip.models import Trip
from users.models import NewUser
from django.conf import settings 
class TripSerializer(serializers.ModelSerializer):
    # author = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Trip
        fields = ('user','title', 'place', 'price', 
                  'starting_time', 'description', 'duration')
        # depth = 1
        
        
        

class UserRegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('email', 'user_name', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}