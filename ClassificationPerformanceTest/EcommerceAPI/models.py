from django.db import models
from datetime import date


class User(models.Model):
    userId = models.AutoField(primary_key=True, serialize=False, unique=True)
    firstName = models.CharField(max_length=100)
    birthDate = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    university = models.CharField(max_length=100)
    userAgent = models.CharField(max_length=300)
    ein = models.CharField(max_length=100)
    ssn = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    macAddress = models.CharField(max_length=100)
    id = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    height = models.IntegerField()
    image = models.CharField(max_length=100)
    ip = models.CharField(max_length=100)
    weight = models.FloatField()
    lastName = models.CharField(max_length=100)
    bloodGroup = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    domain = models.CharField(max_length=100)
    maidenName = models.CharField(max_length=100)
    eyeColor = models.CharField(max_length=100)
    age = models.IntegerField()
    username = models.CharField(max_length=100)


class Hair(models.Model):
    hairId = models.AutoField(primary_key=True)
    color = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    userId = models.OneToOneField(User, on_delete=models.CASCADE)


class Bank(models.Model):
    bankId = models.AutoField(primary_key=True)
    currency = models.CharField(max_length=100)
    cardType = models.CharField(max_length=100)
    cardNumber = models.CharField(max_length=100)
    cardExpire = models.CharField(max_length=100)
    iban = models.CharField(max_length=100)
    userId = models.OneToOneField(User, on_delete=models.CASCADE)


class Company(models.Model):
    companyId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    userId = models.OneToOneField(User, on_delete=models.CASCADE)


class Address(models.Model):
    addressId = models.AutoField(primary_key=True)
    address = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    postalCode = models.CharField(max_length=100)
    userId = models.OneToOneField(User, on_delete=models.CASCADE)


class CompanyAddress(models.Model):
    companyAddressId = models.AutoField(primary_key=True)
    address = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    postalCode = models.CharField(max_length=100)
    companyId = models.OneToOneField(Company, on_delete=models.CASCADE)


class Coordinates(models.Model):
    coordinatesId = models.AutoField(primary_key=True)
    lng = models.FloatField()
    lat = models.FloatField()
    addressId = models.OneToOneField(Address, on_delete=models.CASCADE)


class CoordinatesCompany(models.Model):
    coordinatesId = models.AutoField(primary_key=True)
    lng = models.FloatField()
    lat = models.FloatField()
    addressId = models.OneToOneField(CompanyAddress, on_delete=models.CASCADE)


# Products have a name and a manufacturer
#  could be a table of suppliers.
class Product(models.Model):
    productId = models.AutoField(primary_key=True)
    discountPercentage = models.FloatField()
    thumbnail = models.CharField(max_length=100)
    images = models.CharField(max_length=100)
    price = models.IntegerField()
    rating = models.FloatField()
    description = models.CharField(max_length=100)
    id = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    stock = models.IntegerField()
    category = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.title} from {self.manufacturer}"


# Batch always belongs to exactly one product.
# It represents a set of items of one product, where all items were produced and delivered together (as a single batch).
# All items in the batch will have the same production date and expire date for example.
class Batch(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_in_batch")
    units = models.IntegerField()
    date_produced = models.DateField()
    expiry_date = models.DateField()
    total = models.IntegerField(blank=True, editable=False)

    # overwrite save method
    def save(self, *args, **kwargs):
        if not self.id:
            # if object is a new instance set total to number of units
            self.total = self.units
            super(Batch, self).save(*args, **kwargs)
        else:
            super(Batch, self).save(*args, **kwargs)

    @property
    def freshness(self):
        # returns the freshness of the food in the warehouse
        # food that is less then 3 days from expiry date is considered expiring
        if (date.today() - self.expiry_date).days > 0:
            return "expired"
        elif (self.expiry_date - date.today()).days <= 3:
            return "expiring"
        else:
            return "fresh"

    def __str__(self):
        return f"{self.id} - {self.product} - expiry {self.expiry_date}"


# Keeps track of outgoing orders
class Order(models.Model):
    order_date = models.DateField()
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name="batch_in_order")
    units = models.IntegerField()
    company = models.CharField(max_length=64)

    # overwrite save method
    def save(self, *args, **kwargs):

        if not self.id:
            # if object is a new instance and number of units ordered are less then the total number of units in the batch
            # update the total number of units in the batch and save the order
            if self.units < self.batch.total:
                self.batch.total -= self.units
                self.batch.save()
                super(Order, self).save(*args, **kwargs)
            else:
                # do not save the order
                return

    def __str__(self):
        return f"{self.order_date} - {self.units} from {self.batch}"
