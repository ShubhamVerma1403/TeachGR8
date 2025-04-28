import { Component } from '@angular/core';
import { HeaderComponent } from "../layout/header/header.component";
import { MainComponent } from "./Main/main.component";
import { SidebarComponent } from "../layout/Sidebar/sidebar.component";
import { HostCommunicationService } from '../Services/host-communication.services';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-students',
    standalone: true,
    templateUrl: './students.component.html',
    styleUrl: './students.component.css',
    imports: [HeaderComponent, SidebarComponent,CommonModule,RouterOutlet]
})
export class StudentsComponent {
  // isSidebarOpen = false;

  constructor(private hostComm: HostCommunicationService) { }

  // toggleSidebar() {
  //   this.isSidebarOpen = !this.isSidebarOpen;
  // }

  // closeSidebar() {
  //   this.isSidebarOpen = false;
  // }
  isVisible(){
    return this.hostComm.isSidebarVisibleState();
  }
}
