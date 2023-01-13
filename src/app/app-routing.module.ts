import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from 'src/app/shared/error-page/error-page.component';


const routes: Routes = [

  { path: '', redirectTo: '/recipes', pathMatch: 'full' },

  // {
  //   path: 'not-found',
  //   component: ErrorPageComponent,
  //   data: { errorMessage: 'Not found 404 !' }
  // },

  // { path: '**', redirectTo: '/not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
