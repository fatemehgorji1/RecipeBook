import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ShowDropDirective } from 'src/app/shared/directives/show-drop.directive';

import { ShoppingService } from 'src/app/shared/services/shopping.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NewRecipeComponent } from './recipes/new-recipe/new-recipe.component';
import { SingleRecipeComponent } from './recipes/single-recipe/single-recipe.component';
import { StartRecipesComponent } from './recipes/start-recipes/start-recipes.component';
import { RequriedInpDirective } from './shared/directives/requried-inp.directive';
import { HttpClientModule } from "@angular/common/http";
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { AuthComponent } from './auth/auth.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,

    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    ErrorPageComponent,
    NewRecipeComponent,
    SingleRecipeComponent,
    StartRecipesComponent,
    ShowDropDirective,
    RequriedInpDirective,
    AuthComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule


  ],
  providers: [
    ShoppingService,
    RecipeService,
    DataStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
