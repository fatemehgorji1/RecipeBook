import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';

import { ErrorPageComponent } from 'src/app/error-page/error-page.component';
import { NewRecipeComponent } from 'src/app/recipes/new-recipe/new-recipe.component';
import { RecipesComponent } from 'src/app/recipes/recipes.component';
import { SingleRecipeComponent } from 'src/app/recipes/single-recipe/single-recipe.component';
import { StartRecipesComponent } from 'src/app/recipes/start-recipes/start-recipes.component';
import { AuthGaurdService } from 'src/app/shared/services/auth-guard.service';
import { CanDeactiveGaurdService } from 'src/app/shared/services/alert-guard';
import { ResolveService } from 'src/app/shared/services/resolve.service';
import { ShoppingListEditComponent } from 'src/app/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from 'src/app/shopping-list/shopping-list.component';

const routes: Routes = [

  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
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

  {
    path: 'shoppingList', component: ShoppingListComponent, children: [
      { path: 'new', component: ShoppingListEditComponent },
      {
        path: ':id', component: ShoppingListEditComponent
      }
    ]
  },


  { path: 'auth', component: AuthComponent },

  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { errorMessage: 'Not found 404 !' }
  },

  { path: '**', redirectTo: '/not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
