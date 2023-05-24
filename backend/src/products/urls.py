from django.urls import path

from products.views import ProductView, CategoryList, AvailableChoices, ProductsList


urlpatterns = [
    path('', ProductsList.as_view()),
    path('category/', CategoryList.as_view()),
    path('choices/', AvailableChoices.as_view()),
    path('<str:slug>/', ProductView.as_view())
]
