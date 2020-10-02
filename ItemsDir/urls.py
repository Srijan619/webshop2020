from django.urls import path

from . import views

from .views import ItemListView

urlpatterns = [
    path('', views.index, name='index'),
    path('api/', ItemListView.as_view()),
]