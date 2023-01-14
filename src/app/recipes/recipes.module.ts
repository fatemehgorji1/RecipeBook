import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthGaurdService } from 'src/app/shared/services/auth-guard.service';
import { ResolveService } from 'src/app/shared/services/resolve.service';

import { RecipesComponent } from 'src/app/recipes/recipes.component';
import { RecipeItemComponent } from 'src/app/recipes/recipe-item/recipe-item.component';
import { NewRecipeComponent } from 'src/app/recipes/new-recipe/new-recipe.component';
import { SingleRecipeComponent } from 'src/app/recipes/single-recipe/single-recipe.component';
import { StartRecipesComponent } from 'src/app/recipes/start-recipes/start-recipes.component';




@NgModule({
  declarations: [
    RecipesComponent,
    RecipeItemComponent,
    NewRecipeComponent,
    SingleRecipeComponent,
    StartRecipesComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'recipes', component: RecipesComponent, canActivate: [AuthGaurdService],
        children:
          [
            { path: '', component: StartRecipesComponent },
            { path: 'new', component: NewRecipeComponent },
            { path: ':id', component: SingleRecipeComponent, resolve: [ResolveService] },
            {
              path: ':id/edit', component: NewRecipeComponent, resolve: [ResolveService]

            }
          ]
      },
    ]),
    SharedModule
  ]
})
export class RecipesModule { }
