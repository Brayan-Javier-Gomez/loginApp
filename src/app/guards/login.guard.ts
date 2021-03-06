import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private auth: LoginService, private router: Router) {

  }

  canActivate(): boolean {

    if (this.auth.usuarioAutenticado()) {
      console.log('guard abierto');
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }


  }
}
