import { Component,OnInit } from "@angular/core";
// import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import {ApiServices} from '../../Services/api.services';
import { Student } from "../../Model/Student";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditRatingComponent } from "../edit-rating/edit-rating.component";
import { Teacher, TeacherBOm } from "../../Model/TeacherBom";
import { HostCommunicationService } from "../../Services/host-communication.services";

@Component({
  selector:'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl:'./main.component.css',
  imports: [CommonModule]

})
export class MainComponent implements OnInit{
  teachersRt: Teacher[] = [];
  Student: Student={UserID:0};
  constructor(
    private apiServices: ApiServices,
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    this.ListofTeachersforRt();
  }
  public ListofTeachersforRt(){
    this.Student.UserID=Number(sessionStorage.getItem('userID'));
    this.apiServices.ListofTeachersforRt(this.Student).subscribe({
      next: (data: TeacherBOm) => {
          this.teachersRt=data.ListOfTeacher;
      },
      error: (error) => {
          console.log(error);
      }
    });
  }

  editItem(teachersRt:Teacher){
    console.log(teachersRt);
    teachersRt.StudentID = Number (sessionStorage.getItem('userID'));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { teachersRt }
    this.dialogRef.open( EditRatingComponent,dialogConfig ).afterClosed().subscribe( newTeachersRt => {
      this.handleUpdateAndRefreshRating( newTeachersRt?.teach );
    });

  }
  private handleUpdateAndRefreshRating(updatedRating?: any) {
    if (updatedRating) {
        this.apiServices.UpdateTeacherRating( updatedRating ).subscribe({
            next: (data: any) => {
                if (data) {
                    console.log(data);
                }
                this.ListofTeachersforRt(); // Refresh on success
            },
            error: (error) => {
                console.log(error);
                // Handle errors appropriately
            }
        });
    }
}

}





