import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ShoppingService } from 'src/app/shared/services/shopping.service';
import { AuthInterceptorService } from 'src/app/shared/services/auth-interceptor.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';



@NgModule({
  providers: [
    ShoppingService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
})
export class CoreModule { }
