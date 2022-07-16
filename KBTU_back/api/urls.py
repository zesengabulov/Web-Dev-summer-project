from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token

from api.views import CategoryView, ProductView, ProductByCategoryView, ProductDetailView, cart_list, favorite_list

urlpatterns = [
    path('login/', obtain_jwt_token),
    path('categories/', CategoryView.as_view()),
    path('products/', ProductView.as_view()),
    path('categories/<int:pk>/products/', ProductByCategoryView.as_view()),
    path('products/<int:pk>/', ProductDetailView.as_view()),
    path('cart/', cart_list),
    path('cart/<int:pk>', cart_list),
    path('favorite/', favorite_list),
    path('favorite/<int:pk>', favorite_list)
]