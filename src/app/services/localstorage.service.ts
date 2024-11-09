import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T | null {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public removeItems(keys: string[]): void {
    keys.forEach(key => localStorage.removeItem(key));
  }

  public clear(): void {
    localStorage.clear();
  }
}
