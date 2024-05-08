from django.contrib import admin
from django.urls import include, path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include("trip.urls")),
    path('api/',include('trip_api.urls',namespace='trip_api')),
    # working on that
    path('api/user/',include('users.urls', namespace='users')),
    # 
    path('api-auth/',include('rest_framework.urls',namespace='rest_framework')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]