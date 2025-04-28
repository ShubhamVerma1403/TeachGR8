import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersDetail } from '../../Model/Admin/TeachersDetail';
import { ApiServices } from '../../Services/api.services';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { NewTeacher } from '../../Model/Admin/NewTeacher';
import { HostCommunicationService } from '../../Services/host-communication.services';
import { TeacherTotalRtByStd } from '../../Model/Admin/TeacherTotalRtByStd';
import { TchStdRatingAll, TchStdRatingAllBOm } from '../../Model/TchStdRatingAll';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-teacher-management',
    standalone: true,
    templateUrl: './teacher-management.component.html',
    styleUrl: './teacher-management.component.css',
    imports: [CommonModule, AddTeacherComponent]
})
export class TeacherManagementComponent implements OnInit,AfterViewInit{
  isSprintviewVisible: boolean = false;
  ListofTeachers:TeachersDetail[] = [];
  statusMessage: string = '';
  isError: boolean = false;
  tchStdRtAll:TchStdRatingAll[] = [];
  teacherTotalRtByStd: TeacherTotalRtByStd[] = [];
  selectedTeacher: TeacherTotalRtByStd={TeacherID:0,FullName:'',AverageRating:0};
  teacherDisplayed:TchStdRatingAll[]=[];

  @ViewChild('teacherModal') teacherModal!: AddTeacherComponent;

  constructor(private apiServices: ApiServices, private hostcomm: HostCommunicationService) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.ListofTeachersDetail();
  }

  public ListofTeachersDetail(){
    this.apiServices.GetListOfTeachers().subscribe({
      next: (data: TeachersDetail[] ) => this.ListofTeachers=data,
      error: (error) => console.log(error)
    });
  }

  async sprintRating() {
    this.isSprintviewVisible = !this.isSprintviewVisible;
    if (this.teacherTotalRtByStd && this.teacherTotalRtByStd.length > 0 && this.tchStdRtAll && this.tchStdRtAll.length > 0) {
      return;
    }
    try {
      const teacherTotalRtByStd = await lastValueFrom(this.apiServices.GetTeacherTotalRtByStd());
      const tchStdRtAll = await lastValueFrom(this.apiServices.GetAllTchStdRtList(true));

      if (teacherTotalRtByStd) {
        this.teacherTotalRtByStd = teacherTotalRtByStd;
      }
      if (tchStdRtAll) {
        this.tchStdRtAll = tchStdRtAll;
      }
      this.dataBind(); // Call dataBind after both requests are successful
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  }

  dataBind(){
    this.selectedTeacher = this.teacherTotalRtByStd[0];
    this.teacherDisplayed=this.filterdata(this.selectedTeacher,this.tchStdRtAll);
  }
  handleTeacherTotalRtByStdError(error: string) {

  }

  selectTeacher(teacher: TeacherTotalRtByStd) {
    this.selectedTeacher = teacher;
    this.teacherDisplayed=this.filterdata(teacher,this.tchStdRtAll);
  }
  filterdata(selectedTeacher: TeacherTotalRtByStd,tchStdRtAll:TchStdRatingAll[]){
    return tchStdRtAll.filter(x=>x.TecherID==selectedTeacher.TeacherID);
  }

  editItem(item: any) {
    console.log('Edit button clicked for:', item);
  }

  addTeacher() {
    this.teacherModal.openModal();
  }
  addNewTeacher(teacher: NewTeacher) {
    console.log('New student added:', teacher);
    this.apiServices.AddNewTeacher(teacher).subscribe({
      next: (data:any) => this.handleTeacherAddedSuccess(`Username: ${data.Username} added successfully`),
      error: (error:string) => this.handleTeacherAddedError(error)
    });
  }
  handleTeacherAddedSuccess(message: string): void {
    this.statusMessage = message;
    this.isError = false;
    this.ListofTeachersDetail();
    this.clearMessageAfterDelay()
  }
  handleTeacherAddedError(error: string): void {
    this.statusMessage = error;
    this.isError = true;
    this.clearMessageAfterDelay()
  }
  clearMessage() {
    this.statusMessage = '';
  }
  clearMessageAfterDelay() {
    setTimeout(() =>this.clearMessage(), 15000);
  }
  getInitials(fullName: string): string {
    if (!fullName) return '';
    const names = fullName.split(' ');
    const firstInitial = names[0] ? names[0].charAt(0).toUpperCase() : '';
    const lastInitial = names[1] ? names[1].charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  }






}

