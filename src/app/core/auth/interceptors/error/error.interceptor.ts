import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      let message = '';

      if (err.error?.error) {
        message = err.error.error;

      } else if (err.error?.message) {

        message = err.error.message;
        
      } else {
        message = 'An unexpected error occurred.';
      }

      console.error('Erro interceptado:', err);

      return throwError(() => ({ message: message, status: err.error.statusCode }));
    })
  );
};
