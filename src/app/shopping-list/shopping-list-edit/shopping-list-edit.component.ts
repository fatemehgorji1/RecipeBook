import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShoppingService } from 'src/app/shared/services/shopping.service';
import { Ingredient } from 'src/app/shopping-list/ingredient';


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  subscription !: Subscription;
  form !: FormGroup;
  nameBtn: string = '';
  indexEdit: number = 0;
  ingredient!: Ingredient;
  ingredients: Ingredient[] = [];

  constructor(
    private shopService: ShoppingService
  ) { }

  ngOnInit(): void {

    this.nameBtn = 'Add';

    this.form = new FormGroup({
      'name': new FormControl(null, [
        Validators.required,
        this.forBiddeningredientName.bind(this)
      ]),
      'amount': new FormControl(null, [
        Validators.required
      ])
    });

    this.subscription = this.shopService.editItem.subscribe(index => {
      this.indexEdit = index;
      this.ingredient = this.shopService.getIngredientById(index);
      if (this.ingredient) {

        this.nameBtn = 'Update';
        this.form.controls['name'].setValue(this.ingredient.name);
        this.form.controls['amount'].setValue(this.ingredient.amount);

      }

    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  //events 

  onAddOrEditIngredientClick() {
    if (this.form.invalid) {
      return;
    }
    if (this.nameBtn == 'Add') {
      if (this.form.controls['name'].value != "" && this.form.controls['amount'].value != 0) {
        this.shopService.addIngredient({
          name: this.form.controls['name'].value,
          amount: this.form.controls['amount'].value
        })
      }
    }
    else if (this.ingredient) {
      this.shopService.editIngredient(this.indexEdit, {
        name: this.form.controls['name'].value,
        amount: this.form.controls['amount'].value
      })
    }
    this.nameBtn = "Add";
    this.form.reset();

  }

  onDelIngredientClick() {
    if (this.ingredient) {
      this.shopService.delIngredient(this.ingredient);
    }
    this.form.reset();
    this.nameBtn = 'Add';
  }

  onClear() {
    this.form.reset();
    this.nameBtn = "Add";
  }

  forBiddeningredientName(control: FormControl) {
    this.ingredients = this.shopService.getIngredientList();
    if (this.nameBtn === 'Add') {
      for (const ing of this.ingredients) {
        if (control.value === ing.name) {
          return { 'forBiddenName': true }
        }
      }
    }
    return null;
  }
}


