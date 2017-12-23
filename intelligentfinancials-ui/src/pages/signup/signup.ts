import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Events } from 'ionic-angular';

import { User } from '../../providers/providers';
import { LoginPage, MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { firstname: string, lastname: string, username: string, password: string } = {
    firstname: 'Test',
    lastname: 'User',
    username: 'testuser',
    password: 'password'
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
  public events: Events) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    this.events.publish("loading:show", 'Signing you up...');
    this.user.signup(this.account)
    .then((resp) => {
      this.events.publish("loading:hide");
        this.events.publish("loading:show", 'Signup done. Logging in...');
        return this.user.login(this.account);
    })
    .then((resp) => {
      this.events.publish("loading:hide");
      this.navCtrl.push(MainPage);         
    })
    .catch((err) => {
      this.navCtrl.push(LoginPage);
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString +" | " +err.message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
