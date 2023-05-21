from django.core.validators import MinValueValidator
from django.db import models
from django.contrib.auth.models import User

from products.models import Category


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="orders")
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    ordered_at = models.DateTimeField(blank=True, null=True)
    is_ordered = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.pk} - {self.user} - {self.created_at}"


class OrderItem(models.Model):
    SEX_AND_AGE = [
        ("Чоловіки", "Чоловіки"),
        ("Жінки", "Жінки"),
        ("Хлопчики", "Хлопчики"),
        ("Дівчатка", "Дівчатка")
    ]

    SEASONS = [
        ("Осінь/Зима", "Осінь/Зима"),
        ("Весна/Літо", "Весна/Літо")
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    name = models.CharField(max_length=128)
    color = models.CharField(max_length=25, default="Білий")
    size = models.CharField(max_length=5)
    sex_and_age = models.CharField(max_length=15, choices=SEX_AND_AGE, default="Жінки")
    season = models.CharField(max_length=15, choices=SEASONS, default="Весна/Літо")
    description = models.TextField(max_length=1000)
    price = models.FloatField(validators=[
        MinValueValidator(limit_value=0.01, message="Price has to be greater then 0.01.")
    ])
    quantity = models.PositiveSmallIntegerField()
    category = models.ForeignKey(
        Category, null=True, blank=True, on_delete=models.SET_NULL
    )

    def __str__(self):
        return f"{self.order.pk} - {self.name}"