import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Amount} from '../Interfaces/Amount';
import {RecipeService} from '../recipe.service';
import { from } from 'rxjs';
import { Recipe } from '../Interfaces/Recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  Amounts: Amount[];
  recipe: Recipe;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getAmounts();
    this.getRecipe();
  }

  getAmounts():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.recipeService.getHasQuery(id).subscribe(amount => {
      this.Amounts = amount;
    });
  }

  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipe(id).subscribe(myRecipe => {
      this.recipe = myRecipe;
    });
  }

}
