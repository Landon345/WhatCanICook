from django.db import models


# Create your models here.


class Ingredient(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


# class MyIngredient(models.Model):
#     name = models.CharField(max_length=50)

#     def __str__(self):
#         return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255, null=True)
    servings = models.IntegerField(null=True)
    prep_time = models.CharField(max_length=50, null=True)
    theingredients = models.ManyToManyField(
        Ingredient,
        through='Has',
        through_fields=('myRecipe', 'myIngredient'),
    )
    

    def __str__(self):
        return self.name


class Has(models.Model):
    myRecipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    myIngredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.CharField(max_length=100)

    def __str__(self):
        return self.myRecipe + ' ' + self.myIngredient



