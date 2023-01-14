import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
