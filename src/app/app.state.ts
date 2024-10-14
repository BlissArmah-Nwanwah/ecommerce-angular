import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { productReducer, ProductState } from './products/product.reducers';

export interface User {
  login_token: string | null;
  refresh_token: string | null;
  isLoading: boolean;
  error: string | null;
  message: string | null;

}

export interface AppState {
  auth: User;
  goods:ProductState
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  goods: productReducer
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
