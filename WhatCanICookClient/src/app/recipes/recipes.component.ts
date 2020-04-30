import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../Interfaces/Recipe';
import { Ingredient } from '../Interfaces/Ingredient';
import { Has } from '../Interfaces/Has';
import { IngredientApi } from '../Interfaces/IngredientApi';
import { DataService } from '../data.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];
  ingredients: Ingredient[];
  myIngredients: Ingredient[] = [];
  has: Has[];
  constructor(
    private recipeService: RecipeService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getRecipes();
    this.getIngredients();
    this.getHas();
  }

  pushToMine(ingredientSelected: Ingredient): void {
    console.log(ingredientSelected);
    if (!this.myIngredients.includes(ingredientSelected)) {
      this.myIngredients.push(ingredientSelected);
    }
  }
  pushToIngredientsList(ingredientSelected: Ingredient): void {
    console.log(ingredientSelected);
    this.myIngredients = this.myIngredients.filter((ingredient) => {
      return ingredient != ingredientSelected;
    });
  }
  searchList(typedName: string): void {
    this.recipeService.searchRecipes(typedName).subscribe((recipe) => {
      this.recipes = recipe;
    });
  }
  searchRecipes(): void {
    this.recipeService
      .getRecipesQuery(this.myIngredients)
      .subscribe((recipe) => {
        this.recipes = recipe;
      });
    console.log(this.recipes);
  }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe((recipeapi) => {
      this.recipes = recipeapi;
      this.dataService.changeRecipes(recipeapi);
    });
  }
  getIngredients(): void {
    this.recipeService.getIngredients().subscribe((ingreidentapi) => {
      this.ingredients = ingreidentapi;
    });
  }
  getHas(): void {
    this.recipeService.getHas().subscribe((hasapi) => {
      this.has = hasapi;
    });
  }
}
