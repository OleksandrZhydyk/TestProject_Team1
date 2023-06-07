from rest_framework import serializers

from accounts.models import Comment
from products.models import Product, Photo, Size, Category


class PhotoSerializer(serializers.Serializer):
    name = serializers.CharField()
    image = serializers.CharField()


# class PhotoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Photo
#         fields = ["name", "image"]


class SizesSerializer(serializers.Serializer):
    size = serializers.CharField()
    color = serializers.CharField()
    stock_quantity = serializers.IntegerField()


# class SizesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Size
#         fields = ["size", "color", "stock_quantity"]


# class CategorySerializer(serializers.ModelSerializer):
#     sub_categories = serializers.SerializerMethodField()
#
#     class Meta:
#         model = Category
#         fields = ["name", "slug", "sub_categories"]
#
#     @staticmethod
#     def get_sub_categories(obj):
#         return CategorySerializer(obj.categories, many=True, read_only=True).data

class CategorySerializer(serializers.Serializer):

    id = serializers.IntegerField()
    name = serializers.CharField()
    slug = serializers.SlugField()
    sub_categories = serializers.SerializerMethodField()

    @staticmethod
    def get_sub_categories(obj):
        return CategorySerializer(getattr(obj, 'sub_categories'), many=True, read_only=True).data


# class CategoryProductSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Category
#         fields = ["id", "name", "slug"]

class CategoryProductSerializer(serializers.Serializer):
    name = serializers.CharField()
    slug = serializers.SlugField()


class CommentSerializer(serializers.Serializer):
    text = serializers.CharField()
    created_at = serializers.DateTimeField()


# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = ["text", "created_at"]


class ProductSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    sizes = SizesSerializer(many=True, read_only=True)
    category = CategoryProductSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = "__all__"


class ProductsSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    category = CategoryProductSerializer(read_only=True)
    # category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"
