import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Schedule } from '../../Model/Admin/Schedule';
import { lastValueFrom } from 'rxjs';
import { ApiServices } from '../../Services/api.services';
import { FilterRatingComponent } from "./filter-rating/filter-rating.component";
import { TotalRatingComponent } from "./total-rating/total-rating.component";
import { ScheduleComponent } from "./schedule/schedule.component";
import { RatingFilter } from '../../Model/Admin/RatingFilter';
import { TchStdRatingAll, TchStdRatingAllBOm } from '../../Model/TchStdRatingAll';
import { TeacherTotalRtByStd } from '../../Model/Admin/TeacherTotalRtByStd';
import { TeacherTotalRatingCommentsFilter } from '../../Model/Admin/TeacherTotalRatingCommentsFilter';
import { ActiveFilterData } from '../../Model/Admin/ActiveFilterData';

@Component({
  selector: 'app-rating-management',
  standalone: true,
  imports: [MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, FormsModule, CommonModule, FilterRatingComponent, TotalRatingComponent,ScheduleComponent],
  templateUrl: './rating-management.component.html',
  styleUrl: './rating-management.component.css'
})
export class RatingManagementComponent {
  selectedComponent: string = 'CurrentRating';
  filterData: RatingFilter[] = [];
  activeFilterData: ActiveFilterData = {ActiveYear:'',ActiveSession:0,ActiveSprint:0};
  years: string[] = [];
  sessions: number[] = [];
  sprints: number[] = [];
  teacherTotalRatingComments: TeacherTotalRatingCommentsFilter[] = [];
  tchStdRtAll:TchStdRatingAll[] = [];
  topTeacherOtSession: TeacherTotalRatingCommentsFilter[] = [];


  constructor(private apiServices: ApiServices ) { }

  async ngOnInit(): Promise<void> {
    const filterData = await lastValueFrom(this.apiServices.GetFilterData());
    const activeFilterData = await lastValueFrom(this.apiServices.GetActiveYear());
    if (filterData) {
      this.filterData = filterData;
    }
    if (activeFilterData) {
      this.activeFilterData = activeFilterData;
    }
  }


  showComponent(component: string): void {
    this.selectedComponent = component;
  }

  async GetTeacherTotalRatingCommentsFilter(ratingFilter: RatingFilter): Promise<void> {

    const teacherTotalRatingComments = await lastValueFrom(this.apiServices.GetTeacherTotalRatingCommentsFilter(ratingFilter));
    var tchStdRtAll:TchStdRatingAll[] = [];
    if(ratingFilter.Years == this.activeFilterData.ActiveYear && ratingFilter.Sessions == this.activeFilterData.ActiveSession && ratingFilter.Sprints == this.activeFilterData.ActiveSprint){
      tchStdRtAll = await lastValueFrom(this.apiServices.GetAllTchStdRtList(true));
    }
    else {
      tchStdRtAll = await lastValueFrom(this.apiServices.GetAllTchStdRtList(false));
    }
    var topTeacherOtSession = await lastValueFrom(this.apiServices.GetTopTeacherOtSession(ratingFilter));
    if (teacherTotalRatingComments && tchStdRtAll && topTeacherOtSession) {
      this.teacherTotalRatingComments = teacherTotalRatingComments
      this.tchStdRtAll = tchStdRtAll;
      this.topTeacherOtSession = topTeacherOtSession;
    }
  }

  // async GetTeacherTotalRatingFilter(ratingFilter: RatingFilter): Promise<void> {
  //   const teacherTotalRating = await lastValueFrom(this.apiServices.GetTeacherTotalRatingFilter(ratingFilter));
  //   if (teacherTotalRating) {
  //     this.teacherTotalRatingComments = teacherTotalRatingComments;
  //   }
  // }
}
