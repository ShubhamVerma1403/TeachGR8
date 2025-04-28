import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../layout/header/header.component";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../layout/Sidebar/sidebar.component";
import { MainComponent } from './main/main.component';
import { HostCommunicationService } from '../Services/host-communication.services';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent,CommonModule, SidebarComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private hostComm: HostCommunicationService) { }

}
