import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { EmailValidator } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apiKey = 'AIzaSyAC6a-SXerHcAFZ1WlWoKeY5Vs38OTM90U';
  userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }



  logout() {
localStorage.removeItem('token');
this.userToken = '';
  }

  login(usuario: UsuarioModel) {

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url + ':'}signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map(res => {
        console.log('utilizo el map');
        this.guardarToken(res['idToken']);
        return res;
      })
    )

  }

  nuevoUsuario(usuario: UsuarioModel) {

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true

    };

    return this.http.post(
      `${this.url + ':'}signUp?key=${this.apiKey}`, authData
    ).pipe(
      map(res => {
        console.log('utilizo el map');
        this.guardarToken(res['idToken']);
        return res;
      })
    )

  }

  private guardarToken(idtoken: string) {
    this.userToken = idtoken;
    localStorage.setItem('token', idtoken);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }

  usuarioAutenticado(): boolean {
  return this.userToken.length > 2;

  }


}

