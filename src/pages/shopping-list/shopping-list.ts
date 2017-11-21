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
  loading: any;
  listSegmentSelected: string = "all";
  initLoadList: boolean = true;

  constructor(
    private shoppingListService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController ) {}

  ionViewWillEnter() {
    console.log("Ion View Will Enter");
    this.loadItems();
    if ( this.initLoadList ) {
      this.onLoadList();      
    }
  }

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem( form.value.itemName, form.value.itemAmount );
    form.reset();
    this.loadItems();
  }

  onCheckItem(item: any) {
    item.checked = !item.checked;
  }

  onRemoveItem(index: number) {
    this.shoppingListService.removeItem(index);  
    this.loadItems();  
  }

  onLoadList() {
    // console.log( this.authService.getActiveUser() );
    if ( this.authService.getActiveUser() !== null ) {
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
              this.initLoadList = false;
            }, (err) => { 
              // console.log(err);
              this.loading.dismiss();
              this.onHandleError(err);
            });
          }
        );
    }   
  }

  onShowOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create( DatabaseOptionsPage );
    popover.present( { ev: event } );
    popover.onDidDismiss( (data) => {
      if (!data) {
        return;
      }
      if (data.action === 'load') {
        this.onLoadList();
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
