from django.urls import path
from django.conf.urls import url

from . import views

from .views import ItemListView,ItemDetailView, ItemSearchView,generateData,ItemAddView,ItemUpdateView

urlpatterns = [
    path('', views.index, name='index'),
    path('api/', ItemListView.as_view()),
    path('api/add/', ItemAddView.as_view()),
    path('api/update/<id>/', ItemUpdateView.as_view()),
    path('api/search/', ItemSearchView.as_view()),
    path('api/<id>/', ItemDetailView.as_view()),
    path('random/', generateData.as_view()),
]