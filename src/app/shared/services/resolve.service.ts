import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Recipe } from 'src/app/recipes/recipe';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';


@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<Recipe[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) { }
  resolve(route: ActivatedRouteSnapshot): any {

    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchData();
    }
    else {
      return recipes;
    }

  }
}
