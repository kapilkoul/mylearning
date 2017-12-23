import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Events } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, password: string } = {
    username: 'testuser',
    password: 'password'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public events: Events) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.events.publish("loading:show", 'Logging in...');
    this.user.login(this.account)
    .then((resp) => {
      this.events.publish("loading:hide");
      this.navCtrl.push(MainPage);
    })
    .catch((err) => {
      this.events.publish("loading:hide");
      //Pushing back to login page
      this.navCtrl.push(LoginPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString+" | " + err.message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
