import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Recipe } from 'src/app/recipes/recipe';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private url: string = 'https://ng-course-book-recipe-2e56e-default-rtdb.firebaseio.com/recipes.json'

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    return this.http.put(this.url, recipes).subscribe(res => {
      console.log(res);
    })
  }

  fetchData() {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<Recipe[]>(this.url, {
        params: new HttpParams().set('auth', user.token)
      });
    }), map(recipes => {
      return recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
      })
    }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }))

  }


}
