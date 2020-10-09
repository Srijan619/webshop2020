from django.urls import path
from django.conf.urls import url

from . import views

from .views import ItemListView,ItemDetailView, ItemSearchView

urlpatterns = [
    path('', views.index, name='index'),
    path('api/', ItemListView.as_view()),
    path('api/search/', ItemSearchView.as_view()),
    path('api/<id>/', ItemDetailView.as_view()),
]