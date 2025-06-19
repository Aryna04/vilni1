from django.db import models
from django.db.models.functions import Now

# Create your models here.

class Person(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=500)
    password =  models.CharField(max_length=500)
    email =  models.EmailField(max_length=500)
    school = models.CharField(max_length=500)
    schoolclass = models.CharField(max_length=500)


class Idea(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=500)
    description = models.CharField(max_length=500)
    create_date = models.DateField(db_default=Now())
    photo = models.URLField(max_length=500)
    owner_id = models.ForeignKey(Person, blank=True, null=True, on_delete=models.SET_NULL)
    status = models.CharField(max_length=500)
    number_of_likes = models.IntegerField(db_default=0)
