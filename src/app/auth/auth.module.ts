import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { AuthComponent } from 'src/app/auth/auth.component';


@NgModule({

  declarations: [AuthComponent],

  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'auth', component: AuthComponent }
    ]),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
