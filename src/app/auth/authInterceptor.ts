import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export const authInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const xApnHeader = environment.APN;
  let authReq = req.clone({
    setHeaders: { 'X-APN': xApnHeader },
  });

  const tokenType = req.url.includes('/refresh-token')
    ? 'refreshToken'
    : 'accessToken';
  const accessToken = localStorage.getItem(tokenType);
  if (accessToken) {
    authReq = authReq.clone({
      setHeaders: { Authorization: `Bearer ${JSON.parse(accessToken)}` },
    });
  }

  return next(authReq);
};
