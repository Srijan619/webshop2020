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
from rest_framework import generics
from rest_framework.decorators import permission_classes,authentication_classes,api_view
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import filters
from faker import Faker
import random
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from rest_framework.pagination import (LimitOffsetPagination,PageNumberPagination)

# Create your views here.
index = never_cache(TemplateView.as_view(template_name='index.html')) # Takes index from the react side


# class ItemListView(APIView):
   
#     def get(self,request):  
#         queryset=Items.objects.all()
#         serializer_class=ItemSerializer(queryset, many=True)
#         return Response(serializer_class.data)

class ItemListView(generics.ListAPIView):
    serializer_class= ItemSerializer
    pagination_class =PageNumberPagination
 

    def get_queryset(self):  
        queryset=Items.objects.all()
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
@authentication_classes((JSONWebTokenAuthentication,))  
@permission_classes([IsAdminUser,]) 
class generateData(APIView):

    def get(self,request):
        fake = Faker()
        fake.unique_mode = True
        for _ in range(0, 10):

            title=fake.sentence(nb_words=4)
            description=fake.sentence(nb_words=10)
            price=random.randrange(1,1000)
            posted_by=fake.first_name()
            queryset=Items.objects.create(title=title,description=description,price=price,posted_by=posted_by)
            serializer= ItemSerializer(data=queryset)
            if serializer.is_valid():
               serializer.save()
               return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            