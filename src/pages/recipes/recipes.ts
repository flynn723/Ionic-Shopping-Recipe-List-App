import { Component } from '@angular/core';
import { NavController, PopoverController, LoadingController, AlertController } from 'ionic-angular';

import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipePage } from '../recipe/recipe';

import { RecipesService } from '../../services/recipes';
import { AuthService } from '../../services/auth';

import { Recipe } from '../../models/recipe'; 

import { DatabaseOptionsPage } from '../database-options/database-options';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

	recipes: Recipe[] = [];
  loading: any;
  initLoadRecipes: boolean = true;
  reorderRecipes: boolean = false;

	constructor(
  		public navCtrl: NavController,
  		private popoverCtrl: PopoverController,
  		private recipesService: RecipesService,
  		private authService: AuthService,
	    private loadingCtrl: LoadingController,
	    private alertCtrl: AlertController,
		) {
		console.dir( this.recipes );
	}

	ionViewWillEnter() {
		this.recipes = this.recipesService.getRecipes();
    if (this.initLoadRecipes) {
      this.onLoadRecipes();
    }
		// this.recipesService.alertTest();
		// console.log(this.recipes, "Hello");
	}

	onNewRecipe() {
		this.navCtrl.push( EditRecipePage, { mode: "New" } );
	}

	onLoadRecipe(recipe: Recipe, index: number) {
		this.navCtrl.push( RecipePage, { recipe: recipe, index: index } );
	}

  onLoadRecipes() {
    this.authService.getActiveUser().getToken()
      .then(
        ( token: string ) => {
          this.onLoading('Loading List');
          this.recipesService.fetchList( token ).subscribe( (list: Recipe[]) => {
            if (list) {
              this.recipes = list;
            } else {
              this.recipes = [];                  
            }
            this.loading.dismiss();
            this.initLoadRecipes = false;
          }, (err) => { 
            // console.log(err);
            this.loading.dismiss();
            this.onHandleError(err);
          });
        }
      )    
  }

	onShowOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create( DatabaseOptionsPage );
    popover.present( { ev: event } );
    popover.onDidDismiss( (data) => {
    	if (!data) {
        return;
    	}
      if (data.action === 'load') {
        this.onLoadRecipes();
      } else if (data.action === 'store' ) {
        this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.onLoading('Saving List');
              // console.log(token);
              this.recipesService.storeList( token  ).subscribe( (data) => {
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

  reorderItems(indexes) {
    // let element = this.items[indexes.from];
    // this.items.splice(indexes.from, 1);
    // this.items.splice(indexes.to, 0, element);
  }

}
