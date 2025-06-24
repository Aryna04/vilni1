from django.shortcuts import render

from .models import Idea

def ideas_overview(request):
    all_ideas = Idea.objects.all()
    context = {
        "all_ideas": all_ideas
    }
    return render(request, 'ideas.html', context)


def add_ideas(request):
    #TODO: add logic for create/add new ideas and return in succsess
    add_ideas = "mock"
    context = {
        "add_ideas": add_ideas
    }
    return render(request, 'add_ideas.html', context)

def like_ideas(request):
    idea_id = request.id
    uid = request.user_id
    #TODO: if I with my email not liked this idea - i could do that. If i already liked i do nothing
    all_ideas = Idea.objects.all()
    context = {
        "all_ideas": all_ideas
    }
    return render(request, 'ideas.html', context)