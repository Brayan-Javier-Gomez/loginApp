import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UsuarioModel } from '../../models/usuario.model';
import { LoginService } from '../../services/login.service';
const Swal = require('sweetalert2')

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordar = false;
  constructor(private auth: LoginService,
              private router: Router) { }

  ngOnInit() {

    this.usuario = new UsuarioModel();

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordar = true;

    }

  }

  login(form: NgForm) {

    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'

    });
    Swal.showLoading();

    console.log('login');
    console.log(this.usuario);

    this.auth.login(this.usuario)
      .subscribe(res => {

        console.log(res);

        Swal.close();

        this.router.navigateByUrl('/home');

        // check de recordar

        if (this.recordar) {
          localStorage.setItem('email', this.usuario.email);
        }

      }, (err) => {
        console.log(err.error.error);
        if (err.error.error.message === 'INVALID_PASSWORD') {
          Swal.fire({
            icon: 'info',
            title: 'Error al intentar autenticar',
            text: 'Usuario o Contraseña incorrectos.'

          });
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Error al intentar autenticar',
            text: 'Ha ocurrido un error en el proceso, Intente mas tarde.'

          });
        }


      });

  }

}
