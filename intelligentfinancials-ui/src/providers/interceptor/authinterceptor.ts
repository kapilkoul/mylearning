import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Settings} from '../settings/settings';
import {Events } from 'ionic-angular';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private settings: Settings, public events: Events) {
  }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.fromPromise (this.settings.getValue('authtoken')).mergeMap (authtoken => {
        
            if( authtoken == undefined || authtoken == null) {
                console.log('notoken found');
                this.events.publish('user:notoken');
                return next.handle(req);
            }
        
            console.log("Adding token to request:" + authtoken);
            // Clone the request to add the new header.
        
            const authReq = req.clone({headers: req.headers.set('x-access-token', authtoken)});
            // Pass on the cloned request instead of the original request.
            return next.handle(authReq);
    });
  }
}