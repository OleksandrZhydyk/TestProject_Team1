from django.contrib import admin

from . models import Category, Product, Size, Photo


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "parent")
    prepopulated_fields = {"slug": ("name",)}


class PhotoProductInline(admin.StackedInline):
    model = Photo


class SizeProductInline(admin.StackedInline):
    model = Size


class ProductAdmin(admin.ModelAdmin):
    inlines = [PhotoProductInline, SizeProductInline]
    list_display = ("name", "price", "description", "created_at", "updated_at", "category")
    prepopulated_fields = {"slug": ("name",)}


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Size)
admin.site.register(Photo)
