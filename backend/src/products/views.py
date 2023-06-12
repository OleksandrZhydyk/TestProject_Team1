import dataclasses
import datetime

from django_filters.rest_framework import DjangoFilterBackend
from django_filters.rest_framework import FilterSet, NumberFilter
from pydantic.main import BaseModel
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework import pagination
from rest_framework.permissions import AllowAny

from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from products.services import ProductService, CategoriesService
from products.convertors_to_dto import ToDTO
from products.models import Product, Size
from products.serializers import ProductSerializer, ProductsSerializer, CategorySerializer


class ProductFilter(FilterSet):
    min_price = NumberFilter(field_name="price", lookup_expr="gte")
    max_price = NumberFilter(field_name="price", lookup_expr="lte")

    class Meta:
        model = Product
        fields = ["season", "sex_and_age", "category"]


class ProductPagination(pagination.PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 9


class ProductsList(APIView):

    permission_classes = [AllowAny]
    def get(self, request):
        products = ProductService(ToDTO).get_products()
        data = ProductsSerializer(products, many=True).data
        return Response(data)

class ProductPydantic(BaseModel):
# @dataclasses.dataclass
# class ProductPydantic:
    id: int
    name: str
    price: float
    description: str
    created_at: datetime.datetime
    updated_at: datetime.datetime
    slug: str
    sex_and_age: str
    season: str

    class Config:
        orm_mode = True
class ProductPyView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        product = Product.objects.get(slug=slug)
        print(product)
        # product = ProductPydantic(product)
        product = ProductPydantic(
            id=product.id,
            name="a",
            price=24,
            description=product.description,
            created_at=product.created_at,
            updated_at=12,
            slug=product.slug,
            sex_and_age=product.sex_and_age,
            season=product.season
        )
        print(product)
        # product = ProductService(ToDTO).get_product(slug)
        data = ProductSerializer(product).data
        return Response(data)

class ProductView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        product = ProductService(ToDTO).get_product(slug)
        data = ProductSerializer(product).data
        return Response(data)


class CategoryList(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        categories = CategoriesService(ToDTO).get_categories()
        data = CategorySerializer(categories, many=True).data
        return Response(data)


# class CategoryList(ListAPIView):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     permission_classes = [AllowAny]


class AvailableChoices(APIView):
    def get(self, request):
        sex_and_age_choice_dict = dict(Product.SEX_AND_AGE)
        season_choice_dict = dict(Product.SEASONS)

        # For PostgreSQL
        # sizes = Size.objects.distinct('size')

        # For SQLite3
        sizes_query_set = Size.objects.values('size').distinct()
        sizes = {size['size']: size['size'] for size in sizes_query_set}
        choices = {
            "sex_and_age": sex_and_age_choice_dict,
            "season": season_choice_dict,
            "size": sizes
        }
        return Response(choices, status=HTTP_200_OK)
