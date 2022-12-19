import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { Ingredient } from 'src/app/shopping-list/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  editItem = new Subject<number>();
  getChangeIngredients = new Subject<Ingredient[]>();

  private ingredientList: Ingredient[] = [
    {
      name: 'pasta',
      amount: 3
    }

  ]


  getIngredientList() {
    return this.ingredientList;
  }
  getIngredientById(index: number) {
    return this.ingredientList[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.add(ingredient);
    this.getChangeIngredients.next(this.ingredientList);
  }

  addIngredients(ingredients: Ingredient[]) {
    for (const ingredient of ingredients) {
      let ing = this.ingredientList.find(x => x.name === ingredient.name);
      if (ing) {
        ing.amount += ingredient.amount;
      }
      this.add(ingredient);
    }
    this.getChangeIngredients.next(this.ingredientList);
  }

  editIngredient(index: number, ingredient: Ingredient) {
    const ing = this.getIngredientById(index);
    if (ing) {
      ing.name = ingredient.name;
      ing.amount = ingredient.amount;
    }
    this.getChangeIngredients.next(this.ingredientList);
  }

  delIngredient(ing: Ingredient) {
    const index = this.ingredientList.indexOf(ing);
    this.ingredientList.splice(index, 1);
    this.getChangeIngredients.next(this.ingredientList);

  }

  private add(ingredient: Ingredient) {

    let ing = this.ingredientList.find(x => x.name === ingredient.name);
    if (!ing) {
      this.ingredientList.push({
        name: ingredient.name,
        amount: ingredient.amount
      });
    }
    this.toastr.success(`Successfully added ${ingredient.name} to shopping list !`, 'Successfully', {
      timeOut: 1000,
    });

  }

  constructor(
    private toastr: ToastrService
  ) { }
}
