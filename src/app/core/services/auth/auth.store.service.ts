import { Injectable } from '@angular/core';
import { LoggedInUser } from '../../../Model/UserLogin';
import { Constants } from '../../../utils/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private userRole: string= '';
  private userID = '';

  setToken(token: string) {
    sessionStorage.setItem(Constants.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(Constants.TOKEN_KEY);
  }

  public getUserRole(): string {
    if (typeof window !== 'undefined' && window.sessionStorage){
      if (this.userRole == '' && sessionStorage.getItem(Constants.USER_ROLE) ) {
        this.userRole = sessionStorage.getItem(Constants.USER_ROLE) || '';
      }

    }
    return this.userRole;
  }

  public setUserRole(userRole: string) {
    this.userRole = userRole;
    sessionStorage.setItem(Constants.USER_ROLE, userRole);
  }

  public getUserID(): string {
    return this.userID;
  }

  public setUserID(userID: string) {
    this.userID = userID;
    sessionStorage.setItem(Constants.USER_ID, userID);
  }

  public setLoggedInData(response:LoggedInUser){
    this.setUserRole(response.UserRole);
    this.setUserID(response.UserID.toString());
    this.setToken(response.Token);
  }

  public clearLoggedInData(){
    this.userRole=''
    this.userID='';
    sessionStorage.removeItem(Constants.TOKEN_KEY);
    sessionStorage.removeItem(Constants.USER_ROLE);
  }
}
