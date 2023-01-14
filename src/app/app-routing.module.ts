import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from 'src/app/shared/error-page/error-page.component';


const routes: Routes = [

  { path: '', redirectTo: '/recipes', pathMatch: 'full' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
