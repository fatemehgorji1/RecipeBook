import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs/operators';

import { Recipe } from 'src/app/recipes/recipe';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { ShoppingService } from 'src/app/shared/services/shopping.service';
import { Ingredient } from 'src/app/shopping-list/ingredient';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private Recipesurl: string = 'https://ng-course-book-recipe-2e56e-default-rtdb.firebaseio.com/Recipes.json'
  private IngredientsUrl: string = 'https://ng-course-book-recipe-2e56e-default-rtdb.firebaseio.com/Ingredients.json'

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private shoppingService: ShoppingService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    return this.http.put(this.Recipesurl, recipes).subscribe(res => {
      console.log(res);
      this.toastr.success('the recipes save to list', 'successfully', {
        timeOut: 3000,
      });
    })
  }


  fetchRecipesData() {

    return this.http.get<Recipe[]>(this.Recipesurl).pipe(map(recipes => {
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
        this.recipeService.setToRecipes(recipes);
      }))

  }


  storeShoppingList() {
    const ingredients: Ingredient[] = this.shoppingService.getIngredientList();
    return this.http.put(this.IngredientsUrl, ingredients).subscribe(res => {
      console.log(res);
      this.toastr.success('the ingredients save to list', 'successfully', {
        timeOut: 3000,
      });
    });
  }

  fetchShoppinglistData() {
    return this.http.get<Ingredient[]>(this.IngredientsUrl).pipe(tap(ingredients => {
      this.shoppingService.setToIngredientList(ingredients);
    }));
  }

}
