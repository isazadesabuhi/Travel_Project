from django.urls import path
from .views import TripList,TripDetail,UserTripList,TripListDetailfilter, CreateTrip, CategoryList,TypeList,AccommodationTypeList

app_name = 'trip_api'

urlpatterns = [
    path('trips/', TripList.as_view(), name='listtrip'),
    path('trip/<str:pk>/', TripDetail.as_view(), name='detailtrip'),
    path('mytrips/<str:username>/', UserTripList.as_view(), name='detailtripuser'),
    path('search/trips/', TripListDetailfilter.as_view(), name='triplistdetailfilter'),
    path('create/trip/', CreateTrip.as_view(), name='createtrip'),
    path('category/trip/', CategoryList.as_view(), name='categorylist'),
    path('type/trip/', TypeList.as_view(), name='typelist'),
    path('type/accommodation/', AccommodationTypeList.as_view(), name='accommodation_type_list'),
]