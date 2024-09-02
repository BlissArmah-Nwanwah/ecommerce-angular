import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { isLoggedIn } from '../auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private store: Store, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.pipe(
      select(isLoggedIn),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          return this.router.createUrlTree(['/login']);
        }
        return true
      })
    );
  }
}
