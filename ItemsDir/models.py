from django.db import models
# Create your models here.

class Items(models.Model):
    
    title=models.CharField(max_length=40)
    description=models.CharField(max_length=45)
    price=models.CharField(max_length=50,default=0.0,blank=False)
    sold_status=models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    posted_by=models.CharField(max_length=45, default="")
    sold_to=models.CharField(max_length=45, default="",blank=True)
    version=models.IntegerField(default=0)
    image=models.CharField(max_length=200)

    def __str__(self):
        return self.title