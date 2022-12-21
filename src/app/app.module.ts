import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
//
import { ShowDropDirective } from 'src/app/shared/directives/show-drop.directive';
import { RequriedInpDirective } from './shared/directives/requried-inp.directive';
//
import { ShoppingService } from 'src/app/shared/services/shopping.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { ResolveService } from 'src/app/shared/services/resolve.service';
//
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
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';







@NgModule({
  declarations: [
    //
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
    AuthComponent,
    //
    ShowDropDirective,
    RequriedInpDirective,
    SpinnerComponent


  ],
  imports: [
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    //
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,

    HttpClientModule
  ],
  providers: [
    ShoppingService,
    RecipeService,
    DataStorageService,
    ResolveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
