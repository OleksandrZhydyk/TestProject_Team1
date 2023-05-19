from rest_framework.permissions import BasePermission


class IsUnauthenticated(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
            return True
        return False


class IsOwnerOrStaff(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True

        return obj == request.user
