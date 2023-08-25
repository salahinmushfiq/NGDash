from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import generics, status
from rest_framework.renderers import JSONRenderer

from .models import User, Address, Coordinates, Company, Hair, Bank, Product, CompanyAddress, CoordinatesCompany
from .serializers import UserSerializer, AddressSerializer, CompanySerializer, CoordinatesSerializer, HairSerializer, \
    BankSerializer, ProductSerializer, CompanyAddressSerializer
import json
from django.views.decorators.csrf import csrf_exempt
import io
from rest_framework.parsers import JSONParser


class UserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class HairView(generics.ListCreateAPIView):
    queryset = Hair.objects.all()
    serializer_class = HairSerializer


class AddressView(generics.ListCreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class CoordinatesView(generics.ListCreateAPIView):
    queryset = Coordinates.objects.all()
    serializer_class = CoordinatesSerializer


class BankView(generics.ListCreateAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer


class CompanyView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


def root(request):
    return HttpResponse("root")


def get_user_json_object(user_serialized_data):
    user = User(user_serialized_data)
    userId = user_serialized_data["userId"]
    hair = Hair.objects.get(userId=userId)
    hair_queryset = HairSerializer(hair, many=False)
    bank = Bank.objects.get(userId=userId)
    bank_queryset = BankSerializer(bank, many=False)
    address = Address.objects.get(userId=userId)
    address_queryset = AddressSerializer(address, many=False)
    address_obj = Address(address)
    coordinates = Coordinates.objects.get(addressId=address_obj.addressId)
    coordinates_queryset = CoordinatesSerializer(coordinates, many=False)
    company = Company.objects.get(userId=userId)
    company_queryset = CompanySerializer(company, many=False)
    company_obj = Company(company)
    company_address = CompanyAddress.objects.get(companyId=company_obj.companyId)
    company_address_queryset = CompanyAddressSerializer(company_address, many=False)
    company_address_obj = CompanyAddress(company_address)
    coordinates_company = CoordinatesCompany.objects.get(addressId=company_address_obj.companyAddressId)
    coordinates_company_queryset = CoordinatesSerializer(coordinates_company, many=False)
    user_queryset_data = user_serialized_data
    hair_queryset_data = hair_queryset.data
    bank_queryset_data = bank_queryset.data
    coordinates_company_queryset_data = coordinates_company_queryset.data
    address_queryset_data = address_queryset.data
    coordinates_queryset_data = coordinates_queryset.data
    company_queryset_data = company_queryset.data
    company_address_queryset_data = company_address_queryset.data

    company_address_json_object = {"address": company_address_queryset_data}
    company_address_json_object = {
        'address': {
            **company_address_json_object['address'], **{"coordinates": coordinates_company_queryset_data}
        }
    }

    company_json_obj = {"company": company_queryset_data}
    company_json_obj = {"company": {**company_json_obj['company'], **company_address_json_object}}

    address_json_object = {"address": address_queryset_data}
    address_json_object = {
        "address": {**address_json_object["address"], **{"coordinates": coordinates_queryset_data}}}
    user_json_object = {"user": user_queryset_data}
    user_json_object = {**user_json_object['user'], **{"hair": hair_queryset_data}, **address_json_object,
                        **company_json_obj, "bank": bank_queryset_data}

    return user_json_object


@csrf_exempt
def getUsers(request):
    print("getUsers")
    userId = request.GET.get('userId', '')
    print("User Id: " + userId)

    if userId != "":
        userId = userId.split("/")[0]
        userId = int(userId)

        try:
            user = User.objects.get(userId=userId)
            user_serialized = UserSerializer(user, many=False)
            user_serialized_data = user_serialized.data
            user_json_object = get_user_json_object(user_serialized_data=user_serialized_data)
            # return JsonResponse(
            #     {"user": [user_queryset_data, hair_queryset_data, bank_queryset_data, address_queryset_data,
            #               company_queryset_data, company_address_queryset_data]}, safe=False)
            return JsonResponse(user_json_object, safe=False)
        except User.DoesNotExist:
            return JsonResponse({"error": "Doesn't Exist"}, safe=False)
    else:
        print("User Id: " + userId)
        user_queryset = User.objects.all()  # iterable

        user_serialized = UserSerializer(user_queryset, many=True)
        user_list_json = []
        try:
            for user_per_query in user_queryset:
                user_serialized = UserSerializer(user_per_query, many=False)

                user_serialized_data = user_serialized.data
                user_json_object = get_user_json_object(user_serialized_data=user_serialized_data)

                print("This section: ")
                print("user_serialized_data")
                print(user_serialized_data["firstName"])
                print('user')
                print()
                # user_queryset = UserSerializer(user, many=False)

                user_list_json.append(user_json_object)

            return JsonResponse({"users": user_list_json}, safe=False)
        except TypeError as te:
            print(te)

        return JsonResponse({"users": user_serialized.data}, safe=False)


@csrf_exempt
def createUser(request):
    if request.method == "POST":
        data = json.loads(request.body)

        user_serializer = UserSerializer(data=data)
        user_serializer = user_serializer.create(data)

        if user_serializer.is_valid():
            return JsonResponse({"user": user_serializer.data}, safe=False)
        else:
            return JsonResponse({"error": user_serializer.data}, safe=False)


@csrf_exempt
def createUsers(request):
    if request.method == "POST":
        user_list_json = []
        json_data = request.body
        stream = io.BytesIO(json_data)
        jsonArrayToPythonArrayObject = JSONParser().parse(stream)
        # in below line convert python data to complex data type :- de-serialization
        print("DATA...........................")
        # print(pythondata)

        some_object_iterator = iter(jsonArrayToPythonArrayObject)
        for data_object in some_object_iterator:
            print(data_object)
            print(type(data_object))
            user_serializer = UserSerializer()
            user_serializer.create(data_object)

        return JsonResponse({"users": "successful"}, safe=False)

    return JsonResponse({"error": "not POST"}, safe=False)


# def root(request):
#     return render(request,)
def home(request):
    return HttpResponse("home")


@csrf_exempt
def createProduct(request):
    if request.method == "POST":
        data = json.loads(request.body)

        product_serializer = ProductSerializer(data=data)
        product_serializer = product_serializer.create(data)

        if product_serializer.is_valid():
            return JsonResponse({"product": product_serializer.data}, safe=False)
        else:
            return JsonResponse({"error": product_serializer.data}, safe=False)


@csrf_exempt
def getProducts(request):
    print("getProducts")
    productId = request.GET.get('id', '')
    print("Product Id: " + productId)
    if productId != "":
        productId = productId.split("/")[0]
        productId = int(productId)

        try:
            product = Product.objects.get(pk=productId)
            product_queryset = ProductSerializer(product, many=False)
            return JsonResponse({"Products": product_queryset.data}, safe=False)
        except Product.DoesNotExist:
            return JsonResponse({"Products": "Doesn't Exist"}, safe=False)
    else:
        print("Product Id: " + productId)
        product_queryset = Product.objects.all()
        product_queryset = ProductSerializer(product_queryset, many=True)
        return JsonResponse({"Products": product_queryset.data}, safe=False)


@csrf_exempt
def getAddresses(request):
    address_queryset = Address.objects.all()
    address_queryset = AddressSerializer(address_queryset, many=True)
    return JsonResponse({"Address": address_queryset.data}, safe=False)


@csrf_exempt
def getCoordinates(request):
    coordinates_queryset = Address.objects.all()
    coordinates_queryset = CoordinatesSerializer(coordinates_queryset, many=True)
    return JsonResponse({"Coordinates": coordinates_queryset.data}, safe=False)
