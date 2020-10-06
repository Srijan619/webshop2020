from django.db import models
# Create your models here.

class Items(models.Model):
    title=models.CharField(max_length=40)
    description=models.CharField(max_length=45)
    price=models.CharField(max_length=50,default=0.0)
    sold_status=models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    posted_by=models.CharField(max_length=45, default="")

    def __str__(self):
        return self.title