from django.urls import path

from . import views

from .views import PhoneListView

urlpatterns = [
    path('', views.index, name='index'),
    path('api/', PhoneListView.as_view()),
]