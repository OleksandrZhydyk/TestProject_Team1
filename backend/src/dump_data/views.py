from django.http import HttpResponse
from .faker_data import create_fake_products, create_fake_categories, create_fake_sizes


def fill_database(request, prod_qty):
    create_fake_categories()
    create_fake_products(prod_qty)
    create_fake_sizes()
    return HttpResponse(f"Fake DB created!")
