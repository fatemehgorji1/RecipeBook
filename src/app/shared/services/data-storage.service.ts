import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { Recipe } from 'src/app/recipes/recipe';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private url: string = 'https://ng-course-book-recipe-2e56e-default-rtdb.firebaseio.com/recipes.json'

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    return this.http.put(this.url, recipes).subscribe(res => {
      console.log(res);
    })
  }

  fetchData() {

    return this.http.get<Recipe[]>(this.url).pipe(map(recipes => {
      return recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
      })
    }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }))

  }


}
