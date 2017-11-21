import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';

import { AuthService } from './auth';

import { Ingredient } from "../models/ingredient";

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  constructor(
     private http: Http,
     private authService: AuthService ) {

  }

  addItem(name: string, amount: string) {
    this.ingredients.push( new Ingredient( name, amount, false ) );
    console.log(this.ingredients);
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    let endpoint: string = 'https://mobile-recipe-app.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token;
    return this.http.put( endpoint, this.ingredients )
      .map( (response: Response) => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    let endpoint: string = 'https://mobile-recipe-app.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token;
    // .do() runs on the result of an observable
    return this.http.get( endpoint )
      .map( (response: Response) => {
        return response.json();
      })
      .do( (ingredients: Ingredient[]) => {
        if (ingredients) {
          this.ingredients = ingredients;
        } else {
          this.ingredients = [];
        }
      });


  }

}
