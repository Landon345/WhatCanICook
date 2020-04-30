from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Ingredient, Recipe, Has



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'



class HasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Has
        fields = '__all__'


class HasQuerySerializer(serializers.Serializer):
    amount = serializers.CharField(max_length=50)
    name = serializers.CharField(max_length = 50)



class RecipeQuerySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length = 100)

