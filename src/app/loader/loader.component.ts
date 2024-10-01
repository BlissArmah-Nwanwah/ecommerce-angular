import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit {
  public subjectTry = new Subject();
  public observableTry = new Observable((observer) => {
    observer.next(5);
    observer.next(6);
    observer.next(7);
    observer.complete();
  });

  public ngOnInit(): void {
    this.subjectTry.subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
      complete: () => console.log('complete'),
    });
    this.subjectTry.next(99);
    this.subjectTry.complete();
    this.observableTry.subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
      complete: () => console.log('complete'),
    });
  }
}
 