import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { HttpClient } from '@angular/common/http';
import { LoggedInUser, UserLogin } from '../../../Model/UserLogin';
import { Observable, tap } from 'rxjs';
import { StorageService } from './auth.store.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService{


  constructor(protected override http: HttpClient, private storageService: StorageService) {
    super(http);
  }

  userLogin(loginobj:UserLogin):Observable<LoggedInUser>{
      return super.post<LoggedInUser>('UserAcc/Login', loginobj).pipe(
        tap(response => {
          this.storageService.setLoggedInData(response);
        })
      );
  }

  userLogout(){
    this.storageService.clearLoggedInData();
  }


}
