import {map, tap} from 'rxjs';
import {inject} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {CanActivateFn, Router} from '@angular/router';
import {isLoggedIn} from '../auth/auth.selectors';

export const redirectIfAuthenticatedGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.pipe(
    select(isLoggedIn),
    tap((loggedIn) => {
      if (loggedIn) {
        router.navigate(['/home']);
      }
    }),
    map((loggedIn) => !loggedIn)
  );
};
