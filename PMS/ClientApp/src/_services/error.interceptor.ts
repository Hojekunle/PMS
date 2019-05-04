import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    // intercept method from HttpInterceptor interface returns an Observable of type 'HttpEvent' which also is of type 'any'
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            // we use the rxjs Pipe method because we want to use rxjs's methods like catchError, throwError methods
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) { // handle model state errors 400: Bad Request
                        return throwError(error.statusText);
                    }
                    const applicationError = error.headers.get('Application-Error');
                    // throwError method is a type of Observable
                    if (applicationError) { // handle internal server errors 501
                        console.error(applicationError);
                        return throwError(applicationError);
                    }
                    const serverError = error.error;
                    let modalStateErrors = '';
                    if (serverError && typeof serverError === 'object') {
                        for (const key in serverError) {
                            if (serverError[key]) {
                                modalStateErrors += serverError[key] + '\n';
                            }
                        }
                    }
                    return throwError(modalStateErrors || serverError || 'Server Error');
                }
            })
        );
    }
}

// To make it registerable in app.module.ts
// Add custom interceptor named ErrorInterceptor to existing HttpInterceptors
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true // i.e do not replace existing HttpInterceptors but add to them
};