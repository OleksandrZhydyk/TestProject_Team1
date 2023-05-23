from django.shortcuts import render
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from products.models import Product, Size
from .models import Order, OrderItem


class CreateOrderAPIView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        ordered_items = []
        insufficient_stock_items = []

        for item in request.data:
            product = get_object_or_404(Product, slug=item["slug"])
            size = get_object_or_404(
                Size, product=product, size=item["size"], color=item["color"])

            if item["quantity"] <= size.stock_quantity:
                order_item = {
                    "name": product.name,
                    "color": item["color"],
                    "size": item["size"],
                    "sex_and_age": product.sex_and_age,
                    "season": product.season,
                    "description": product.description,
                    "price": float(item["price"]),
                    "quantity": item["quantity"],
                    "category": product.category
                }
                ordered_items.append(order_item)
            else:
                insufficient_stock_items.append({
                    "id": item["id"],
                    "slug": item["slug"],
                    "quantity": item["quantity"],
                    "color": item["color"],
                    "size": item["size"]
                })

        if insufficient_stock_items:
            return Response(
                {
                    "message": "The following items have insufficient stock",
                    "items": insufficient_stock_items
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order = Order.objects.create(user=request.user)
        OrderItem.objects.bulk_create(
            [OrderItem(**item, order=order) for item in ordered_items])
        return Response({"message": "Successfully ordered"})
