from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include("trip.urls")),
    path('api/',include('trip_api.urls',namespace='trip_api')),
    path('api-auth/',include('rest_framework.urls',namespace='rest_framework')),
]