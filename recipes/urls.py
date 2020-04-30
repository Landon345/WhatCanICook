from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

ROUTER = routers.DefaultRouter()
ROUTER.register('Ingredient', views.IngredientView)
ROUTER.register('Recipe', views.RecipeView)
ROUTER.register('Has', views.HasView)
ROUTER.register(r'users', views.UserViewSet)
ROUTER.register(r'groups', views.GroupViewSet)
urlpatterns = [
    path('', include(ROUTER.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('RecipeQuery/', views.RecipeQueryView.as_view(), name='RecipeQuery'),
    path('HasQuery/', views.HasQueryView.as_view(), name='HasQuery')
]
