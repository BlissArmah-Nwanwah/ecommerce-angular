import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private activeModalName = new BehaviorSubject<string | null>(null);

  public openModal(modalName: string) {
    this.activeModalName.next(modalName);
  }

  public closeModal() {
    this.activeModalName.next(null);
  }

  public getActiveModal() {
    return this.activeModalName.asObservable();
  }
}
