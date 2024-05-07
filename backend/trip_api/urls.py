from django.urls import path
from .views import TripList,TripDetail,UserTripList,TripListDetailfilter, CreateTrip

app_name = 'trip_api'

urlpatterns = [
    path('trips/', TripList.as_view(), name='listtrip'),
    path('trip/<str:pk>/', TripDetail.as_view(), name='detailtrip'),
    path('mytrips/<str:username>/', UserTripList.as_view(), name='detailtripuser'),
    path('search/trips/', TripListDetailfilter.as_view(), name='triplistdetailfilter'),
    #
    path('admin/create/', CreateTrip.as_view(), name='createtrip'),
]