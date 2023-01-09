import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from 'src/app/recipes/recipe';


@Injectable()
export class RecipeService {

  recipesChange = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes;
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChange.next(this.recipes);
  }

  getRecipeById(index: number) {

    return this.recipes[index];

  }

  addnewRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChange.next(this.recipes);
  }


  deleteRecipe(recipe: Recipe) {
    let index = this.recipes.indexOf(recipe);
    this.recipes.splice(index, 1);
    this.recipesChange.next(this.recipes);
  }

  editRecipe(index: number, recipe: Recipe) {
    let _recipe = this.getRecipeById(index);
    if (_recipe) {
      _recipe.name = recipe.name;
      _recipe.description = recipe.description;
      _recipe.imagePath = recipe.imagePath;
      _recipe.ingredients = recipe.ingredients;
    }
    this.recipesChange.next(this.recipes);
  }

  constructor() { }
}
