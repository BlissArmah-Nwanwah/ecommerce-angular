import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { AuthActions } from './auth/action-types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'B-commerce';

   constructor(private store: Store<AppState>) {}

   ngOnInit(): void {
    const userProfile = localStorage?.getItem('user') ?? '';
    if (userProfile) {
      this.store.dispatch(AuthActions.login({ user: JSON.parse(userProfile) }));
    }
  }
}
