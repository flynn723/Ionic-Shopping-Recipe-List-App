import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UsersPage } from '../pages/users/users';
import { UserPage } from '../pages/user/user';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { DatabaseOptionsPage } from '../pages/database-options/database-options';
import { RecipesPage } from '../pages/recipes/recipes';
import { RecipePage } from '../pages/recipe/recipe';
import { EditRecipePage } from '../pages/edit-recipe/edit-recipe';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

import { ShoppingListService } from '../services/shopping-list';
import { RecipesService } from '../services/recipes';
import { UsersService } from '../services/users';
import { AuthService } from '../services/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    UsersPage,
    UserPage,
    ShoppingListPage,
    RecipesPage,
    RecipePage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    AboutPage,
    DatabaseOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          iconMode: 'ios'          
        },
        android: {
          iconMode: 'md'          
        }
      }
    }),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    UsersPage,
    UserPage,
    ShoppingListPage,
    RecipesPage,
    RecipePage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    AboutPage,
    DatabaseOptionsPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService,
    UsersService,
    AuthService
  ]
})
export class AppModule {}
