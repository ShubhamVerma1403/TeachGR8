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

  constructor(protected override http: HttpClient) {
    super(http);
  }
  GetAllTchStdRtList(isWIP: boolean): Observable<TchStdRatingAll[]> {
    return super.post<TchStdRatingAll[], { isWIP: boolean }>('SchoolData/GetAllTchStdRtList', {isWIP: isWIP});
  }
  GetStudentTchRtByClass(classSection: ClassSection): Observable<StudentTchRtByClass[]> {
    return super.post<StudentTchRtByClass[], ClassSection>('SchoolDataAdmin/GetStudentTchRtByClass', classSection);
  }

}
