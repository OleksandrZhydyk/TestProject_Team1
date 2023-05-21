from django.contrib import admin
from django.urls import path, include
from products.views import fill_database

api_urlpatterns = [
    path('', include('accounts.urls'), name='auth'),
    path('product/', include('products.urls'), name="product")
]

urlpatterns = [
    path("api/v1/", include(api_urlpatterns)),
    path("admin/", admin.site.urls),
    path('fill-database/', fill_database, name='fill_database'),
]
