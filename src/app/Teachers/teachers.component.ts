import { Component } from '@angular/core';
import { HeaderComponent } from "../layout/header/header.component";

@Component({
    selector: 'app-teachers',
    standalone: true,
    templateUrl: './teachers.component.html',
    styleUrl: './teachers.component.css',
    imports: [HeaderComponent]
})
export class TeachersComponent {

}
