from django.urls import include, path
from .views import home, trip, detail, user_signup,user_login,logout_view,add_trip,edit_user_profile,user_profiles,mytrips,trip_edit

urlpatterns = [
    path("",home, name="home"),
    path("trips/",trip,name="trips"),
    path("trips/<slug:slug>/", detail, name="detail"),
    # path('mytrips/<str:username>/', mytrips, name='mytrips'),
    path('<str:username>/mytrips/', mytrips, name='mytrips'),
    path("signin/",user_login,name="user_login"),
    path("signup/",user_signup,name="user_signup"),
    path("logout/",logout_view,name="logout"),
    path("create_trip/",add_trip,name="add_trip"),
    path("trip_organizers/", user_profiles, name='user_profiles'),
    # path('<str:username>/', user_profile_detail, name='user_profile_detail'),
    path('profile/<str:username>/edit/', edit_user_profile, name='edit-profile'),
    path('trip/<slug:slug>/edit/', trip_edit, name='trip_edit'),
]
