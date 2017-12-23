import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Events } from 'ionic-angular';
 
@Injectable()
export class NotAuthInterceptor implements HttpInterceptor {
constructor(public events: Events) {
  }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        console.log('Authorised response');
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
          console.log('Unauthorised response');
          this.events.publish('user:unauthorised');
        }
      }
    });
  }
}