import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("usr")
    if (token) {
      let newReq = request.clone({headers: request.headers.set('Authorization', token)})
      return next.handle(newReq);
    } else {
      return next.handle(request);
    }


  }
}
