import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewStudent } from '../../../Model/Admin/NewStudent';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  isOpen = false;
  student: NewStudent = { FirstName: '', LastName: '', Class: '',Roll_No:null, Phone: '', Email: '', Username: '', Password: '' };
  @Output()
  studentAdded = new EventEmitter<NewStudent>();
  constructor() { }

  openModal() {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
    this.clearStudentData()
  }
  clearStudentData(){
    this.student = { FirstName: '', LastName: '', Class: '', Roll_No: null, Phone: '', Email: '', Username: '', Password: ''};
  }

  isFormValid(){
    return this.student.FirstName && this.student.LastName && this.student.Class && this.student.Roll_No && this.student.Phone && this.student.Email && this.student.Username && this.student.Password;
  }
  submitForm() {
    this.studentAdded.emit({ ...this.student });
    this.clearStudentData() ;
    this.closeModal();
  }

}
