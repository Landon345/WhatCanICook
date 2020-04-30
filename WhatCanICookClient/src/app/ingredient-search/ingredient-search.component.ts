import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Ingredient } from '../Interfaces/Ingredient';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-ingredient-search',
  templateUrl: './ingredient-search.component.html',
  styleUrls: ['./ingredient-search.component.css'],
})
export class IngredientSearchComponent implements OnInit {
  ingredients$: Observable<Ingredient[]>;
  private searchTerms = new Subject<string>();

  constructor(private recipeService: RecipeService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.ingredients$ = this.searchTerms.pipe(
      //wait 300 ms after each keystroke before considering the terms
      debounceTime(300),
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.recipeService.getIngredientsQuery(term))
    );
  }
}
