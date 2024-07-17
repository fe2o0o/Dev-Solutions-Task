import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderserviceService {

  constructor() { }

  private isLoadingSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  isLoading$ = this.isLoadingSubject.asObservable()
  showLoading() {
    this.isLoadingSubject.next(true)
  }
  hideLoading() {
    this.isLoadingSubject.next(false)
  }


}
