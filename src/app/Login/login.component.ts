import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule }from '@angular/forms';
import { ApiServices } from '../Services/api.services';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoggedInUser, UserLogin } from '../Model/UserLogin';

import { HostCommunicationService } from '../Services/host-communication.services';
import { AuthService } from '../core/services/auth/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginobj: UserLogin = { UserName: '', Password: ''};
    errorMessage: string='';
    constructor(private auth: AuthService, private hostComm: HostCommunicationService){}
    login(){
        this.auth.userLogin(this.loginobj).subscribe({next :(data:LoggedInUser) =>{
          if(data ){
            console.log(data);
            // this.auth.setUserRole(data.UserRole);
            // this.auth.setUserID(data.UserID.toString());
            // sessionStorage.setItem('UserRole', data.UserRole);
            this.hostComm.handleUserRoleRedirect(data.UserRole);
          }

        }, error:(error)=>{
          // this.handleLoginError(error);
          console.log(`error in login ${error}`);
          this.errorMessage = error;
        }});
    }
    // private handleUserRoleRedirect(userRole: string) {
    //   switch (userRole) {
    //     case 'T':
    //       this.router.navigateByUrl('Teacher');
    //       break;
    //     case 'S':
    //       this.router.navigateByUrl('Student');
    //       break;
    //     case 'A':
    //       this.router.navigateByUrl('Admin');
    //       break;
    //     default:
    //       console.error('Unknown user role:', userRole);
    //       break;
    //   }
    // }
    private handleLoginError(error: any) {
      let errorMessage = '';

      if (error.status == 401) {
        errorMessage = error.error.message;
      } else if (error.status == 404) {
        errorMessage = 'Not Found';
      } else if (error.status == 500) {
        errorMessage = 'Internal Server Error';
      } else {
        errorMessage = 'Unknown Error';
      }

      // Display error message to the user
      this.errorMessage = errorMessage;
      console.error(errorMessage, error.error.message);
    }
    resetErrorMessage() {
      this.errorMessage = ''; // Set errorMessage to empty string
    }

  }


