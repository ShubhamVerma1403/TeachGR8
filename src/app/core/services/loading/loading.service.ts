import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  readonly isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  startLoading(): void {
    this.loadingCount++;
    if (this.loadingCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  // Stop loading for a specific key
  stopLoading(): void {
    this.loadingCount = Math.max(this.loadingCount - 1, 0);
    if (this.loadingCount === 0) {
      this.loadingSubject.next(false);
    }
  }

}
