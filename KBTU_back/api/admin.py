from django.contrib import admin
from api.models import Category, Product, Cart, Favorite

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'price')

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'product_id', 'user_id')

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('id', 'product_id', 'user_id')

# Register your models here.
