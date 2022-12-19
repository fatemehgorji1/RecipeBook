import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from 'src/app/error-page/error-page.component';
import { NewRecipeComponent } from 'src/app/recipes/new-recipe/new-recipe.component';
import { RecipesComponent } from 'src/app/recipes/recipes.component';
import { SingleRecipeComponent } from 'src/app/recipes/single-recipe/single-recipe.component';
import { StartRecipesComponent } from 'src/app/recipes/start-recipes/start-recipes.component';
import { ResolveService } from 'src/app/shared/services/resolve.service';
import { ShoppingListComponent } from 'src/app/shopping-list/shopping-list.component';

const routes: Routes = [

  { path: '', redirectTo: '/recipes', pathMatch: 'full' },

  {
    path: 'recipes', component: RecipesComponent, children:
      [
        { path: '', component: StartRecipesComponent },
        { path: 'detail/:id', component: SingleRecipeComponent, resolve: [ResolveService] },
        { path: 'edit/:id', component: NewRecipeComponent, resolve: [ResolveService] },
        { path: 'new-recipe', component: NewRecipeComponent }
      ]
  },

  { path: 'shoppingList', component: ShoppingListComponent },

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
