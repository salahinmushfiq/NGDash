from django.contrib import admin
from .views import home, UserView, CompanyView, AddressView, HairView, BankView, CoordinatesView, \
    getProducts, getUsers, createUsers, createUser, getAddresses, createProduct
from django.urls import path, re_path
from django.views.generic import TemplateView

urlpatterns = [

    # path('', root),
    path('', TemplateView.as_view(template_name='index.html')),
    path('home/', home),
    path('userView/', UserView.as_view()),
    path('companyView/', CompanyView.as_view()),
    path('addressView/', AddressView.as_view()),
    path('coordinatesView/', CoordinatesView.as_view()),
    path('hairView/', HairView.as_view()),
    path('bankView/', BankView.as_view()),
    path('products/', getProducts),
    path('users/', getUsers),
    path('adddresses/', getAddresses),
    path('users/add/', createUser),
    path('users/add/all/', createUsers),
    path('products/add/', createProduct),
]
