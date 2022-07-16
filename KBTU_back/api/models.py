from django.db import models
from django.contrib.auth.models import User


class UserManager(models.Manager):
    def filter_by_user(self, user):
        return self.filter (user=user)


class Category(models.Model):
    name = models.CharField(max_length=30, default='category')

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


# class Subcategory(models.Model):
#     name = models.CharField(max_length=30)
#     category = models.ForeignKey(Category, on_delete=models.SET_NULL)


class Product(models.Model):
    name = models.CharField(max_length=30, default='company')
    description = models.CharField(max_length=30, default='', blank=True)
    image = models.CharField(max_length=75)
    price = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, default=1)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image': self.image,
            'price': self.price
        }


class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, default=1)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, default=1)


class Favorite(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, default=1)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, default=1)


