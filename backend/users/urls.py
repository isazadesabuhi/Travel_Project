from django.urls import path
from .views import RegisterView, LoginView,UserView, LogoutView,UserDetailView

app_name = "users"

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', UserDetailView.as_view()),
    path('logout/', LogoutView.as_view()),
]