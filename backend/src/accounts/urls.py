from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import UserRegistrationAPIView, UserAPIView, fake_users_view
from .serializers import CustomTokenObtainPairSerializer


urlpatterns = [
    path("user/<int:pk>/", UserAPIView.as_view()),
    path("auth/register/", UserRegistrationAPIView.as_view()),
    path("auth/login/", TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer)),
    path("auth/refresh/", TokenRefreshView.as_view()),
    path("user/generate/<int:num_users>/", fake_users_view, name='fake-users'),
]
