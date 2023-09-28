import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from "rxjs/operators";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public router: Router
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('id') || '';
        if (token) {
            request = request.clone({
                headers: new HttpHeaders({
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                })
            });
        }
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {

                    }
                }
            ), catchError(err => {

                if ([401, 403].includes(err.status)) {
                    // 401: El Token no fue valido
                    // 403: El Usuario no tiene permisos
                    // this.router.navigateByUrl['/login']
                }
                const error = (err && err.error && err.error.message) || err.statusText;
                //console.error(err);
                return throwError(error);
            }))
    }
}