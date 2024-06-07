from django.urls import path
from .views import RegisterView, LoginView, LogoutView,UserDetailView, UserRetrieveUpdateView, PasswordUpdateView, list_countries

app_name = "users"

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', UserDetailView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('update/', UserRetrieveUpdateView.as_view(), name='user-retrieve-update'),
    path('update-password/', PasswordUpdateView.as_view(), name='update-password'),
    path('countries/', list_countries, name='list-countries'),
]