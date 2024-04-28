from django.urls import path
from .views import TripList, TripDetail

app_name = 'trip_api'

urlpatterns = [
    path('<int:pk>/', TripDetail.as_view(), name='detailcreate'),
    path('',TripList.as_view(), name='listcreate'),    
]