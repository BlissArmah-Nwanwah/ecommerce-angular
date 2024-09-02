import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private SearchData$ = new BehaviorSubject<string>('');
  public search$ = this.SearchData$.asObservable();

  constructor() {}

  getSearchData(search: string) {
    this.SearchData$.next(search);
  }
}
