import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../services/auth';

import { User } from '../../models/user'; 

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage implements OnInit {

  // private fireBaseUser: any;
  private profile_FG: FormGroup;
  private this_user: User;
  current_user_belongs_to_profile: boolean = false;
  editing_profile: boolean = false;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
    private authService: AuthService,
    private formBuilder: FormBuilder ) {

    this.this_user = this.navParams.get( "user" );
    this.this_user.recipes = [
      { name: "Test 1", type: "public" },
      { name: "Test 2", type: "public" },
    ];
    console.dir(this.this_user);
    this.doesCurrentUserBelongtoProfile();  
    // console.dir( this.this_user );

  }

  ngOnInit() {
    this.initializeForm();   
  }

  doesCurrentUserBelongtoProfile() {
    let current_user: any;
    current_user = this.authService.getActiveUser();

    if ( current_user.email === this.this_user.email ) {
      this.current_user_belongs_to_profile = true;
      this.this_user.email = current_user.email;
    }
  }

  initializeForm() {
    this.profile_FG = this.formBuilder.group({
      'name': new FormControl( '', Validators.required ),
      'email': new FormControl( '', Validators.required ),
    });
  }

  onSaveChanges() {
    alert( "Attempted Save Changes to User Profile.");
  }

}
