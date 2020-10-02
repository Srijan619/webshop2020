from django.db import models
# Create your models here.

class Items(models.Model):
    title=models.CharField(max_length=60)
    description=models.CharField(max_length=150)
    price=models.IntegerField()
    status=models.BooleanField(default=False)

    def __str__(self):
        return self.title