import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTeacher } from '../../../Model/Admin/NewTeacher';
import { FormsModule, FormBuilder, FormGroup,ReactiveFormsModule, AbstractControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent implements OnInit {
  teacher:NewTeacher = { FirstName: '', LastName: '', Subject: '', Post: '', Phone: '', Email: '', Username: '', Password: ''}  ;
  isOpen = false;

  teacherForm!: FormGroup;
  constructor(private fb: FormBuilder) {  }

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Subject: ['', Validators.required],
      Post: ['', Validators.required],
      Phone: ['', Validators.required],
      Email: ['', Validators.required],
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  @Output()
  teacherAdded = new EventEmitter<NewTeacher>();

  // teacher = {
  //   FirstName: '',
  //   LastName: '',
  //   Subject: '',
  //   Post: '',
  //   Phone: '',
  //   Email: '',
  //   Username: '',
  //   Password: ''
  // };

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    // this.clearTeacherData();
    this.isOpen = false;
  }

  submitForm() {
    const teacherData = this.teacherForm.value;
    console.log(teacherData);
    console.log(this.teacher);
    this.teacherAdded.emit({ ...teacherData });
    // this.clearTeacherData() ;
    this.closeModal();
  }
  // clearTeacherData(){
  //   this.teacher = { FirstName: '', LastName: '', Subject: '', Post: '', Phone: '', Email: '', Username: '', Password: ''};
  // }
  // isFormValid(){
  //   return this.teacher.FirstName && this.teacher.LastName && this.teacher.Subject && this.teacher.Post && this.teacher.Phone && this.teacher.Email && this.teacher.Username && this.teacher.Password;
  // }
}
