import { Component, OnInit } from '@angular/core';
import {Recipe} from '../Interfaces/Recipe';
import {DataService} from '../data.service';

@Component({
  selector: 'app-queried-recipes',
  templateUrl: './queried-recipes.component.html',
  styleUrls: ['./queried-recipes.component.css']
})
export class QueriedRecipesComponent implements OnInit {
  recipes: Recipe[]
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getQueriedRecipes()
  }

  getQueriedRecipes(): void {
    this.dataService.getRecipes().subscribe(recipe => {
      console.log("Recipes in queried recipes", recipe);
      this.recipes = recipe;
    });
  }

}
