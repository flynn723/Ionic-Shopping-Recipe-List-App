import { Ingredient } from './ingredient';

export class Recipe {
	constructor(
		public title: string,
		public prep_time: string,
		public description: string,
		public difficulty: string,
		public ingredients: Ingredient[] ) {

	}
}