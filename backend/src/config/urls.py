from django.contrib import admin
from django.urls import path, include

from config import settings

api_urlpatterns = [
    path('', include('accounts.urls'), name='auth'),
    path('product/', include('products.urls'), name="product")
]

urlpatterns = [
    path("api/v1/", include(api_urlpatterns)),
    path("admin/", admin.site.urls)
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls)), ]
