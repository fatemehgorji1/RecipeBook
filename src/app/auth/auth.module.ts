import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

import { AuthComponent } from 'src/app/auth/auth.component';





@NgModule({

  declarations: [AuthComponent],

  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: AuthComponent }
    ]),
    ReactiveFormsModule
  ]
})
export class AuthModule { }
