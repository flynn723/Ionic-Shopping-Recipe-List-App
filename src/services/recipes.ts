import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';

import { AuthService } from './auth';

import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  constructor(
    private authService: AuthService,
    private http: Http,
    ) {

  }

  addRecipe(title: string,
            description: string,
            difficulty: string,
            ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    console.log(this.recipes);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe(index: number,
               title: string,
               description: string,
               difficulty: string,
               ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  storeList( token: string ) {
    const userId = this.authService.getActiveUser().uid;
    let endpoint: string = "https://mobile-recipe-app.firebaseio.com/" + userId + "/recipes.json?auth=" + token;
    return this.http.put( endpoint, this.recipes )
      .map( ( response: Response ) => {
        return response.json();
      });
  }

  fetchList( token: string ) {
    const userId = this.authService.getActiveUser().uid;
    let endpoint: string = "https://mobile-recipe-app.firebaseio.com/" + userId + "/recipes.json?auth=" + token;
    return this.http.get( endpoint )
      .map( ( response: Response ) => {
        const recipes: Recipe[] = response.json() ? response.json() : [];
        for ( let item of recipes ) {
          if (!item.hasOwnProperty('ingredients')) {
            item.ingredients = [];
          }
        }
        return recipes;
      })
      .do( (recipes: Recipe[]) => {
        if (recipes) {
          this.recipes = recipes;
        } else {
          this.recipes = [];          
        }
      });

  }

}
