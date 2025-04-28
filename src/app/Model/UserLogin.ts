export interface UserLogin{
  UserName:string;
  Password: string;
}

export interface LoggedInUser{
  UserID: number;
  UserName:string;
  UserRole: string;
  Token: string;
}

