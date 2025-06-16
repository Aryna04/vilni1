from django.db import models



class People(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=500)
    password =  models.CharField(max_length=500)
    email =  models.EmailField(max_length=500)
    school = models.CharField(max_length=500)
    schoolclass = models.CharField(max_length=500)







class ideas(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=500)
    description = models.CharField(max_length=500)
    DateOfIdea = models.DateField()
    Photo = models.URLField(max_length=500)
    OwnerID = models.BigIntegerField()
    Status = models.CharField(max_length=500)
    numberOfLikes = models.IntegerField()


