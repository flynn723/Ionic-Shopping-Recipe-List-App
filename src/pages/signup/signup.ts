import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	constructor(
		private authService: AuthService,
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController ) {

	}

	onSignup(form: NgForm) {
		// console.log(form.value);
		const loading = this.loadingCtrl.create({
			content: 'Signing you up...'
		});
		loading.present();
		this.authService.signup(form.value.email, form.value.password)
			.then( (data) => {
				loading.dismiss();
				console.log(data);
			})
			.catch( (err) => {
				loading.dismiss();
				console.log(err);
				const alert = this.alertCtrl.create({
						title: 'Signup failed!',
						message: err.message,
						buttons: ['Ok']
					});
				alert.present();
			});
	}

}
