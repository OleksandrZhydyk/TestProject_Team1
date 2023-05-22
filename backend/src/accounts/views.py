from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response

from .serializers import UserSerializer
from .permissions import IsUnauthenticated, IsOwnerOrStaff

from django.http import HttpResponse
from dump_data.faker_data import create_fake_users


class UserRegistrationAPIView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsUnauthenticated,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Successfully registered"})


class UserAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsOwnerOrStaff,)
    serializer_class = UserSerializer


def fake_users_view(request, num_users):
    create_fake_users(num_users)
    return HttpResponse(f"Fake users created: {num_users}!")
