import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

//my new modules
import { CoreModule } from 'src/app/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


//components
import { AppComponent } from './app.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthModule } from 'src/app/auth/auth.module';
import { ShoppingListModule } from 'src/app/shopping-list/shopping-list.module';
import { RecipesModule } from 'src/app/recipes/recipes.module';
import { ErrorPageModule } from 'src/app/shared/error-page/error-page.module';







@NgModule({
  declarations: [

    AppComponent,
    HeaderComponent,
    ErrorPageComponent

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    //modules ...
    AuthModule,
    ShoppingListModule,
    RecipesModule,
    CoreModule,
    SharedModule,
    ErrorPageModule


  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
