import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from 'src/app/recipes/recipe';
import { RecipeService } from 'src/app/shared/services/recipe.service';


@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

    recipes!: Recipe[];
    subscription!: Subscription;


    constructor(
        private router: Router,
        private recipeService: RecipeService
    ) {

    }


    ngOnInit(): void {
        this.recipes = this.recipeService.getRecipes();
        this.subscription = this.recipeService.recipesChange.subscribe(resipes => {
            this.recipes = resipes;
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    // events

    onAddRecipeClick() {
        this.router.navigate(['/recipes', 'new-recipe']);
    }

}
