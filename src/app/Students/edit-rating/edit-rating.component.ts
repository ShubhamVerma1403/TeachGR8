import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {FormsModule }from '@angular/forms';
import { Teacher } from '../../Model/TeacherBom';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-edit-rating',
  standalone: true,
  imports: [FormsModule, DragDropModule, CommonModule],
  templateUrl: './edit-rating.component.html',
  styleUrl: './edit-rating.component.css'
})
export class EditRatingComponent {
  teach:Teacher;
  constructor(
    public dialogRef: MatDialogRef<any, any>, @Inject(MAT_DIALOG_DATA) public data:{teachersRt: Teacher}){
      this.teach={ ...this.data.teachersRt };
      console.log(this.teach);
    }
    cancel():void{
      this.dialogRef.close();
    }
    save():void{
      this.dialogRef.close({teach:this.teach});
    }
}
