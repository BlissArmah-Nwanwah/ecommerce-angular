import {HttpResponse, HttpInterceptorFn} from '@angular/common/http';
import { switchMap, of } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../guard/auth.service';

export const validateInterceptor : HttpInterceptorFn = (req, next)  => {
  const authService = inject(AuthService);

  if (isExternalEndpoint(req.url)) {
    return authService.validateToken().pipe(
      switchMap((isValid: boolean) => {
        if (isValid) {
          return next(req);
        } else {
          return authService.refreshToken().pipe(
            switchMap((refreshSuccess: boolean) => {
              if (refreshSuccess) {
                return next(req);
              } else {
                return of(new HttpResponse({ status: 401, statusText: 'Unauthorized' }));
              }
            })
          );
        }
      })
    );
  }

  return next(req);
};

function isExternalEndpoint(url: string): boolean {
  return url.includes('fakestoreapi');
}
