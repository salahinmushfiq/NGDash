from django.http import JsonResponse
from rest_framework import serializers
from .models import*

class HairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hair
        fields = ['hairId',
                  'color',
                  'type',
                  'userId']


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class CoordinatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinates
        fields = ['coordinatesId',
                  'lng',
                  'lat',
                  'addressId']


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['companyId',
                  'name',
                  'department',
                  'title',
                  'userId']


class CompanyAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyAddress
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        hair_validated = validated_data.pop('hair')
        address_validated = validated_data.pop('address')
        company_validated = validated_data.pop('company')
        companyAddressValidated = company_validated.pop('address')
        address_coordinates = address_validated.pop("coordinates")
        company_address_coordinates = companyAddressValidated.pop("coordinates")
        bank_validated = validated_data.pop('bank')

        user = User.objects.create(**validated_data)
        address = Address.objects.create(userId=user, **address_validated)
        company = Company.objects.create(userId=user, **company_validated)
        company_address = CompanyAddress.objects.create(companyId=company, **companyAddressValidated)
        hair = Hair.objects.create(userId=user, **hair_validated)
        coordinate = Coordinates.objects.create(addressId=address, **address_coordinates)
        company_address_coordinates = CoordinatesCompany.objects.create(addressId=company_address,
                                                                        **company_address_coordinates)
        bank = Bank.objects.create(userId=user, **bank_validated)

        return UserSerializer(data=validated_data)

    def create_all(self, validated_data_list):
        validated_data_list_check=[]
        for validated_data in validated_data_list:
            hairValidated = validated_data.pop('hair')
            addressValidated = validated_data.pop('address')
            companyValidated = validated_data.pop('company')
            companyAddressValidated = companyValidated.pop('address')
            addressCoordinates = addressValidated.pop("coordinates")
            companyAddressCoordinates = companyAddressValidated.pop("coordinates")
            bankValidated = validated_data.pop('bank')

            user = User.objects.create(**validated_data)
            hair = Hair.objects.create(userId=user, **hairValidated)
            address = Address.objects.create(userId=user, **addressValidated)
            company = Company.objects.create(userId=user, **companyValidated)
            companyAddress = CompanyAddress.objects.create(companyId=company, **companyAddressValidated)
            coordinate = Coordinates.objects.create(addressId=address, **addressCoordinates)
            companyAddressCoordinate = CoordinatesCompany.objects.create(addressId=companyAddress,
                                                                         **companyAddressCoordinates)
            bank = Bank.objects.create(userId=user, **bankValidated)
            validated_data_list_check.append(validated_data)
        return UserSerializer(data=validated_data_list_check)

    def view(self, request):

        if request.method == "GET":
            user_serialized_list = []
            for user in User.objects.all():
                print(user.userId)
                # addressObject = Address.objects.filter(userId=userObject.user.id)
                hair = Hair.objects.only().get(userId=user.userId)
                company = Company.objects.only().get(userId=user.userId)
                address = Address.objects.filter(userId=user.userId)
                bank = Bank.objects.only().get(userId=user)
                user.hair = hair
                company_address = CompanyAddress.objects.filter(companyId=company)
                user.hair = hair
                user.address = Address(address)
                user.bank = Bank(bank)
                user_serialized = UserSerializer(user)
                user_serialized_list.append(user_serialized.data)

            return JsonResponse({"users": user_serialized_list}, safe=False)


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


## is_valid method

class BatchSerializer(serializers.ModelSerializer):
    batch_in_order = OrderSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = Batch
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    product_in_batch = BatchSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):

        product = Product.objects.create(**validated_data)
        return UserSerializer(data=validated_data)
