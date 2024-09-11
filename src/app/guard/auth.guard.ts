import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { isLoggedIn } from '../auth/auth.selectors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  return store.pipe(
    select(isLoggedIn),
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        return router.navigateByUrl('/');
      }
      return true;
    })
  );
};
