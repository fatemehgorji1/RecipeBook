import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from 'src/app/recipes/recipe';
import { RecipeService } from 'src/app/shared/services/recipe.service';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  titleFormBtn = '';
  titleForm = '';
  form!: FormGroup;
  ingredients: any;
  paramId: number = 0;
  recipe!: Recipe;
  newIngredients = new FormArray([]);
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.titleFormBtn = "Add";
    this.titleForm = "Add recipe";

    this.form = new FormGroup({
      'name': new FormControl(null, [
        Validators.required
      ]),
      'description': new FormControl(null, [
        Validators.required
      ]),
      'imagePath': new FormControl(null, [
        Validators.required
      ]),
      'ingredient': this.newIngredients
    })
    this.ingredients = this.form.controls['ingredient'] as FormArray;

    this.route.params.subscribe(param => {
      this.paramId = +param['id'];
      this.recipe = this.recipeService.getRecipeById(this.paramId);
      if (this.recipe) {
        this.titleForm = "Update Recipe";
        this.titleFormBtn = "Update";
        this.form.controls['name'].setValue(this.recipe.name);
        this.form.controls['description'].setValue(this.recipe.description);
        this.form.controls['imagePath'].setValue(this.recipe.imagePath);
        // this.form.controls['ingredient'].setValue(this.recipe.ingredients);
        if (this.recipe.ingredients) {
          for (const ing of this.recipe.ingredients) {
            this.newIngredients.push(new FormGroup({
              'name': new FormControl(ing.name),
              'amount': new FormControl(ing.amount)
            }))
          }
        }
      }
    })
  }

  //events
  addIngredient() {
    this.ingredients.push(new FormGroup({
      'name': new FormControl(null, [
        Validators.required
      ]),
      'amount': new FormControl(null, [
        Validators.required
      ])
    }))
  }

  onSubmit() {
    if (this.titleFormBtn === "Add") {
      this.recipeService.addnewRecipe({
        name: this.form.value.name,
        imagePath: this.form.value.imagePath,
        description: this.form.value.description,
        ingredients: this.form.value.ingredient
      })
    } else if (this.recipe) {
      this.recipeService.editRecipe(this.paramId, {
        name: this.form.value.name,
        imagePath: this.form.value.imagePath,
        description: this.form.value.description,
        ingredients: this.form.value.ingredient
      })
    }
    this.onCansel();
  }
  onCansel() {
    this.router.navigate(['']);
  }


  onDeleteIngredient(index: number) {
    this.newIngredients.removeAt(index);
  }
}
