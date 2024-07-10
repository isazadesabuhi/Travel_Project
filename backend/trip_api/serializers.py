from rest_framework import serializers
from trip.models import Trip, Category,Type,Accommodation
from users.models import User
from django.conf import settings

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
        
class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['id','name','description']

class AccommodationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accommodation
        fields = ['id','name']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # Add more fields as needed

class TripSerializer(serializers.ModelSerializer):
    inclusions = serializers.JSONField(required=False)
    
    categories = serializers.SlugRelatedField(
        many=True,
        queryset=Category.objects.all(),
        slug_field='name'
    )
    
    trip_type = TypeSerializer()  # Use the nested serializer here
    user = UserSerializer(read_only=True)
    
    accommodation_types = serializers.SlugRelatedField(
        many=True,
        queryset=Accommodation.objects.all(),
        slug_field='name'
    )


    class Meta:
        model = Trip
        fields = ['id', 'user', 'title', 'place', 'price', 'starting_time', 'description', 'duration', 'slug', 'categories', 'trip_type','accommodation_info','accommodation_types','inclusions']

    def create(self, validated_data):
        categories_data = validated_data.pop('categories')
        trip_type_data = validated_data.pop('trip_type')
        accommodation_type_data = validated_data.pop('accommodation_types')
        

        

        trip = Trip.objects.create(**validated_data)
        for category_name in categories_data:
            category, created = Category.objects.get_or_create(name=category_name)
            trip.categories.add(category)
            
        
        # Set the trip_type with nested serializer data
        trip_type, created = Type.objects.get_or_create(**trip_type_data)
        trip.trip_type = trip_type
        trip.save()
        
        for accommodation_name in accommodation_type_data:
            accommodation, created = Accommodation.objects.get_or_create(name=accommodation_name)
            trip.accommodation_types.add(accommodation)
        
        return trip   

class UserRegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('email', 'user_name', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}