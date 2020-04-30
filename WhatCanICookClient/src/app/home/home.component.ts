import { Component, OnInit} from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../Interfaces/Recipe';
import { Ingredient } from '../Interfaces/Ingredient';
import { Has } from '../Interfaces/Has';
import {DataService} from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipes: Recipe[];
  ingredients: Ingredient[];
  myIngredients: Ingredient[] = [];
  has: Has[];
  constructor(private recipeService: RecipeService, private dataService: DataService) {}

  ngOnInit(): void {
    
    this.getIngredients();

    this.getHas();
    this.getRecipes();
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
    this.recipeService
      .getIngredientsQuery(typedName)
      .subscribe((IngredientApi) => {
        this.ingredients = IngredientApi;
        this.ingredients.splice(8);
      });
  }
  searchRecipes(): void {
    this.recipeService.getRecipesQuery(this.myIngredients).subscribe((recipe)=>{
      this.recipes = recipe;
      this.dataService.changeRecipes(recipe)
    })
    console.log(this.recipes);
  }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe((recipeapi) => {
      this.recipes = recipeapi;
      this.dataService.changeRecipes(recipeapi)
      this.ingredients.splice(8);
    });
  }
  getIngredients(): void {
    this.recipeService.getIngredients().subscribe((ingreidentapi) => {
      this.ingredients = ingreidentapi;
      this.ingredients.splice(8);
    });
  }
  getHas(): void {
    this.recipeService.getHas().subscribe((hasapi) => {
      this.has = hasapi;
    });
  }

}
