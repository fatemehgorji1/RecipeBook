import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-start-recipes',
  template: `
  <h3 *ngIf="recipes.length>0 ; else noRecipes" class="mt-5 mx-5">Select the Recipe !</h3>
  <ng-template #noRecipes>
    <h3 class="mt-5 mx-5">Fetch Data ...</h3>
  </ng-template>
  `
})
export class StartRecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChange.subscribe(recipes => {
      this.recipes = recipes;
    })
  }

}
