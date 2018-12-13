import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}
  
  canActivate() {
    if (localStorage.getItem('latitude') !== '' && localStorage.getItem('longditude') !== '') {
      return true;
    } else {
      this.router.navigateByUrl('home');
      return false;
    }
  }
}