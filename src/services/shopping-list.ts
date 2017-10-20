import { Ingredient } from "../models/ingredient";

export class ShoppingListService {
	private ingredients: Ingredient[] = [];

	addItem(name: string, amount: number) {
		this.ingredients.push(new Ingredient(name, amount));
		// this.ingredients.push( { "name": name, "amount": amount } );
		console.log( this.ingredients );
	}

	addItems(items: Ingredient[]) {
		// this.ingredients.push(...item);
	}

	getItems() {
		return this.ingredients.slice();
	}

	removeItem(index: number) {
		this.ingredients.splice(index, 1);
	}
}