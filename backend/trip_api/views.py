from rest_framework import viewsets, filters, generics, permissions
from rest_framework.response import Response
from trip.models import Trip
from .serializers import TripSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission,IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.conf import settings

class PostUserWritePermission(BasePermission):
    message = 'Editing trips is restricted to the author only.'
    
    def has_object_permission(self, request, view, obj):
            if request.method in SAFE_METHODS:
                return True
            return obj.user == request.user


class TripList(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = TripSerializer
    queryset = Trip.objects.all()
    
    
class UserTripList(generics.ListAPIView):
    serializer_class = TripSerializer
    def get_queryset(self):
        username = self.kwargs['username']
        return Trip.objects.filter(user__user_name=username)
    
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
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Trip.objects.all()
    serializer_class = TripSerializer