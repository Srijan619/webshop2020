from django.shortcuts import render
from django.http import HttpResponse
from .models import Phone
from .serializers import PhoneSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

index = never_cache(TemplateView.as_view(template_name='index.html')) # Takes index from the react side

class PhoneListView(APIView):

    def get(self,request):  
        queryset=Phone.objects.all()
        serializer_class=PhoneSerializer(queryset, many=True)
        return Response(serializer_class.data)
        
    def post(self,request):
        serializer= PhoneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
