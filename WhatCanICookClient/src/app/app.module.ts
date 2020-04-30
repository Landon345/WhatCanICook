import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { IngredientSearchComponent } from './ingredient-search/ingredient-search.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { QueriedRecipesComponent } from './queried-recipes/queried-recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    AboutComponent,
    HomeComponent,
    RecipeDetailComponent,
    IngredientSearchComponent,
    RecipeSearchComponent,
    QueriedRecipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
