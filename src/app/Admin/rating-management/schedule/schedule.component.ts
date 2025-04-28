import { Component } from '@angular/core';
import { Schedule } from '../../../Model/Admin/Schedule';
import { lastValueFrom } from 'rxjs';
import { ApiServices } from '../../../Services/api.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {

  scheduleDurations: number[] | null= null;
  sprintDurations: number[] | null= null;
  sessionSchedule: Schedule = {scheduleType:"SS", startDate: null, endDate: null, duration: null };
  sprintSchedule: Schedule = { scheduleType: "SP", startDate: null, endDate: null, duration: null };

  constructor(private apiServices: ApiServices ) {
    this.scheduleDurations = Array.from({ length: 12 }, (_, i) => i + 1);
  }

  updateSessionEndDate(): void {
    if (this.sessionSchedule.startDate && this.sessionSchedule.duration !== null) {
      const startDate = new Date(this.sessionSchedule.startDate);
      const duration = Number(this.sessionSchedule.duration);

      if (!isNaN(startDate.getTime())) {
        startDate.setMonth(startDate.getMonth() + duration);
        this.sessionSchedule.endDate = startDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
      }
    } else {
      this.sessionSchedule.endDate = ''; // Reset endDate if startDate or duration is invalid
    }


    // Update sprint durations
    if (this.sessionSchedule.duration !== null) {
      this.sprintSchedule.startDate= this.sessionSchedule.startDate;
      this.sprintDurations = Array.from({ length: this.sessionSchedule.duration }, (_, i) => i + 1);
    }
  }
  updateSprintEndDate(){
    if(this.sprintSchedule.startDate && this.sprintSchedule.duration !== null){
      const startDate = new Date(this.sprintSchedule.startDate);
      const duration = Number(this.sprintSchedule.duration);
      if (!isNaN(startDate.getTime())){
        startDate.setMonth(startDate.getMonth() + duration);
        this.sprintSchedule.endDate= startDate.toISOString().split('T')[0];
      }
    }
    else {
      this.sprintSchedule.endDate = ''; // Reset endDate if startDate or duration is invalid
    }
  }
  async saveSchedule(){
    try {
      await lastValueFrom(this.apiServices.SaveSchedule(this.sessionSchedule));
      await lastValueFrom(this.apiServices.SaveSchedule(this.sprintSchedule));
    } catch (error) {
      console.log(error);
    }
  }

  async DataMigration(){
    try {
      await lastValueFrom(this.apiServices.DataMigration());
    } catch (error) {
      console.log(error);
    }
  }
}
