import { Ingredient } from 'src/app/shopping-list/ingredient';

export class Recipe {
    name!: string;
    description!: string;
    imagePath!: string;
    ingredients!: Ingredient[];

}