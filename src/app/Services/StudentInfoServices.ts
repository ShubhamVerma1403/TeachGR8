import { Injectable } from '@angular/core';
import { StudentInfo } from '../Model/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {
  private studentInfo: StudentInfo | null = null;

  setStudentInfo(info: StudentInfo) {
    this.studentInfo = info;
  }

  getStudentInfo(): StudentInfo | null {
    return this.studentInfo;
  }

  hasStudentInfo(): boolean {
    return this.studentInfo !== null;
  }
  clearStudentInfo() {
    this.studentInfo = null;
  }
}
