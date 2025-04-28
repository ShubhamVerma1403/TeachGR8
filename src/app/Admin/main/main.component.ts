import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TchStdRatingAll, TchStdRatingAllBOm } from '../../Model/TchStdRatingAll';
import { ApiServices } from '../../Services/api.services';
import { FormsModule } from '@angular/forms';
import { ClassSection } from '../../Model/Admin/ClassSection';
import { StudentTchRtByClass, StudentTchRtByClassBOm } from '../../Model/Admin/StudentTchRtByClass';
import { HostCommunicationService } from '../../Services/host-communication.services';
import { MainService } from '../../core/services/admin/main.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  filterAppiled:boolean =false ;
  classSection: ClassSection= {classSection:''}
  tchStdRtAll:TchStdRatingAll[] = [];
  StudentTchRtByClassList:StudentTchRtByClass[]=[]
  classes = Array.from({ length: 12 }, (_, i) => i + 1);
  sections = Array.from({ length: 2 }, (_, i) => String.fromCharCode(65 + i));

  selectedClass: number | string = '';
  selectedSection: string = '';

  constructor(private adminMain: MainService,private hostcomm:HostCommunicationService) { }

  ngOnInit(): void {
    this.GetAllTchStdRtList();
  }

  public GetAllTchStdRtList(){
    this.adminMain.GetAllTchStdRtList(true).subscribe({
      next: (data:TchStdRatingAll[] ) => {
          this.tchStdRtAll=data;
          this.hostcomm.setListofAllTchStdRt(data);
      },
      error: (error) => {
          console.log(error);
      }
    });
  }
  applyFilter(){
    if(this.selectedClass==''){
      this.selectedSection='';
      this.filterAppiled=false;
      return;
    }
    else if(this.selectedClass){
      if(this.selectedSection==''){
        this.selectedSection='A';
      }
      this.filterAppiled=true;
      this.classSection.classSection=this.selectedClass+this.selectedSection;
      this.adminMain.GetStudentTchRtByClass(this.classSection).subscribe({
      next: (data:StudentTchRtByClass[] ) => {
        if(data){
          this.StudentTchRtByClassList=data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
    }
  }
  editItem(tchStdRtAll:TchStdRatingAll){
    console.log(tchStdRtAll);
  }
}
