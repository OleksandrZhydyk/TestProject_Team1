from typing import Iterable, Optional, List
from rest_framework import serializers

from products.DTOs import ProductEntity, ProductsEntity, CategoriesEntity
from products.models import Category, Product
from itertools import repeat


class ProductService:
    @staticmethod
    def _orm_to_entity(product_orm, dataclass) -> ProductEntity:
        obj_for_dataclass = {}
        for name in dataclass.__annotations__:
            if getattr(product_orm, name) is not None:
                obj_for_dataclass[name] = getattr(product_orm, name)
        return dataclass(**obj_for_dataclass)

    def get_product(self, product_slug):
        try:
            product = Product.objects \
                .select_related('category') \
                .prefetch_related('photos', 'sizes', 'comments') \
                .get(slug=product_slug)
            product = self._orm_to_entity(product, ProductEntity)
        except Product.DoesNotExist:
            return None
        return product

    def get_products(self):
        products = Product.objects \
            .prefetch_related('photos') \
            .select_related('category') \
            .order_by('-created_at')
        products = map(self._orm_to_entity, products, repeat(ProductsEntity))
        return products


class CategorySerializer(serializers.Serializer):

    pk = serializers.IntegerField()
    name = serializers.CharField()
    slug = serializers.SlugField()
    sub_categories = serializers.SerializerMethodField()

    @staticmethod
    def get_sub_categories(obj):
        return CategorySerializer(obj.sub_categories, many=True, read_only=True).data


class CategoriesDAO:
    @staticmethod
    def _orm_to_entity(
        category_orm: Category,
        sub_categories: List[Optional[CategoriesEntity]]
    ) -> CategoriesEntity:

        return CategoriesEntity(
            pk=category_orm.pk,
            name=category_orm.name,
            slug=category_orm.slug,
            sub_categories=sub_categories
        )

    def _get_sub_categories(self, q_set_categories):
        subs = []
        for category in q_set_categories:
            category = Category.objects.get(pk=category.pk)
            q_set_sub_categories = Category.objects.filter(parent=category)
            if q_set_sub_categories:
                sub_categories = self._get_sub_categories(q_set_sub_categories)
                subs.append(
                    self._orm_to_entity(
                        category_orm=category,
                        sub_categories=sub_categories
                    )
                )
            else:
                subs.append(
                    self._orm_to_entity(
                        category_orm=category,
                        sub_categories=[]
                    )
                )
        return subs

    def fetch_all(self) -> Iterable[CategoriesEntity]:
        q_set_categories = Category.objects.filter(parent__isnull=True)
        return self._get_sub_categories(q_set_categories)
