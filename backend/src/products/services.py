from typing import Iterable


from products.DTOs import ProductEntity, ProductsEntity, CategoriesEntity
from products.convertors_to_dto import FromOrmToDTO
from products.models import Category, Product
from itertools import repeat


class ProductService:
    def __init__(self, converter):
        self.converter = converter

    def get_product(self, product_slug):
        try:
            product = Product.objects \
                .select_related('category') \
                .prefetch_related('photos', 'sizes', 'comments') \
                .get(slug=product_slug)
            product = self.converter(FromOrmToDTO).convert_to_dto(product, ProductEntity)
        except Product.DoesNotExist:
            return None
        return product

    def get_products(self):
        products = Product.objects \
            .select_related('category') \
            .prefetch_related('photos') \
            .order_by('-created_at')

        products = map(self.converter(FromOrmToDTO).convert_to_dto, products, repeat(ProductsEntity))
        return products


class CategoriesService:
    def __init__(self, converter):
        self.converter = converter

    def get_categories(self) -> Iterable[CategoriesEntity]:
        q_set_categories = Category.objects.filter(parent__isnull=True)
        return map(self.converter(FromOrmToDTO).convert_to_dto, q_set_categories, repeat(CategoriesEntity))

