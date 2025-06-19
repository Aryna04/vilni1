from django.urls import re_path
from EmployeeApp import views



urlpatterns=[
    re_path('ideas/', views.ideas_overview),
]