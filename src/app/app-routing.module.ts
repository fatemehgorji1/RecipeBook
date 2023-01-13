import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from 'src/app/shared/error-page/error-page.component';


const routes: Routes = [

  { path: '', redirectTo: '/recipes', pathMatch: 'full' },

  {
    path: 'recipes'
    , loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },

  {
    path: 'auth'
    , loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'shoppingList'
    , loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },

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
