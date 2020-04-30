from django.contrib.auth.models import User, Group
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from rest_framework import viewsets, permissions, views
from rest_framework.response import Response
from .models import Recipe, Ingredient, Has
from .serializers import RecipeSerializer, IngredientSerializer, RecipeQuerySerializer
from .serializers import HasSerializer, UserSerializer, GroupSerializer, HasQuerySerializer
from django.db import connection



class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
# Create your views here.


class RecipeView(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def __init__(self, **kwargs):
        self.response_format = {}
        super(RecipeView, self).__init__(**kwargs)

    def get_queryset(self):
        queryset = Recipe.objects.all()
        # recipes_without_duplicates = Recipe.objects.distinct('name')
        # Recipe.objects.exclude(
        #     pk__in=recipes_without_duplicates.values_list('pk', flat=True)).delete()
        active = self.request.query_params.get('name', '')
        if active == '':
            print('active = \'\'')
            return queryset
        elif not active == '':
            print('active not = \'\'')
            return queryset.filter(name__icontains=active)
        else:
            return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        # queryset = Recipe.objects.filter(name=request)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        response_data = super(RecipeView, self).create(
            request, *args, **kwargs)
        self.response_format["data"] = response_data.data
        self.response_format["Success"] = True
        HttpResponseRedirect('')
        return Response(self.response_format)


class IngredientView(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

    def __init__(self, **kwargs):
        self.response_format = {}
        super(IngredientView, self).__init__(**kwargs)

    # Actually worked
    def get_queryset(self):
        queryset = Ingredient.objects.all()
        ingredients_without_duplicates = Ingredient.objects.distinct('name')
        Ingredient.objects.exclude(
            pk__in=ingredients_without_duplicates.values_list('pk', flat=True)).delete()
        active = self.request.query_params.get('name', '')
        if active:
            return queryset.filter(name__icontains=active)
        else:
            return queryset

    def retrieve(self, request, *args, **kwargs):
        # qs = Ingredient.objects.all()
        # serializer = IngredientSerializer(qs, many=True)
        # return Response(serializer.data)
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):

        response_data = super(IngredientView, self).create(
            request, *args, **kwargs)
        
        self.response_format["data"] = response_data.data
        self.response_format["Success"] = True
        HttpResponseRedirect('')
        return Response(self.response_format)


class HasView(viewsets.ModelViewSet):
    queryset = Has.objects.all()
    serializer_class = HasSerializer

    def __init__(self, **kwargs):
        self.response_format = {}
        super(HasView, self).__init__(**kwargs)

    def get_queryset(self):
        queryset = Has.objects.all()

        recipe_id = self.request.query_params.get('recipeID', '')
        if recipe_id:
            return queryset.filter(myRecipe=recipe_id)
        else:
            return queryset

    def create(self, request, *args, **kwargs):
        response_data = super(HasView, self).create(
            request, *args, **kwargs)
        self.response_format["data"] = response_data.data
        self.response_format["Success"] = True
        HttpResponseRedirect('')
        return Response(self.response_format)


class RecipeQueryView(views.APIView):

    def get(self, request):
        # get the ingredients in the paramerters
        ingredients = self.request.query_params.get('ingredients', '')
        print(ingredients)

        ingredients_list = ingredients.split(',')
        print(ingredients_list)
        print(tuple(ingredients_list))

        # If ingredient list is empty, return all the recipes
        if ingredients == '':
            mydata = Recipe.objects.all()
            results = RecipeQuerySerializer(mydata, many=True).data
            return Response(results)
        else:
            # Else return the recipes that contain all of the said ingredients

            # Call my_custom_sql with the list of ingredients as a tuple.
            recipes_selected = self.my_custom_sql(tuple(ingredients_list))
            recipes_selected_as_list = []

            for t in recipes_selected:
                for x in t:
                    recipes_selected_as_list.append(x)
            print("recipes selected", recipes_selected_as_list)
            recipes_as_queryset = Recipe.objects.filter(
                id__in=recipes_selected_as_list)
            print("recipes as queryset", recipes_as_queryset)

            results = RecipeQuerySerializer(
                recipes_as_queryset, many=True).data
            print('results', results)
            return Response(results)

    def my_custom_sql(self, ingredient_ids):
        with connection.cursor() as cursor:
            cursor.execute("select id from recipes_recipe where id not in " +
                           "(select \"myRecipe_id\" from recipes_has where \"myIngredient_id\" not in " +
                           "%s);", [ingredient_ids])
            row = cursor.fetchall()

        return row


class HasQueryView(views.APIView):
    def get(self, request):

        recipe_id = self.request.query_params.get('recipeID', '')
        if recipe_id == '':
            recipe_id = 0
        myrows = self.my_custom_sql(recipe_id)
        print(myrows)
        # print(queryset.filter(myRecipe=recipe_id).values())
        results = HasQuerySerializer(
            myrows, many=True).data
        print('results', results)
        return Response(results)

    def my_custom_sql(self, recipe_id):
        with connection.cursor() as cursor:
            cursor.execute(
                "select h.amount, i.name from recipes_has h, recipes_ingredient i where i.id = h.\"myIngredient_id\" and h.\"myRecipe_id\" = %s;", [recipe_id])
            "Return all rows from a cursor as a dict"
            columns = [col[0] for col in cursor.description]
            return [
                dict(zip(columns, row))
                for row in cursor.fetchall()
            ]
            rows = cursor.fetchall()
            return rows
