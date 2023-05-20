from django.core.validators import MinValueValidator
from django.db import models
from django.contrib.auth.models import User

from products.models import Product


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="orders")
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    ordered_at = models.DateTimeField(blank=True, null=True)
    is_ordered = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.pk} - {self.user} - {self.created_at}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField()
    price = models.FloatField(validators=[
        MinValueValidator(limit_value=0.01, message="Price has to be greater then 0.01.")
    ])
    color = models.CharField(max_length=25)

    def __str__(self):
        return f"{self.order.pk} - {self.product.name}"
