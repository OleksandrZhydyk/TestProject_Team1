import os

from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.contenttypes.fields import GenericRelation

from accounts.models import Comment

class Product(models.Model):
    name = models.CharField(max_length=128)
    price = models.FloatField(
        validators=[
            MinValueValidator(
                limit_value=0.01, message="Price has to be greater then 0.01."
            )
        ]
    )
    description = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(
        "Category", related_name="products", null=True, blank=True, on_delete=models.SET_NULL
    )
    comments = GenericRelation(Comment)

    def __str__(self):
        return self.name


class Size(models.Model):
    size = models.CharField(max_length=5)
    product = models.ForeignKey('Product', related_name="sizes", null=True, blank=True, on_delete=models.CASCADE)
    stock_quantity = models.PositiveIntegerField(default=1, blank=True, null=True)

    def __str__(self):
        return f'{self.product} {self.size}'


class Photo(models.Model):

    def upload_to(self, filename):
        folders = [filename, self.product.category.name]
        category_parent = self.product.category.parent
        while category_parent:
            folders.append(category_parent.name)
            category_parent = category_parent.parent
        folders.append('product')
        path_to_saving = os.path.join(*folders[::-1])
        return path_to_saving

    name = models.CharField(max_length=128, default="No name")
    product = models.ForeignKey(
        "Product",
        related_name="photos",
        on_delete=models.CASCADE
    )
    image = models.ImageField(
        default="products/no_image.png",
        blank=True,
        upload_to=upload_to,
        verbose_name="Image"
    )

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=128)
    parent = models.ForeignKey(
        "Category", related_name="categories", null=True, blank=True, on_delete=models.CASCADE
    )
    slug = models.SlugField(unique=True)

    def get_categories(self):
        if self.parent is None:
            return self.name
        else:
            return self.parent.get_categories() + ' -> ' + self.name

    def __str__(self):
        return self.get_categories()
