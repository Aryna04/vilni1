from rest_framework import serializers
from EmployeeApp.models import Idea,Person,Idea_Deleted

class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Idea 
        fields=('id','title', 'description', 'create_date', 'photo', 'owner', 'status', 
    'number_of_likes')

class IdeaDeletedSerializer(serializers.ModelSerializer):
    class Meta:
        model=Idea_Deleted 
        fields=('id','title', 'description', 'create_date', 'photo', 'owner', 'status', 
    'number_of_likes')



class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model=Person 
        fields=('EmployeeId','EmployeeName','Department','DateOfJoining','PhotoFileName')