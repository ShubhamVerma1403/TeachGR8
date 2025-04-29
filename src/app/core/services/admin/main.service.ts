import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { HttpClient } from '@angular/common/http';
import { TchStdRatingAll } from '../../../Model/TchStdRatingAll';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MainStoreService } from './main.store.service';
import { ClassSection } from '../../../Model/Admin/ClassSection';
import { StudentTchRtByClass } from '../../../Model/Admin/StudentTchRtByClass';
import { TeachersDetail } from '../../../Model/Admin/TeachersDetail';

@Injectable({
  providedIn: 'root'
})
export class MainService extends BaseApiService {

  private tchStdRtAll = new BehaviorSubject<TchStdRatingAll[]>([]);

  constructor(protected override http: HttpClient) {
    super(http);
  }
  GetAllTchStdRtList(isWIP: boolean): Observable<TchStdRatingAll[]> {
    return super.post<TchStdRatingAll[]>('SchoolData/GetAllTchStdRtList', {isWIP: isWIP});
  }
  GetStudentTchRtByClass(classSection: ClassSection): Observable<StudentTchRtByClass[]> {
    return super.post<StudentTchRtByClass[]>('SchoolDataAdmin/GetStudentTchRtByClass', classSection);
  }

  GetListOfTeachers(): Observable<TeachersDetail[]> {
    return super.get<TeachersDetail[]>('SchoolDataAdmin/GetListOfTeachers');
  }
}
