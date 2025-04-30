import { Injectable } from '@angular/core';
import { BaseApiService } from '../../base-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { TchStdRatingAll } from '../../../../Model/TchStdRatingAll';
import { ClassSection } from '../../../../Model/Admin/ClassSection';
import { StudentTchRtByClass } from '../../../../Model/Admin/StudentTchRtByClass';
import { TeachersDetail } from '../../../../Model/Admin/TeachersDetail';
import { NewTeacher } from '../../../../Model/Admin/NewTeacher';
import { NewAddedTeacher } from '../../../../Model/Admin/NewAddedTeacher';
import { TchmngtStoreService } from './tchmngt.store.service';

@Injectable({
  providedIn: 'root'
})
export class TchmngtService extends BaseApiService {

  constructor(protected override http: HttpClient, private tchmngtStoreService: TchmngtStoreService) {
      super(http);
    }
    GetListOfTeachers(): Observable<TeachersDetail[]> {
      if ( !this.tchmngtStoreService.hasData()) {
        super.get<TeachersDetail[]>('SchoolDataAdmin/GetListOfTeachers').subscribe({
          next: (data)=> {
            this.tchmngtStoreService.setData(data);
          },
          error: (error) => {
            console.error('Error loading teachers:', error);
            return throwError(() => new Error(error))
          }
        });
      }
      return this.tchmngtStoreService.getData();
    }

    private refreshTeacherList(): void {
      super.get<TeachersDetail[]>('SchoolDataAdmin/GetListOfTeachers').subscribe({
        next: (data) => {
          this.tchmngtStoreService.setData(data);
        }
      });
    }

    AddNewTeacher(teacher: NewTeacher){
      return super.post<NewAddedTeacher, NewTeacher>('UserAcc/AddTeacher', teacher).pipe(
        tap(()=>{
          this.refreshTeacherList();
        }));
    }
}


