/* eslint-disable @typescript-eslint/naming-convention */
import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { productReducer, ProductState } from './products/product.reducers';

export interface User {
  login_token: string | undefined;
  refresh_token: string | undefined;
  isLoading: boolean;
  error: string | undefined;
  message: string | undefined;
}

export interface AppState {
  auth: User;
  goods: ProductState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  goods: productReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
