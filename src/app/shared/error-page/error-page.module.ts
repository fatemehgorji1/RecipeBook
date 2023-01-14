import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from 'src/app/shared/error-page/error-page.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'not-found', component: ErrorPageComponent, data: { 'errorMessage': 'Not Found 404 !' }
      },
      {
        path: '**', redirectTo: '/not-found'
      }
    ])
  ]
})
export class ErrorPageModule { }
