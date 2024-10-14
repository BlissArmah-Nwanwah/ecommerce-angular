import {Component, HostListener, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from './app.state';
import {AUTH_ACTIONS} from './auth/auth.actions';
import {selectAuthState} from "./auth/auth.selectors";
import {LocalStorageService} from "./services/localstorage.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'B-commerce';
  private authState = this.store.selectSignal(selectAuthState);

  constructor(private store: Store<AppState>, private localStorageService: LocalStorageService) {
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnload() {
    this.localStorageService.setItem('auth', JSON.stringify(this.authState()));
  }

  ngOnInit(): void {
    const userProfile = this.localStorageService.getItem('user') as string;
    if (userProfile) {
      this.store.dispatch(AUTH_ACTIONS.getAuthState(JSON.parse(userProfile)));
    }
  }
}
