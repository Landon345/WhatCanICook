import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {Ingredient} from '../Interfaces/Ingredient';
import {Recipe} from '../Interfaces/Recipe';
import {RecipeService} from '../recipe.service';


@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  private searchTerms = new Subject<string>();

  constructor(private recipeService: RecipeService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.recipes$ = this.searchTerms.pipe(
      //wait 300 ms after each keystroke before considering the terms
      debounceTime(300),
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term:string) => this.recipeService.searchRecipes(term),
    ), );
  }

}
