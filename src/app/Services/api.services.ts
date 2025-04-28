import {Injectable} from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { Student, StudentInfo } from '../Model/Student';
import { LoggedInUser, UserLogin } from '../Model/UserLogin';
import { Teacher, TeacherBOm } from '../Model/TeacherBom';
import { TchStdRatingAll, TchStdRatingAllBOm } from '../Model/TchStdRatingAll';
import { ClassSection } from '../Model/Admin/ClassSection';
import { StudentTchRtByClassBOm } from '../Model/Admin/StudentTchRtByClass';
import { TeachersDetail } from '../Model/Admin/TeachersDetail';
import { NewTeacher } from '../Model/Admin/NewTeacher';
import { TeacherTotalRtByStd } from '../Model/Admin/TeacherTotalRtByStd';
import { StudentsDetail } from '../Model/Admin/StudentsDetail';
import { NewStudent } from '../Model/Admin/NewStudent';
import { Schedule } from '../Model/Admin/Schedule';
import { RatingFilter } from '../Model/Admin/RatingFilter';
import { TeacherTotalRatingCommentsFilter } from '../Model/Admin/TeacherTotalRatingCommentsFilter';
import { ActiveFilterData } from '../Model/Admin/ActiveFilterData';




@Injectable({
  providedIn:'root'
})


export class ApiServices{
  constructor(private http : HttpClient){

  }

  private apiEndPoint='https://teachr8-cwhddgffcuemasfr.centralus-01.azurewebsites.net/api/'

  getData(path:string): Observable<any[]>{
    return this.http.get<any[]>(this.apiEndPoint+path);
  }

  userLogin(loginobj:UserLogin):Observable<LoggedInUser>{

    return this.http.post<LoggedInUser>(this.apiEndPoint+'UserAcc/Login', loginobj);
  }

  ListofTeachersforRt(Student: Student){
    return this.http.post<TeacherBOm>(this.apiEndPoint+'SchoolData/ListofTeachersforRt', Student);
  }

  UpdateTeacherRating(teacher:Teacher){
    return this.http.post(this.apiEndPoint+'SchoolData/UpdateTeacherRatingByStd', teacher);
  }

  getStudentInfo(Student: Student){
    return this.http.post<StudentInfo>(this.apiEndPoint+'SchoolData/GetStudentInfoByID', Student);
  }

  GetAllTchStdRtList(isWIP: boolean){
    return this.http.post<TchStdRatingAll[]>(this.apiEndPoint+'SchoolData/GetAllTchStdRtList', {isWIP: isWIP});
  }
  GetStudentTchRtByClass(classSection: ClassSection){
    return this.http.post<StudentTchRtByClassBOm>(this.apiEndPoint+'SchoolDataAdmin/GetStudentTchRtByClass',classSection);
  }
  GetListOfTeachers(){
    return this.http.get<TeachersDetail[]>(this.apiEndPoint+'SchoolDataAdmin/GetListOfTeachers');
  }
  AddNewTeacher(teacher: NewTeacher){
    return this.http.post(this.apiEndPoint+'UserAcc/AddTeacher',teacher).pipe(
      catchError(this.handleError)
    );
  }

  GetTeacherTotalRtByStd(){
    return this.http.get<TeacherTotalRtByStd[]>(this.apiEndPoint+'SchoolDataAdmin/GetTeacherTotalRtByStd');
  }
  GetStudentListByClass(classSection: ClassSection){
    return this.http.post<StudentsDetail[]>(this.apiEndPoint+'SchoolDataAdmin/GetStudentListByClass',classSection).pipe(
      catchError(this.handleError)
    );
  }
  AddNewStudent(studetnt: NewStudent){
    return this.http.post(this.apiEndPoint+'UserAcc/AddStudent',studetnt).pipe(
      catchError(this.handleError)
    );
  }
  SaveSchedule(schedule: Schedule){
    return this.http.post(this.apiEndPoint+'SchoolDataAdmin/SaveSchedule',schedule).pipe(
      catchError(this.handleError)
    );
  }
  GetFilterData(){
    return this.http.get<RatingFilter[]>(this.apiEndPoint+'SchoolDataAdmin/GetFilterData');
  }
  GetTeacherTotalRatingCommentsFilter(ratingFilter: RatingFilter){
    return this.http.post<TeacherTotalRatingCommentsFilter[]>(this.apiEndPoint+'SchoolDataAdmin/GetTeacherTotalRatingCommentsFilter',ratingFilter).pipe(
      catchError(this.handleError)
    );
  }

  GetActiveYear(){
    return this.http.get<ActiveFilterData>(this.apiEndPoint+'SchoolDataAdmin/GetActiveYear').pipe(
      catchError(this.handleError)
    );
  }
  GetTopTeacherOtSession(ratingFilter: RatingFilter){
    return this.http.post<TeacherTotalRatingCommentsFilter[]>(this.apiEndPoint+'SchoolDataAdmin/GetTopTeacherOtSession',ratingFilter).pipe(
      catchError(this.handleError)
    );
  }
  DataMigration(){
    return this.http.get(this.apiEndPoint+'SchoolDataAdmin/DataMigration').pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if(error.status==500){
        errorMessage =  error.error.Message;
      }
      else if(error.status==0){
        errorMessage =  'Connection Refused, Server not found';
      }
      else{
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }

    }
    return throwError(() => new Error(errorMessage));
  }

}
