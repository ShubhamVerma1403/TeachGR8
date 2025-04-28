import { Injectable } from "@angular/core";
import { NewTeacher } from "../Model/Admin/NewTeacher";
import { ApiServices } from "./api.services";
import { TeacherManagementComponent } from "../Admin/teacher-management/teacher-management.component";
import { BehaviorSubject } from "rxjs";
import { TchStdRatingAll } from "../Model/TchStdRatingAll";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class HostCommunicationService {
  private isSidebarVisible = false;
  private ListofAllTchStdRt: TchStdRatingAll[]=[]
  private teacherAddedSubject = new BehaviorSubject<string>('');
  constructor(private router: Router
  ) {}

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  isSidebarVisibleState() {
    return this.isSidebarVisible;
  }
  ClearSidebarState() {
    this.isSidebarVisible = false;
  }

  setListofAllTchStdRt(data: TchStdRatingAll[]){
    this.ListofAllTchStdRt = data;
  }
  getListofAllTchStdRt(){
    return this.ListofAllTchStdRt;
  }

  handleUserRoleRedirect(userRole: string) {
    switch (userRole) {
      case 'T':
        this.router.navigateByUrl('Teacher');
        break;
      case 'S':
        this.router.navigateByUrl('Student');
        break;
      case 'A':
        this.router.navigateByUrl('Admin');
        break;
      default:
        this.router.navigateByUrl('login');
        console.error('Unknown user role:', userRole);
        break;
    }
  }
}
