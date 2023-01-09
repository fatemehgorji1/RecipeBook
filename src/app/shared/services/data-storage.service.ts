import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private recipeService: RecipeService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    return this.http.put(this.url, recipes).subscribe(res => {
      console.log(res);
    })
  }

  fetchData() {

    return this.http.get<Recipe[]>(this.url).pipe(map(recipes => {
      if (!recipes) {
        this.router.navigate(['/recipes/new']);
        this.toastr.error('the recipes list is empty , please added the new recipe', 'error', {
          timeOut: 3000,
        });
        return [];
      }
      return recipes.map(recipe => {

        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
      })

    }),
      tap((recipes: any) => {
        this.recipeService.setRecipes(recipes);
      }))

  }


}
