from django_filters.rest_framework import DjangoFilterBackend
from django_filters.rest_framework import FilterSet, NumberFilter
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework import pagination
from rest_framework.permissions import AllowAny
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from products.models import Product, Category, Size
from products.serializers import ProductSerializer, CategorySerializer, ProductsSerializer


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


class ProductsList(ListAPIView):

    serializer_class = ProductsSerializer
    pagination_class = ProductPagination
    permission_classes = [AllowAny]
    queryset = Product.objects \
        .prefetch_related('photos') \
        .select_related('category') \
        .order_by('-created_at')
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = ProductFilter
    search_fields = ['name']


class ProductView(RetrieveAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    queryset = Product.objects \
        .prefetch_related('photos', 'sizes', 'comments') \
        .select_related('category') \
        .order_by('-created_at')


class CategoryList(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


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
