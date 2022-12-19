import { Injectable } from '@angular/core';

import { Recipe } from 'src/app/recipes/recipe';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    {
      name: 'Pasta',
      description: 'Masala Pasta',
      imagePath: 'https://media.istockphoto.com/id/1189709277/photo/pasta-penne-with-roasted-tomato-sauce-mozzarella-cheese-grey-stone-background-top-view.jpg?s=612x612&w=0&k=20&c=5ro7Cvwx79tWpyN1r2hy3DwplFi5FuPrD_4DYD8tZpg=',
      ingredients: [
        {
          name: 'meet',
          amount: 1
        }, {
          name: 'pasta',
          amount: 2
        }
      ]

    },
    {
      name: 'Cake',
      description: 'Red Velvet Cake',
      imagePath: 'https://handletheheat.com/wp-content/uploads/2013/04/red-velvet-cake-recipe-SQUARE.jpg',
      ingredients: [

      ]
    },
    {
      name: 'berger',
      description: 'This is a berger :)))',
      imagePath: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
      ingredients: [
        {
          name: 'chicken',
          amount: 12
        }
      ]
    }

  ]

  getRecipes() {
    return this.recipes;
  }

  getRecipeById(index: number) {
    return this.recipes[index];
  }

  addnewRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }


  deleteRecipe(recipe: Recipe) {
    let index = this.recipes.indexOf(recipe);
    this.recipes.splice(index, 1);

  }

  editRecipe(index: number, recipe: Recipe) {
    let _recipe = this.getRecipeById(index);
    if (_recipe) {
      _recipe.name = recipe.name;
      _recipe.description = recipe.description;
      _recipe.imagePath = recipe.imagePath;
      _recipe.ingredients = recipe.ingredients;
    }

  }

  constructor() { }
}
