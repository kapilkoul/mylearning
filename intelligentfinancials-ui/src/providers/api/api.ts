import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Settings } from '../settings/settings';
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://example.com/api/v1';
  authtoken: string = '';

constructor(public http: HttpClient, public settings: Settings) {
    //Load the settings first and then set the value
    this.settings.load().then(() => {
        let mySettings = this.settings.allSettings;
        this.url = mySettings['apiURL'];
        this.authtoken = mySettings['authtoken'];
    });
    //Make these method this safe
    this.resetauthtoken.bind(this);
    this.get.bind(this);
    this.post.bind(this);
    this.put.bind(this);
    this.delete.bind(this);
    this.patch.bind(this);
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    reqOpts = this.getHttpReqOptions(params, reqOpts);
    console.log('Getting at : ' + this.url + '/' + endpoint + '?' + JSON.stringify(reqOpts));
    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = this.getHttpReqOptions(null, reqOpts);
    console.log('Posting at : ' + this.url + '/' + endpoint + '?' + JSON.stringify(reqOpts));
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = this.getHttpReqOptions(null, reqOpts);
    console.log('Putting at : ' + this.url + '/' + endpoint + '?' + JSON.stringify(reqOpts));
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    reqOpts = this.getHttpReqOptions(null, reqOpts);
    console.log('Deleting at : ' + this.url + '/' + endpoint + '?' + JSON.stringify(reqOpts));
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = this.getHttpReqOptions(null, reqOpts);
    console.log('Patching at : ' + this.url + '/' + endpoint + '?' + JSON.stringify(reqOpts));
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
  
  resetauthtoken(token:string) {
    //Getting the value ensures we have a valid settings array even on first use
    this.authtoken = token;
    this.settings.setValue('authtoken', token);
  }

  private getHttpReqOptions(params?:any, reqOpts?:any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }
    //reqOpts['headers'] = (new HttpHeaders()).set('x-access-token', this.authtoken);
    return reqOpts;
  }
}
