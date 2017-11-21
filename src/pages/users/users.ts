import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth';
import { UsersService } from '../../services/users';
// import { User } from '../../models/user';

import { UserPage } from '../user/user';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

	private users: any[] = [];
  loading: any;
  private filterableCopyOfUsers: any[] = [];
  private showUsersSearch: boolean = false;
  private searchUsersQuery: string;

  constructor(
    private authService: AuthService,
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private usersService: UsersService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, ) {

  	this.usersService.getUsers().subscribe( (data) => {
      this.users = data;
      this.filterableCopyOfUsers = data;
    });

    this.onLoadUsers();

  }

  onLoadUsers() {
    let this_users: any[] = [];
    if ( this.authService.getActiveUser() !== null ) {
      this.authService.getActiveUser().getToken()
        .then(
          ( token: string ) => {
            this.onLoading('Loading Users');  
            this.usersService.fetchUsers( token ).subscribe( (data) => {
              alert('test');

              console.log(data);

              if (data) {
                this_users = data;
              } else {
                this_users = [];                  
              }
              this.loading.dismiss();
              
            }, (err) => { 
              console.log(err);
              this.loading.dismiss();
              this.onHandleError(err);
            });
          }
        );
    }   
    console.log( this_users );  
  }

  onFilterUsers() {
    let search = this.searchUsersQuery.toLowerCase();
    this.users = this.filterableCopyOfUsers.filter( (user) => {
      return ( user.name.toLowerCase().indexOf( search ) > -1 ) ? true : false;
    });
  }

  onCancelSearch() {
    if ( this.searchUsersQuery !== "" ) {
      this.searchUsersQuery = "";
      this.onFilterUsers();
    }
    this.showUsersSearch = false; 
  }

  goToUserProfile( this_user: any ) {
    this.navCtrl.push( UserPage, { user: this_user } );
  }

  onLoading(message: string) {
    this.loading = this.loadingCtrl.create({
      content: message
    });    
    this.loading.present();
  }

  onHandleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured.',
      message: errorMessage, 
      buttons: ['Ok']
    });
    alert.present();
  }

}
