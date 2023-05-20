from django.contrib import admin
from django.urls import path, include

api_urlpatterns = [
    path('', include('accounts.urls'), name='auth'),
    path('product/', include('products.urls'), name="product")
]

urlpatterns = [
    path("api/v1/", include(api_urlpatterns)),
    path("admin/", admin.site.urls)
]
