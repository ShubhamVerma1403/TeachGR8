import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TeachersDetail } from '../../../../Model/Admin/TeachersDetail';
import { MainService } from '../main.service';
import { TchmngtService } from './tchmngt.service';
import { NewTeacher } from '../../../../Model/Admin/NewTeacher';
import { NewAddedTeacher } from '../../../../Model/Admin/NewAddedTeacher';

@Injectable({
  providedIn: 'root'
})
export class TchmngtStoreService {

  private ListofAllTch = new BehaviorSubject<TeachersDetail[]>([]);
  private ListofAllTch$ = this.ListofAllTch.asObservable();

  constructor( ) { }

  setData(data: TeachersDetail[]) {
    this.ListofAllTch.next(data);
  }
  getData(): Observable<TeachersDetail[]> {
    return this.ListofAllTch$;
  }

  hasData(): boolean {
    return this.ListofAllTch.value.length > 0;
  }
}
