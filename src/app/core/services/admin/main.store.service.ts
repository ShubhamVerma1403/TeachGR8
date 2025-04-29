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


  private ListofAllTch = new BehaviorSubject<TeachersDetail[]>([]);
  ListofAllTch$ = this.ListofAllTch.asObservable();

  private loading$ = new BehaviorSubject<boolean>(false);

  constructor( private mainService: MainService ) { }

  setData(response: BehaviorSubject<TchStdRatingAll[]>){

  }

  // GetAllTchStdRtList(): Observable<TchStdRatingAll[]> {
  //   return this.tchStdRtAll.asObservable();
  // }

  GetListOfTeachers(): Observable<TeachersDetail[]> {
    if (!this.loading$.value && this.ListofAllTch.value.length === 0) {
      this.loading$.next(true);
      this.LoadListOfTeachers()
    }
    return this.ListofAllTch$;
  }

  LoadListOfTeachers(){
    this.mainService.GetListOfTeachers().subscribe({
      next: (data)=> {
        this.ListofAllTch.next(data);
        this.loading$.next(false);
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
        this.loading$.next(false);
      }
    })
  }

}
