import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      console.log(error);

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      }
      else if (typeof error.error.message === 'string') {
        errorMessage = `Server Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
            errorMessage = 'Bad Request.';
            break;
          case 401:
            errorMessage = 'Unauthorized. Redirecting to login...';
            // this.storageService.removeToken(); // Remove invalid token
            // window.location.href = '/login';  // Redirect to login page
            break;
          case 403:
            errorMessage = 'Forbidden. You do not have access.';
            break;
          case 404:
            errorMessage = 'Resource not found.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = `Error: ${error.status} - ${error.message}`;
        }
      }

      alert(errorMessage); // Replace with snackbar/toast for better UX

      return throwError(() => new Error(errorMessage));
    })
  );
};
