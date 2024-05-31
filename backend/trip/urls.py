from django.urls import include, path
from .views import home, trip, detail, user_signup,user_login,logout_view,add_trip,mytrips,trip_edit

urlpatterns = [
    path("",home, name="home"),
    path("trips/",trip,name="trips"),
    path("trips/<slug:slug>/", detail, name="detail"),
    path('<str:username>/mytrips/', mytrips, name='mytrips'),
    path("signin/",user_login,name="user_login"),
    path("signup/",user_signup,name="user_signup"),
    path("logout/",logout_view,name="logout"),
    path('trip/<slug:slug>/edit/', trip_edit, name='trip_edit'),
]
