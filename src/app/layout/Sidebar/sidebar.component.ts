import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostCommunicationService } from '../../Services/host-communication.services';
import { ApiServices } from '../../Services/api.services';
import { Student, StudentInfo } from '../../Model/Student';
import { StudentInfoService } from '../../Services/StudentInfoServices';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Constants } from '../../utils/constants/constant';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(-100%)'
      })),
      transition('in <=> out', animate('300ms ease-in-out'))
    ])
  ]
})
export class SidebarComponent implements OnInit{
  student: Student={UserID:0};
  studentInfo: StudentInfo | null = null;
  isVisiblee = false;

  constructor(
    private apiServices: ApiServices,
    private hostComm: HostCommunicationService,
    private studentInfoService: StudentInfoService
  ) { }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if(this.hostComm.isSidebarVisibleState() === false) return;
    const target = event.target as HTMLElement;
    if (!target.closest('.sidebar') && !target.closest('.menu-icon') ) {
      this.hostComm.toggleSidebar();
    }
  }
  closeSidebar() {
    this.hostComm.toggleSidebar();
  }
  isVisible(){
    return this.hostComm.isSidebarVisibleState();
  }

  ngOnInit() {
      this.fetchStudentInfo();
    }

  fetchStudentInfo() {
    if (this.studentInfoService.hasStudentInfo()) {
      let cachedInfo = this.studentInfoService.getStudentInfo();
      if (cachedInfo) {
        this.studentInfo = cachedInfo;
      }
      return;
    }

    this.student.UserID=Number(sessionStorage.getItem(Constants.USER_ID));
    this.apiServices.getStudentInfo(this.student).subscribe({
      next: (data: StudentInfo) => {
        if(data){
          console.log(data);
          this.studentInfoService.setStudentInfo(data);
          this.studentInfo=data;
        }
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
