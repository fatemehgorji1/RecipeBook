import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { Ingredient } from 'src/app/shopping-list/ingredient';

@Injectable()
export class ShoppingService {

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
  getIngredientByIndex(index: number) {
    return this.ingredientList[index];
  }
  //shop
  addIngredient(ingredient: Ingredient) {
    const changeOfName = ingredient.name.toLowerCase().trim();
    this.add({
      name: changeOfName,
      amount: ingredient.amount
    });
    console.log(changeOfName);

    this.getChangeIngredients.next(this.ingredientList);
  }
  //recipe to shop
  addIngredients(ingredients: Ingredient[]) {

    for (const ingredient of ingredients) {
      const changeOfName = ingredient.name.toLowerCase().trim();
      let ing = this.ingredientList.find(x => x.name === changeOfName);
      if (ing) {
        ing.amount += ingredient.amount;
      }
      this.add({
        name: changeOfName,
        amount: ingredient.amount
      });

    }
    this.getChangeIngredients.next(this.ingredientList);
  }

  editIngredient(index: number, ingredient: Ingredient) {
    const ing = this.getIngredientByIndex(index);
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
