from django.shortcuts import render
from django.http import HttpResponse
from .models import Items
from .serializers import ItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.views import View
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from django.http import  HttpResponseRedirect
from rest_framework import generics
from rest_framework.decorators import permission_classes,authentication_classes,api_view
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import filters
from faker import Faker
import random
import logging
from django.urls import reverse
from django.template import loader
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from rest_framework.pagination import (LimitOffsetPagination,PageNumberPagination)

logger = logging.getLogger(__name__) #Logging instance

# Create your views here.
viewShopMain = never_cache(TemplateView.as_view(template_name='index.html')) # Takes index from the react side

def index(request):
    item_count=Items.objects.all().count()
    user_count=User.objects.all().count()
    return render(request,"home_page.html",{"item_count":item_count,"user_count":user_count})

#This fetches all data
class ItemListView(APIView):
   
    def get(self,request):  
        queryset=Items.objects.all()
        serializer_class=ItemSerializer(queryset, many=True)
        return Response(serializer_class.data)

#This uses pagination
class ItemListViewOnSale(generics.ListAPIView):
    serializer_class= ItemSerializer
    pagination_class =PageNumberPagination
    
    def get_queryset(self):  
        queryset=Items.objects.filter(sold_status=False)
        return queryset  

      
@authentication_classes([JSONWebTokenAuthentication,]) 
@permission_classes([IsAuthenticated,])    
class ItemAddView(APIView):

    def post(self,request):
        serializer= ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Using same view to edit and update the sold status, which is not good but should work for the project
@authentication_classes([JSONWebTokenAuthentication,]) 
@permission_classes([IsAuthenticated,])   
class ItemUpdateView(APIView):
    def put(self,request,id):
        queryset=Items.objects.get(id=id)
        serializer= ItemSerializer(queryset,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItemDetailView(APIView):  
    def get(self,request,id):  
        queryset=Items.objects.get(id=id)
        serializer_class=ItemSerializer(queryset)
        return Response(serializer_class.data)

 
#Used to filter the Items
class ItemSearchView(generics.ListAPIView):
    search_fields = ['title','description']
    filter_backends = (filters.SearchFilter,)
    queryset=Items.objects.all()
    serializer_class=ItemSerializer



#Generate Random DB data 

class generateData(APIView):

    def get(self,request):
        Items.objects.all().delete()
        users=User.objects.exclude(username="admin")
        users.delete()
        fake = Faker()
        fake.unique_mode = True
        for _ in range(0,6):
            username=fake.first_name()
            email=fake.email()
            password=fake.last_name()
            user=User.objects.create_user(username=username,password=password,email=email)
            user.save()

        random_users=User.objects.all()[1:4] #Trick to ignore admin while creating items

        for user in random_users:
           for _ in range(0,10):
                title=fake.sentence(nb_words=4)
                description=fake.sentence(nb_words=10)
                price=random.randrange(1,1000)
                posted_by=user.username
                queryset=Items.objects.create(title=title,description=description,price=price,posted_by=posted_by)
                serializer= ItemSerializer(data=queryset)
                if serializer.is_valid():
                 serializer.save()
        return HttpResponseRedirect(reverse("viewShopMain"))

     

            