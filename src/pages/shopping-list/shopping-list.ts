import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { PopoverController, LoadingController, AlertController } from 'ionic-angular';

import { ShoppingListService } from "../../services/shopping-list";
import { AuthService } from '../../services/auth';
import { Ingredient } from "../../models/ingredient";

import { DatabaseOptionsPage } from '../database-options/database-options';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

  listItems: Ingredient[];
  private loading: any;

  constructor(
    private shoppingListService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController ) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create( DatabaseOptionsPage );
    popover.present( { ev: event } );
    popover.onDidDismiss( (data) => {
      if (data.action === 'load') {
        this.authService.getActiveUser().getToken()
          .then(
            ( token: string ) => {
              this.onLoading('Loading List');
              this.shoppingListService.fetchList( token ).subscribe( (list: Ingredient[]) => {
                if (list) {
                  this.listItems = list;
                } else {
                  this.listItems = [];                  
                }
                this.loading.dismiss();
              }, (err) => { 
                // console.log(err);
                this.loading.dismiss();
                this.onHandleError(err);
              });
            }
          )
      } else if (data.action === 'store' ) {
        this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.onLoading('Saving List');
              // console.log(token);
              this.shoppingListService.storeList( token  ).subscribe( (data) => {
                console.log( 'Successfully stored data.' );
                this.loading.dismiss();
              }, (err) => {
                // console.log( err );
                this.loading.dismiss();
                this.onHandleError(err);
              });
        });
      }
    });
  }

  private loadItems() {
    this.listItems = this.shoppingListService.getItems();
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
