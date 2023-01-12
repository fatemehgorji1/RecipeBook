import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from 'src/app/recipes/recipe';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { ShoppingService } from 'src/app/shared/services/shopping.service';
import { Ingredient } from 'src/app/shopping-list/ingredient';


@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit {

  recipeDetail !: Recipe;
  recipe!: Recipe;
  paramId: number = 0;

  constructor(
    private recipeService: RecipeService,
    private shopService: ShoppingService,
    private route: ActivatedRoute,
    private router: Router,

  ) {

  }
  ngOnInit(): void {

    this.route.params.subscribe(param => {
      this.paramId = +param['id'];
      this.recipe = this.recipeService.getRecipeById(this.paramId);
      if (this.recipe) {
        this.recipeDetail = this.recipe;
      }
      else {
        this.router.navigate(['/recipes/new']);
      }
    })

  }

  //events

  onAddToShoppingListClick(ingredients: Ingredient[]) {
    this.shopService.addIngredients(ingredients);
  }
  onDeleteRecipeClick() {

    this.recipeService.deleteRecipe(this.recipeDetail);
    this.router.navigate(['/recipes']);

  }
  onEditRecipeClick() {
    this.router.navigate(['/recipes', this.paramId, 'edit']);
  }

}
