from django.urls import re_path
from EmployeeApp import views



urlpatterns=[
    re_path('ideas/', views.ideas_overview),
    re_path('ideas/add', views.add_ideas),
    re_path('ideas/like', views.like_ideas),
]