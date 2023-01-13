import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShoppingListComponent } from 'src/app/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from 'src/app/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ShoppingItemComponent } from 'src/app/shopping-list/shopping-item/shopping-item.component';





@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
    ShoppingItemComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'shoppingList', component: ShoppingListComponent, children: [
          { path: 'new', component: ShoppingListEditComponent },
          {
            path: ':id', component: ShoppingListEditComponent
          }
        ]
      }

    ]),
    SharedModule
  ]
})
export class ShoppingListModule { }
