from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import UserRegistrationAPIView, UserAPIView


urlpatterns = [
    path("user/<int:pk>/", UserAPIView.as_view()),
    path("auth/register/", UserRegistrationAPIView.as_view()),
    path("auth/login/", TokenObtainPairView.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view())
]
