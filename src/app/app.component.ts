import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'B-commerce';

  constructor(private localStorageService: LocalStorageService) {}

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnload(): void {
    this.localStorageService.persistState();
  }

  ngOnInit(): void {
    this.localStorageService.initializeState();
  }
}
