import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingService } from 'src/app/shared/services/shopping.service';
import { Ingredient } from 'src/app/shopping-list/ingredient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  subscription !: Subscription;
  shopList: Ingredient[] = [];
  constructor(
    private shopService: ShoppingService
  ) {
  }

  ngOnInit(): void {
    this.shopList = this.shopService.getIngredientList();

    this.subscription = this.shopService.getChangeIngredients.subscribe(res => {
      this.shopList = res;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
