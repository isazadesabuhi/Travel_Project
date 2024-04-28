from rest_framework import serializers
from trip.models import Trip

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ('title', 'place', 'price', 'starting_time', 'description', 'duration', 'slug')