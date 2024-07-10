from rest_framework import filters, generics, permissions
from trip.models import Trip, Category,Type,Accommodation
from .serializers import TripSerializer, CategorySerializer,TypeSerializer,AccommodationSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission
from django.shortcuts import get_object_or_404

class PostUserWritePermission(BasePermission):
    message = 'Editing trips is restricted to the author only.'
    
    def has_object_permission(self, request, view, obj):
            if request.method in SAFE_METHODS:
                return True
            return obj.user == request.user
    

class TripList(generics.ListAPIView):
    serializer_class = TripSerializer
    queryset = Trip.objects.all()

    
    
class UserTripList(generics.ListAPIView):
    serializer_class = TripSerializer
    def get_queryset(self):
        username = self.kwargs['username']
        return Trip.objects.filter(user__username=username)
    
class TripDetail(generics.RetrieveAPIView):
    serializer_class = TripSerializer
    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Trip, slug=item)


class TripListDetailfilter(generics.ListAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description']


class CreateTrip(generics.CreateAPIView):

    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Set the user to the logged-in user
        
class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
class TypeList(generics.ListCreateAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    
class AccommodationTypeList(generics.ListAPIView):
    serializer_class = AccommodationSerializer
    queryset = Accommodation.objects.all()