import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

constructor(public api: Api) {
    //Make these methods safe
}

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    //Create a promise to handle this as it is an asynchronous ttask
    let prom = new Promise((resolve, reject) => {
        let seq = this.api.post('users/login', accountInfo).share();

        seq.subscribe((res: any) => {
          console.log(res.status);
          // If the API returned a successful response, mark the user as logged in
          if (res.status == 'Login successful!') {
            this._loggedIn(res);
            resolve(res);
          } else {
            reject(res);
          }
        }, err => {
            reject(err);
        });
    });

    return prom;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    this.logout(); //logout anyone who is still there
    //Create a promise to handle this as it is an asynchronous ttask
    let prom = new Promise((resolve, reject) => {
        let seq = this.api.post('users/register', accountInfo).share();

        seq.subscribe((res: any) => {
          console.log(res.status);
          // If the API returned a successful response, mark the user as logged in
          if (res.status == 'Registration Successful!') {
              resolve(res);
            } else {
              reject(res);
            }
        }, err => {
          reject(err);
        });
    });

    return prom;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.api.resetauthtoken('');
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  private _loggedIn(resp) {
    this.api.resetauthtoken(resp.token);
    this._user = resp.user;
  }
}
