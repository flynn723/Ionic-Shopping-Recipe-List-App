import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { UsersPage } from '../pages/users/users';
import { UserPage } from '../pages/user/user';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { AuthService } from "../services/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  activePage: any;

  rootPage: any = TabsPage;
  tabsPage: any = TabsPage;
  usersPage: any = UsersPage;
  userPage: any = UserPage;
  signinPage: any = SigninPage;
  signupPage: any = SignupPage;
  aboutPage: any = AboutPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController; 

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private authService: AuthService ) {

    firebase.initializeApp({
      apiKey: "AIzaSyDvga6SzZIWhCzBMBT2P1a_zXNtBw2PQuk",
      authDomain: "mobile-recipe-app.firebaseapp.com",
      databaseURL: "https://mobile-recipe-app.firebaseio.com",
      projectId: "mobile-recipe-app",
      storageBucket: "mobile-recipe-app.appspot.com",
      messagingSenderId: "960580186904"   
    });

    firebase.auth().onAuthStateChanged( (user) => {
      console.log( user );
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = this.tabsPage;
        this.activePage = this.tabsPage;
        // this.nav.setRoot(this.tabsPage);
      } else {
        this.isAuthenticated = false;
        this.rootPage = this.signinPage;
        this.activePage = this.signinPage;
        // this.nav.setRoot(this.signinPage);
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
  }

  onGoTo(page: any) {
    this.activePage = page;
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(this.signinPage);
  }

}
