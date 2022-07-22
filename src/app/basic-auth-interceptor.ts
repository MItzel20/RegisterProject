import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
  } from "@angular/common/http";
  import { Injectable } from "@angular/core";
  import {  Router } from "@angular/router";
  import { Observable, of } from "rxjs";
  import { catchError } from "rxjs/operators";
  
  @Injectable()
  export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    private token: string = "";
    private handleAuthError(err: HttpErrorResponse): Observable<any> {
      if (err.status === 403 || err.status === 0) {
        return of(err.message);
      }
      throw err.error;
    }
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      this.token = localStorage.getItem("token");
      if (this.token != "" && this.token != null) {
        request = request.clone({
          setHeaders: {
            Authorization: "bearer " + this.token,
            "Content-Type": "application/json; charset=utf-8"
          }
        });
      } else {
        request = request.clone();
      }
      return next.handle(request).pipe(catchError((error, caught) => {
        this.handleAuthError(error);
        return of(error);
      }) as any);
    }
  }
  