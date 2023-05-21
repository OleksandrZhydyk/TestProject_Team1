from rest_framework import serializers

from accounts.models import Comment
from products.models import Product, Photo, Size, Category


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["name", "image"]


class SizesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ["size", "color", "stock_quantity"]


class CategorySerializer(serializers.ModelSerializer):
    sub_categories = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["name", "slug", "sub_categories"]

    @staticmethod
    def get_sub_categories(obj):
        return CategorySerializer(obj.categories, many=True, read_only=True).data


class CategoryProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ["name", "slug"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["text", "created_at"]


class ProductSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    sizes = SizesSerializer(many=True, read_only=True)
    category = CategoryProductSerializer()
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = "__all__"


class ProductsSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    category = CategoryProductSerializer()

    class Meta:
        model = Product
        fields = "__all__"
