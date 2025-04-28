import { Component, ViewChild } from '@angular/core';
import { ApiServices } from '../../Services/api.services';
import { StudentsDetail } from '../../Model/Admin/StudentsDetail';
import { ClassSection } from '../../Model/Admin/ClassSection';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddStudentComponent } from './add-student/add-student.component';
import { lastValueFrom } from 'rxjs';
import { NewStudent } from '../../Model/Admin/NewStudent';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule,FormsModule,AddStudentComponent],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent {
  studentsDetail_List: StudentsDetail[] = [];
  classSection: ClassSection= {classSection:'1A'}
  classes = Array.from({ length: 12 }, (_, i) => i + 1);
  sections = Array.from({ length: 2 }, (_, i) => String.fromCharCode(65 + i));
  selectedClass: number | string = 1;
  selectedSection: string = 'A';
  statusMessage: string = '';
  isError: boolean = false;
  @ViewChild('studentModal') studentModal!: AddStudentComponent;

  constructor(private apiServices: ApiServices) { }

  ngOnInit(): void {
    this.ListofStudentsDetail();
  }
  ListofStudentsDetail() {
    this.apiServices.GetStudentListByClass(this.classSection).subscribe({
      next: (data: StudentsDetail[]) => this.studentsDetail_List = data,
      error: (error) => console.log(error)
    });
  }

  editItem(item: StudentsDetail) {
    console.log(item);

  }
  applyFilter(){
    this.classSection.classSection=this.selectedClass+this.selectedSection;
    this.ListofStudentsDetail();
  }
  addStudent(){
    this.studentModal.openModal();
  }
  addNewStudent(student: NewStudent) {
    console.log(student);
    this.apiServices.AddNewStudent(student).subscribe({
      next: (data:any) => this.handleStudentAddedSuccess(`Username: ${data.Username} added successfully`),
      error: (error) => this.handleStudentAddedError(error)
    });
  }
  handleStudentAddedSuccess(message: string): void {
    this.statusMessage = message;
    this.isError = false;
    this.ListofStudentsDetail();
    this.clearMessageAfterDelay()
  }
  handleStudentAddedError(error: string): void {
    this.statusMessage = error;
    this.isError = true;
    this.clearMessageAfterDelay()
  }
  clearMessage() {
    this.statusMessage = '';
  }
  clearMessageAfterDelay() {
    setTimeout(() =>this.clearMessage(), 3000);
  }
  // async ListofStudentsDetail() {
  //   try {
  //     const studentsDetail_List = await lastValueFrom(this.apiServices.GetStudentListByClass(this.classSection));

  //     if (studentsDetail_List) {
  //       this.studentsDetail_List = studentsDetail_List;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // Handle error appropriately
  //   }
  // }



}
