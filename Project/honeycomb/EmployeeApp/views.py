from django.shortcuts import render

from .models import Idea

def ideas_overview(request):
    all_ideas = Idea.objects.all()
    context = {
        "all_ideas": all_ideas
    }
    return render(request, 'ideas.html', context)