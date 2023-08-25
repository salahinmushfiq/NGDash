from django.db import models


class Data(models.Model):
    data_id = models.AutoField(primary_key=True)
    quantity = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    invoice_no = models.CharField(max_length=100)
    shopping_mall = models.CharField(max_length=100)
    customer_id = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    age = models.IntegerField()
    payment_method = models.CharField(max_length=100)
    invoice_date = models.CharField(max_length=100)