import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommonModule }  from '@angular/common';
import { HostCommunicationService } from '../../Services/host-communication.services';
import { StudentInfoService } from '../../Services/StudentInfoServices';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private hostComm: HostCommunicationService,
    private studentInfoService: StudentInfoService
  ) { }
  public Logout(){
    sessionStorage.setItem('userRole','');
    sessionStorage.setItem('userName','');
    this.studentInfoService.clearStudentInfo();
    this.hostComm.ClearSidebarState();
    this.router.navigateByUrl('login');
  }
  toggleSidebar() {
    this.hostComm.toggleSidebar();
  }
  isVisible(){
    return this.hostComm.isSidebarVisibleState();
  }
}
