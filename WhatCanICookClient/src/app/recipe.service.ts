import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {RecipeApi} from './Interfaces/RecipeApi';
import {Recipe} from './Interfaces/Recipe';
import {HasApi} from './Interfaces/HasApi';
import {Has} from './Interfaces/Has';
import {Ingredient} from './Interfaces/Ingredient';
import {IngredientApi} from './Interfaces/IngredientApi';
import {DataService} from './data.service';
import {Amount} from './Interfaces/Amount';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
    //define my urls
    private recipeUrl = 'http://localhost:8000/Recipe/';
    private recipesUrl = 'http://localhost:8000/Recipe/?format=json';
    private hasUrl = 'http://localhost:8000/Has/?format=json';
    private ingredientsUrl = 'http://localhost:8000/Ingredient/?format=json';
    private recipeQueryUrl = 'http://localhost:8000/RecipeQuery/?format=json';
    private hasQueryUrl = 'http://localhost:8000/HasQuery/?format=json';

    //define headers
    httpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'})
    }
  //create a HttpClient named http
  constructor(private http: HttpClient, private dataService: DataService) { }


  /**
   * Get recipes from the server
   */
  getRecipes(): Observable<Recipe[]>{
    return this.http.get<any>(this.recipesUrl)
      .pipe(
        tap(_=> console.log('fetched recipes')),
        catchError(this.handleError<Recipe[]>('getRecipes', []))
      );
  }
  /**
   * Get a single recipe from the server
   */
  getRecipe(id: number): Observable<Recipe>{
    return this.http.get<any>(this.recipeUrl + `${id}/?format=json`)
      .pipe(
        tap(_=> console.log('fetched recipe')),
        catchError(this.handleError<Recipe[]>('getRecipe', []))
      );
  }
  /**
   * Get ingredients from the server
   */
  getIngredients(): Observable<Ingredient[]>{
    return this.http.get<any>(this.ingredientsUrl)
      .pipe(
        tap(_=> console.log('fetched ingredients')),
        catchError(this.handleError<Recipe[]>('getIngredients', []))
      );
  }
  /**
   * Get recipes from the server
   */
  getHas(): Observable<Has[]>{
    return this.http.get<any>(this.hasUrl)
      .pipe(
        tap(_=> console.log('fetched has')),
        catchError(this.handleError<Recipe[]>('getHas', []))
      );
  }

  getIngredientsQuery(queryString): Observable<Ingredient[]>{
    console.log(this.ingredientsUrl + `&name=${queryString}`);
    return this.http.get<any>(this.ingredientsUrl + `&name=${queryString}`)
      .pipe(
        tap(_=> console.log('fetched ingredients')),
        catchError(this.handleError<Recipe[]>('getIngredients', []))
      );
  }

  getRecipesQuery(queryString: Ingredient[]): Observable<any>{
    // let newQueryString = queryString.map(ingredient => {return {name: ingredient.name}});
    let newQueryString: number[] = queryString.map(ingredient => {return ingredient.id});
    console.log(this.recipeQueryUrl + `&ingredients=${newQueryString}`)
    console.log(`&ingredients=${newQueryString}`);
    return this.http.get<any>(this.recipeQueryUrl + `&ingredients=${newQueryString}`)
      .pipe(
        tap(_=> console.log('fetched recipes query')),
        catchError(this.handleError<Recipe[]>('getRecipesQuery', []))
      );
  }
  getHasQuery(recipeID: number): Observable<Amount[]>{
    return this.http.get<any>(this.hasQueryUrl + `&recipeID=${recipeID}`)
      .pipe(
        tap(_=> console.log('fetched amounts and ingredients')),
        catchError(this.handleError<any>('getHasQuery', []))
      )
  }

/* GET recipes whose name contains search term */
searchRecipes(term: string): Observable<Recipe[]> {
  
  return this.http.get<Recipe[]>(this.recipesUrl + `&name=${term}`).pipe(
    tap(x => x.length ?
    console.log("success") : console.log("failure")),  
    catchError(this.handleError<Recipe[]>('searchRecipes', []))
  );
}


  /**
 * Handle Http operation that failed.
 * Let the app continue
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
handleError<T> (operation = 'operation', result?:T){
  return (error: any): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(error); //log to console instead
    
    //TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  }
}
}