import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core'
import { StorageService } from '../services/auth/auth.store.service';


export const AdminGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _auth = inject(StorageService);
  let UserRole = _auth.getUserRole();
  if(UserRole == 'A')
    return true;
  else{
    _router.navigate(['login']);
    return false;
  }
};
export const StudentsGuard: CanActivateFn= (route,state) =>{
  const _router = inject(Router);
  const _auth = inject(StorageService);
  let UserRole = _auth.getUserRole();
  if(UserRole == 'S')
    return true;
  else{
    _router.navigate(['login']);
    return false;
  }

}
export const TeachersGuard: CanActivateFn= (route,state) =>{
  const _router = inject(Router);
  const _auth = inject(StorageService);
  let UserRole = _auth.getUserRole();
  if(UserRole == 'T')
    return true;
  else{
    _router.navigate(['login']);
    return false;
  }
}
