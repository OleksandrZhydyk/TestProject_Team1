from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional

from django.contrib.contenttypes.models import ContentType

from products.models import Product


@dataclass
class CategoriesEntity:
    pk: int
    name: str
    slug: str
    sub_categories: List[Optional['CategoriesEntity']]


@dataclass
class SizeEntity:
    size: str
    color: str
    product_id: int
    stock_quantity: int


@dataclass
class PhotoEntity:
    name: str
    image: str
    product_id: int


@dataclass
class CategoryEntity:
    id: int
    name: str
    slug: str


@dataclass
class ProductEntity:
    id: int
    name: str
    price: float
    description: str
    created_at: datetime
    updated_at: datetime
    slug: str
    category: CategoryEntity
    sex_and_age: Product.SEX_AND_AGE
    season: Product.SEASONS
    photos: List[Optional[PhotoEntity]]
    sizes: List[Optional[SizeEntity]]
    comments: List[ContentType]



@dataclass
class ProductsEntity:
    id: int
    name: str
    price: float
    description: str
    created_at: datetime
    updated_at: datetime
    slug: str
    category: CategoryEntity
    sex_and_age: Product.SEX_AND_AGE
    season: Product.SEASONS
    photos: List[Optional[PhotoEntity]]
