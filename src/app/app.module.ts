import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

//my new modules
import { CoreModule } from 'src/app/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { RecipesModule } from 'src/app/recipes/recipes.module';
import { ShoppingListModule } from 'src/app/shopping-list/shopping-list.module';

//components
import { AppComponent } from './app.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';







@NgModule({
  declarations: [

    AppComponent,
    HeaderComponent,
    ErrorPageComponent

  ],
  imports: [

    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    //modules ...
    CoreModule,
    SharedModule,
    AuthModule,
    RecipesModule,
    ShoppingListModule

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
