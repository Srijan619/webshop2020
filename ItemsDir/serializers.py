from rest_framework import serializers
from .models import Items


class ItemSerializer(serializers.ModelSerializer):
    
    title = serializers.CharField(required=False)
    description= serializers.CharField(required=False)
    
    class Meta:
        model= Items
        fields = '__all__'