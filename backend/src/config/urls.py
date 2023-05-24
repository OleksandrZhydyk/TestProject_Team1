from django.contrib import admin
from django.urls import path, include
from dump_data.views import fill_database
from django.conf import settings

from orders.views import OrderListAPIView
from orders.views import CreateOrderAPIView


api_urlpatterns = [
    path('', include('accounts.urls'), name='auth'),
    path('product/', include('products.urls'), name="product"),
    path('orders/', OrderListAPIView.as_view(), name="orders"),
    path('makeorder/', CreateOrderAPIView.as_view(), name="create_order")
]

urlpatterns = [
    path("api/v1/", include(api_urlpatterns)),
    path("admin/", admin.site.urls),
    path('fill-database/<int:prod_qty>', fill_database, name='fill_database'),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls)), ]
