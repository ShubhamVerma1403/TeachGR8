import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TchStdRatingAll } from '../../../Model/TchStdRatingAll';
import { RatingFilter } from '../../../Model/Admin/RatingFilter';
import { ActiveFilterData } from '../../../Model/Admin/ActiveFilterData';
import { TeacherTotalRatingCommentsFilter } from '../../../Model/Admin/TeacherTotalRatingCommentsFilter';

@Component({
  selector: 'app-total-rating',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './total-rating.component.html',
  styleUrl: './total-rating.component.css'
})
export class TotalRatingComponent {
  years: string[] = [];
  sessions: number[] = [];
  sprints: number[] = [];
  selectedYear: string|null = null;
  selectedSession: number|null = null;
  selectedSprint: number|null = null;
  tchStdRtAll:TchStdRatingAll[] = [];
  @Input() teacherTotalRating: TeacherTotalRatingCommentsFilter[] = [];
  @Input() filterdata: RatingFilter[] = [];
  @Input() activeFilterData: ActiveFilterData = {ActiveYear:'',ActiveSession:0,ActiveSprint:0};
  @Input() topTeacherOtSession: TeacherTotalRatingCommentsFilter[] = [];

  @Output() teacherAdded = new EventEmitter<RatingFilter>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterdata'] && this['filterdata'].length > 0) {
      this.years = this.filterdata.map(x => x.Years);
    }
    if (changes['activeFilterData']) {
      this.selectedYear = this.activeFilterData.ActiveYear;
      this.setSessionSprint();
      this.selectedSession = this.activeFilterData.ActiveSession;
      this.selectedSprint = this.activeFilterData.ActiveSprint;
      this.getData();
    }
  }

  onYearChange(){
    this.selectedSession  = null;
    this.selectedSprint  = null;
    this.setSessionSprint();
    this.getData();
  }
  setSessionSprint(){
    if(this.selectedYear){
      const yearData=this.filterdata.find(x => x.Years === this.selectedYear)
      if(yearData){
        this.sessions = Array.from({ length: yearData.Sessions }, (_, i) => i + 1);
        this.sprints = Array.from({ length: this.filterdata[0].Sprints }, (_, i) => i + 1);
      }
    }
  }
  onSessionChange(){
    this.selectedSprint  = null;
    if(this.selectedSession){
      const sessionData=this.filterdata.find(x => x.Sessions === this.selectedSession)
      if(sessionData){
        this.sprints = Array.from({ length: sessionData.Sprints }, (_, i) => i + 1);
      }
    }
    this.getData()
  }
  onSprintChange(){
    this.getData();
  }
  getData() {
    if(this.selectedYear && this.selectedSession && this.selectedSprint){
      const data: RatingFilter = { Years: this.selectedYear, Sessions: this.selectedSession, Sprints: this.selectedSprint };
      this.teacherAdded.emit({ ...data });
    }
  }
}
