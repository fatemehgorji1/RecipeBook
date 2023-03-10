import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  paramId: number = 0;
  ingredient!: Ingredient;
  savesChange: boolean = false;

  constructor(
    private shopService: ShoppingService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    this.nameBtn = 'Add';

    this.form = new FormGroup({
      'name': new FormControl(null, [
        Validators.required
      ]),
      'amount': new FormControl(null, [
        Validators.required
      ])
    });

    this.route.params.subscribe(param => {

      this.paramId = +param['id'];
      this.ingredient = this.shopService.getIngredientByIndex(this.paramId);
      if (this.ingredient) {
        this.nameBtn = 'Update';
        this.form.controls['name'].setValue(this.ingredient.name);
        this.form.controls['amount'].setValue(this.ingredient.amount);
      } else {
        this.router.navigate(['/shoppingList/new']);
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
          name: this.form.controls['name'].value,
          amount: this.form.controls['amount'].value
        })
      }
    }
    else if (this.ingredient) {
      this.savesChange = true;

      this.shopService.editIngredient(
        this.paramId, {
        name: this.form.controls['name'].value,
        amount: this.form.controls['amount'].value
      })
    }
    this.onClear();


  }

  onDelIngredientClick() {
    if (this.ingredient) {
      this.shopService.delIngredient(this.ingredient);
    }
    this.onClear();
  }

  onClear() {
    this.form.reset();
    this.router.navigate(['/shoppingList/new']);
  }


}


