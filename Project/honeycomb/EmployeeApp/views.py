from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from rest_framework.parsers import JSONParser
from EmployeeApp.serializes import IdeaSerializer, IdeaDeletedSerializer
from django.http import JsonResponse
from datetime import datetime as dt



from .models import Idea, Person, Idea_Deleted

@csrf_exempt
def ideas_all(request):
    all_ideas = Idea.objects.filter(~Q(status = 'DELETE')).values()
    context = {            
        "all_ideas": all_ideas
    }
    return render(request, 'ideas.html', context)


@csrf_exempt
def ideas(request, id = -1):

    if request.method=='GET':
        idea = Idea.objects.get(id=id)
        all_ideas = list()
        all_ideas.append(idea)
        context = {
            "all_ideas": all_ideas
        }

    if request.method=='POST':
        idea_data=JSONParser().parse(request)
        owner = Person.objects.get(id=1)
        
        Idea.objects.create(
                title=idea_data['title'] or '',
                description=idea_data['description']or '',
                create_date=dt.now(),
                #photo=idea.photo,
                owner=owner,
                status='NEW',
                number_of_likes=0

            )
    
        idea_serializer=IdeaSerializer(data=idea_data)
        
        if idea_serializer.is_valid():
            idea_serializer.create()
        else:
            print("errorsss")
            print(idea_serializer.error_messages)
            context = {
                "ERROR"+ str(idea_data)
            } 
            return redirect("/ideas")


    if request.method=='PUT':
        idea = Idea.objects.get(id=id)
        idea_data=JSONParser().parse(request)
        idea.title = idea_data['title']
        idea.description = idea_data['description']
        idea.save()
        return redirect("/ideas")

    if request.method=='DELETE':
        idea = Idea.objects.get(id=id)

        Idea_Deleted.objects.create(
                title=idea.title or '',
                description=idea.description or '',
                create_date=dt.now(),
                photo=idea.photo,
                owner=idea.owner,
                status=idea.status or '',
                number_of_likes=idea.number_of_likes or 0

            )
        
        idea.delete()
    return redirect("/ideas")
        
    if request.method=='PATCH':
        # We would like to change something in your idea
        context = {
            "test_message": "We would like to change something in your idea. It is good"
        } 


    return render(request, 'ideas.html', context)



def likes(request, id = -1):
    idea_id = request.id
    uid = request.user_id
    #TODO: if I with my email not liked this idea - i could do that. If i already liked i do nothing
    all_ideas = Idea.objects.all()
    context = {
        "all_ideas": all_ideas
    }
    return render(request, 'ideas.html', context)

def profiles(request, id = 1):
    profile = Person.objects.get(id)
    
    context = {
        "all_ideas": profile
    }
    return render(request, 'profiles.html', context)














































































































































































































































































































































































































