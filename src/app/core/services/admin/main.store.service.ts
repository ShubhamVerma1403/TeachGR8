import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TchStdRatingAll } from '../../../Model/TchStdRatingAll';

@Injectable({
  providedIn: 'root'
})
export class MainStoreService {

  private tchStdRtAll = new BehaviorSubject<TchStdRatingAll[]>([]);

  constructor() { }

  setData(response: BehaviorSubject<TchStdRatingAll[]>){

  }
}
