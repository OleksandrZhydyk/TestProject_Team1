from django.contrib.auth.models import User

from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

from .serializers import UserSerializer
from .permissions import IsOwnerOrStaff


class UserRegistrationAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = {"refresh": str(token), "access": str(token.access_token)}
        return Response(data)


class UserAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsOwnerOrStaff,)
    serializer_class = UserSerializer
