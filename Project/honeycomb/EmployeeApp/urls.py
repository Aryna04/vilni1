from django.urls import re_path, path
from EmployeeApp import views


urlpatterns=[
    #re_path('ideas/', views.ideas, name='id'),
    path('ideas', views.ideas_all),
    path('ideas/<id>', views.ideas),
    re_path('profiles/', views.profiles),
    re_path('likes/', views.likes),
]