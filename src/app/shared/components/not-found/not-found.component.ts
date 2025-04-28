import { Component, Host } from '@angular/core';

import { HostCommunicationService } from '../../../Services/host-communication.services';
import { StorageService } from '../../../core/services/auth/auth.store.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  constructor( private auth: StorageService, private hostComm :HostCommunicationService){

  }
  goToMain(){
    const userRole = this.auth.getUserRole();
    this.hostComm.handleUserRoleRedirect(userRole);
  }
}
