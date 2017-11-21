import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { NavParams, NavController, ActionSheetController, AlertController, ToastController } from 'ionic-angular';

import { RecipesService } from '../../services/recipes';

import { Recipe } from '../../models/recipe'; 

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {

	private mode: string = "New"
	private difficulties: any[] = [ "Easy", "Medium", "Hard" ];
	private recipeForm: FormGroup;
	private recipe: Recipe;
	private index: number;

	constructor( private navParams: NavParams, private actionSheetCtrl: ActionSheetController,
				private alertCtrl: AlertController, private toastCtrl: ToastController,
				private recipesService: RecipesService, private navCtrl: NavController ) { }

	ngOnInit() {
		this.mode = this.navParams.get('mode');
		if ( this.mode === "Edit" ) {	
			this.recipe = this.navParams.get('recipe');	
			this.index = this.navParams.get('index');	
		}
		this.initializeForm();	
	}

	private onManageIngredients() {
		const actionSheet = this.actionSheetCtrl.create({
			title: 'Question?',
			buttons: [
				{
					text: 'Add Ingredient',
					handler: () => {
						this.createNewIngredientAlert().present();
					}
				},
				{
					text: 'Remove All Ingredients',
					role: 'destructive',
					handler: () => {
						const fArray: FormArray = <FormArray>this.recipeForm.get("ingredients");
						const length = fArray.length;
						if (length > 0) {
							for ( let i = length - 1; i >=0; i-- ) {
								fArray.removeAt(i);
							}
							this.presentToast( "All Ingredients were deleted!" );
						}
					}
				},
				{
					text: 'Cancel',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}

	private createNewIngredientAlert() {
		return this.alertCtrl.create({
			title: 'Add Ingredient',
			inputs: [
				{
					name: 'name',
					placeholder: 'Ingredient Name'
				},
				{
					name: 'amount',
					placeholder: 'Ingredient Amount'
				},
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel'
				},
				{
					text: 'Add',
					handler: data => {
						if ( data.name.trim() == "" || data.name == null ) {
							this.presentToast( "Item " );
							return;
						}
						(<FormArray>this.recipeForm.get("ingredients"))
							.push(new FormControl( data, Validators.required));
							this.presentToast( "Item added!" );
					}			
				}
			]
		});
	}

	private initializeForm() {
		let title = null;
		let prep_time = null;
		let description = null;
		let difficulty = 'Medium';
		let ingredients = [];

		if (this.mode === "Edit") {
			title = this.recipe.title;
			prep_time = this.recipe.prep_time;
			description = this.recipe.description;
			difficulty = this.recipe.difficulty;
			for ( let ingredient of this.recipe.ingredients) {
				ingredients.push( new FormControl( ingredient.name, Validators.required ) );
			}
		}

		this.recipeForm = new FormGroup({
			'title': new FormControl( title, Validators.required ),
			'prep_time': new FormControl( prep_time, Validators.required ),
			'description': new FormControl( description, Validators.required ),
			'difficulty': new FormControl( difficulty, Validators.required ),
			'ingredients': new FormArray(ingredients)
		});
	}

	private onSubmit() {
		// console.log(this.recipeForm);
		const value = this.recipeForm.value;
		let ingredients = [];
		if (value.ingredients.length > 0) {
			// transforms array of strings, into an array of objects,
			// where we store a name and amount property set to 1
			ingredients = value.ingredients.map( (data) => {
				return { name: data.name, amount: data.amount };
			});
		}
		if (this.mode == 'Edit') {
			this.recipesService.updateRecipe(this.index, value.prep_time, value.title, value.description, value.difficulty, ingredients);
		} else {
			this.recipesService.addRecipe(value.title, value.prep_time, value.description, value.difficulty, ingredients);
		}

		this.recipeForm.reset();
		this.navCtrl.popToRoot();
	}

	private presentToast( message: string ) {
		const toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom'
		});
		toast.onDidDismiss(() => {
			// console.log('Dismissed toast');
		});
		toast.present();
	}

}
