import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
   } from '@angular/common/http';
   import { Observable, throwError } from 'rxjs';
   import { retry, catchError } from 'rxjs/operators';
   
   export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const idToken = localStorage.getItem("bearerToken");
      if(idToken)
      {
        const cloned = request.clone({
          setHeaders: {
            Authorization: 'Bearer '+idToken
          }
        });
        return next.handle(cloned)
      }
      return next.handle(request)
        .pipe(
          //retry(1),
          catchError((error: HttpErrorResponse) => {
            // let errorMessage = '';
            // if (error.error instanceof ErrorEvent) {
            //   // client-side error
            //   errorMessage = `error: ${error.error}`;
            // } else {
            //   // server-side error
            //   errorMessage = `status: ${error.status}\nmessage: ${error.message}\nerror: ${JSON.stringify(error.error)}`;
            // }            
            return throwError(error);
          })
        )
    }
   }