import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TchStdRatingAll } from '../../../Model/TchStdRatingAll';
import { MainService } from './main.service';
import { TeachersDetail } from '../../../Model/Admin/TeachersDetail';

@Injectable({
  providedIn: 'root'
})
export class MainStoreService {

  private tchStdRtAll = new BehaviorSubject<TchStdRatingAll[]>([]);
  tchStdRtAll$ = this.tchStdRtAll.asObservable();


  constructor( private mainService: MainService ) { }


}
