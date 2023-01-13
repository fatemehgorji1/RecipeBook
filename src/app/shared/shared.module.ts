import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerCircularFixedModule } from 'spinners-angular/spinner-circular-fixed';

import { ShowDropDirective } from 'src/app/shared/directives/show-drop.directive';
import { RequriedInpDirective } from 'src/app/shared/directives/requried-inp.directive';
import { PlaceholderDirective } from 'src/app/shared/directives/placeholder.directive';

import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    SpinnerComponent,
    AlertComponent,
    ShowDropDirective,
    RequriedInpDirective,
    PlaceholderDirective
  ],
  imports: [
    ToastrModule.forRoot(),
    SpinnerCircularFixedModule,
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    AlertComponent,
    ShowDropDirective,
    RequriedInpDirective,
    PlaceholderDirective,
    SpinnerCircularFixedModule,
    CommonModule

  ],
  entryComponents: [AlertComponent]
})
export class SharedModule { }
