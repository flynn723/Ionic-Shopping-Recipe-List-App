import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Recipe } from '../../models/recipe'; 

import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesService } from '../../services/recipes';
import { ShoppingListService } from '../../services/shopping-list';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

	recipe: Recipe;
	index: number;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private shoppingListService: ShoppingListService,
		private recipesService: RecipesService ) {
	}

	ngOnInit() {
		this.recipe = this.navParams.get("recipe");
		this.index = this.navParams.get("index");		

		console.log(this.recipe);
		console.log(this.recipe.ingredients);
	}

	onEditRecipe() {
		this.navCtrl.push(EditRecipePage, { mode: "Edit", recipe: this.recipe, index: this.index } );
	}

	onAddIngredients() {
		alert("Attempted to Add Ingredients");
		this.shoppingListService.addItems(this.recipe.ingredients);
		console.log(this.recipe.ingredients);
	}

	onDeleteRecipe() {
		this.recipesService.removeRecipe(this.index);
		this.navCtrl.popToRoot();
	}

}
