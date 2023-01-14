import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { ShoppingService } from 'src/app/shared/services/shopping.service';
import { Ingredient } from 'src/app/shopping-list/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ShoppingResolverService implements Resolve<Ingredient[]> {
  constructor(
    private shoppingService: ShoppingService,
    private dataStorageService: DataStorageService
  ) { }

  resolve(route: ActivatedRouteSnapshot): any {
    const ingredients = this.shoppingService.getIngredientList();
    if (ingredients.length === 0) {
      return this.dataStorageService.fetchShoppinglistData();
    }
    else {
      return ingredients;
    }
  }

}
