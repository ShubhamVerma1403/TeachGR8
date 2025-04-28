import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { RatingFilter } from '../../../Model/Admin/RatingFilter';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherTotalRtByStd } from '../../../Model/Admin/TeacherTotalRtByStd';
import { TchStdRatingAll } from '../../../Model/TchStdRatingAll';
import { TeacherTotalRatingCommentsFilter } from '../../../Model/Admin/TeacherTotalRatingCommentsFilter';
import { ActiveFilterData } from '../../../Model/Admin/ActiveFilterData';

@Component({
  selector: 'app-filter-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-rating.component.html',
  styleUrl: './filter-rating.component.css'
})
export class FilterRatingComponent {

  @Input() filterdata: RatingFilter[] = [];
  @Input() activeFilterData: ActiveFilterData = {ActiveYear:'',ActiveSession:0,ActiveSprint:0};
  @Input() teacherTotalRatingComments: TeacherTotalRatingCommentsFilter[] = [];
  @Input() tchStdRtAll:TchStdRatingAll[] = [];
  years: string[] = [];
  sessions: number[] = [];
  sprints: number[] = [];
  selectedYear: string|null = null;
  selectedSession: number|null = null;
  selectedSprint: number|null = null;
  selectedTeacher: TeacherTotalRatingCommentsFilter={TeacherID:0,FirstName:'',LastName:'',AverageRating:0};
  teacherDisplayed:TchStdRatingAll[]=[];
  @Output()
  teacherAdded = new EventEmitter<RatingFilter>();





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

    if (changes['teacherTotalRatingComments']) {
      this.dataBind();
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
  dataBind(){
    this.selectedTeacher = this.teacherTotalRatingComments[0];
    this.teacherDisplayed=this.filterr(this.selectedTeacher,this.tchStdRtAll);
  }

  filterr(selectedTeacher: TeacherTotalRatingCommentsFilter,tchStdRtAll:TchStdRatingAll[]){
    return tchStdRtAll.filter(x=>x.TecherID==selectedTeacher.TeacherID);
  }

  selectTeacher(teacher: TeacherTotalRatingCommentsFilter) {
    this.selectedTeacher = teacher;
    this.teacherDisplayed=this.filterr(teacher,this.tchStdRtAll);
  }
  getInitials(FirstName: string, LastName: string): string {
    return FirstName.charAt(0).toUpperCase() + LastName.charAt(0).toUpperCase();
  }
  getInitialsFromName(fullName: string): string {
    if (!fullName) return '';
    const names = fullName.split(' ');
    const firstInitial = names[0] ? names[0].charAt(0).toUpperCase() : '';
    const lastInitial = names[1] ? names[1].charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  }

}
