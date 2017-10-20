import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { ShoppingListService } from '../../services/shopping-list';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
  providers: [ ShoppingListService ]
})
export class ShoppingListPage {

	listItems: Ingredient[];

	constructor( private shoppingListService: ShoppingListService ) {

	}

	ionViewWillEnter() {
		this.loadItems();
	}

	onAddItem(form: NgForm) {
		// console.dir(form);
		this.shoppingListService.addItem( form.value.ingredientName, form.value.ingredientAmount );
		form.reset();
		this.loadItems();
	}

	onCheckItem(index: number) {
		this.shoppingListService.removeItem(index);
		this.loadItems();
	}

	private loadItems() {
		this.listItems = this.shoppingListService.getItems();
		console.log( this.listItems );
	}

}
