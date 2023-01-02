import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CancomponentDeactive } from 'src/app/shared/services/can-deactive-gaurd.service';


import { ShoppingService } from 'src/app/shared/services/shopping.service';
import { Ingredient } from 'src/app/shopping-list/ingredient';


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {


  form !: FormGroup;
  nameBtn: string = '';
  id: number = 0;
  ingredient!: Ingredient;
  ingredients: Ingredient[] = [];
  savesChange: boolean = false;

  constructor(
    private shopService: ShoppingService,
    private route: ActivatedRoute,
    private router: Router
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


    this.route.params.subscribe(param => {

      this.id = +param['id'];
      this.ingredient = this.shopService.getIngredientById(this.id);
      if (this.ingredient) {
        this.nameBtn = 'Update';
        this.form.controls['name'].setValue(this.ingredient.name.trim());
        this.form.controls['amount'].setValue(this.ingredient.amount);
      } else {
        this.router.navigate(['/shoppingList/new'])
      }
    })

  }



  //events 

  onAddOrEditIngredientClick() {
    if (this.form.invalid) {
      return;
    }
    if (this.nameBtn == 'Add') {
      if (this.form.controls['name'].value != ""
        && this.form.controls['amount'].value != 0) {
        this.shopService.addIngredient({
          name: this.form.controls['name'].value.trim(),
          amount: this.form.controls['amount'].value
        })
      }
    }
    else if (this.ingredient) {
      this.savesChange = true;
      this.shopService.editIngredient(
        this.id, {
        name: this.form.controls['name'].value.trim(),
        amount: this.form.controls['amount'].value
      })
    }
    this.router.navigate(['/shoppingList/new']);
    this.form.reset();

  }

  onDelIngredientClick() {
    if (this.ingredient) {
      this.shopService.delIngredient(this.ingredient);
    }
    this.form.reset();
    this.router.navigate(['/shoppingList/new']);
  }

  onClear() {
    this.form.reset();
    this.router.navigate(['/shoppingList/new']);
  }


  forBiddeningredientName(control: FormControl) {

    const controlValueWithSpace = control.value?.trim() || '';

    this.ingredients = this.shopService.getIngredientList();


    if (this.nameBtn === 'Add') {

      for (const ing of this.ingredients) {

        if (controlValueWithSpace == ing.name) {
          return { 'forBiddenName': true }
        }
      }
    }
    return null;
  }
}


