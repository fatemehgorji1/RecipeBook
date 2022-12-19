import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from 'src/app/recipes/recipe';
import { RecipeService } from 'src/app/shared/services/recipe.service';




@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

    recipes!: Recipe[];
    selectedItem!: number;

    constructor(
        private router: Router,
        private recipeService: RecipeService
    ) { }

    ngOnInit(): void {
        this.recipes = this.recipeService.getRecipes();
    }


    // events

    onAddRecipeClick() {
        this.router.navigate(['/recipes', 'new-recipe']);
    }

}
