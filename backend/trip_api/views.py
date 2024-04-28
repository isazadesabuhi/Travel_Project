from rest_framework import generics
from trip.models import Trip
from .serializers import TripSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser,DjangoModelPermissionsOrAnonReadOnly,DjangoModelPermissions


class PostUserWritePermission(BasePermission):
    message = 'Editing trips is restricted to the author only.'
    
    def has_object_permission(self, request, view, obj):
            if request.method in SAFE_METHODS:
                return True
            return obj.user == request.user


class TripList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Trip.objects.all()
    serializer_class = TripSerializer


class TripDetail(generics.RetrieveUpdateDestroyAPIView,PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset = Trip.objects.all()
    serializer_class = TripSerializer