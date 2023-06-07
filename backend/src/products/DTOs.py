# from __future__ import annotations
from dataclasses import dataclass, field
from datetime import datetime
from typing import List

from products.models import Product


@dataclass
class CategoriesEntity:
    id: int
    name: str
    slug: str
    sub_categories: List['CategoriesEntity'] = field(default_factory=list)


@dataclass
class SizeEntity:
    id: int
    size: str
    color: str
    product_id: int
    stock_quantity: int


@dataclass
class PhotoEntity:
    id: int
    name: str
    image: str
    product_id: int


@dataclass
class CategoryEntity:
    id: int
    name: str
    slug: str
    parent: int
    sub_categories: List[CategoriesEntity] = field(default_factory=list)


@dataclass
class CommentEntity:
    id: int
    text: str
    created_at: datetime
    object_id: int
    user_id: int
    content_type_id: int


@dataclass(kw_only=True)
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
    photos: List[PhotoEntity] = field(default_factory=list)


@dataclass(kw_only=True)
class ProductEntity(ProductsEntity):
    comments: List[CommentEntity] = field(default_factory=list)
    sizes: List[SizeEntity] = field(default_factory=list)



