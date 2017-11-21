import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';

import { AuthService } from './auth';

// import { User } from "../models/user";

@Injectable()
export class UsersService {
  // private users: User[] = [];
  private users: any[] = [];

  constructor(
    private http: Http,
    private authService: AuthService,
    ) {

  }

  // getItems() {
  //   return this.users.slice();
  // }

  getUsers() {
    // let endpoint: string = "https://mobile-recipe-app.firebaseio.com/users/";
    let endpoint: string = "https://jsonplaceholder.typicode.com/users";
    return this.http.get( endpoint )
      .map( ( response: Response ) => {
        return response.json() ? response.json() : [];
      });
  }

  fetchUsers(token: string) {
    const userId = this.authService.getActiveUser().uid;
    let endpoint: string = 'https://mobile-recipe-app.firebaseio.com/users.json?auth=' + token;
    // .do() runs on the result of an observable
    return this.http.get( endpoint )
      .map( (response: Response) => {
        console.log( response.json() );
        return response.json();
      });
      // .do( (this_users: any[]) => {
      //   if (users) {
      //     this.users = this_users;
      //   } else {
      //     this.users = [];
      //   }
      // });


  }

}
