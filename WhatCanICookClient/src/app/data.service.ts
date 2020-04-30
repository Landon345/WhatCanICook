import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {RecipeService} from './recipe.service';
import {Recipe} from './Interfaces/Recipe';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  

  constructor() { }

  
  private RecipesSource = new BehaviorSubject([]);


  getRecipes(){
    return this.RecipesSource.asObservable();
  }
  changeRecipes(recipes: Recipe[]) {
    console.log("Changed Recipes")
    console.log(recipes)
    this.RecipesSource.next(recipes)
    
  }

}
