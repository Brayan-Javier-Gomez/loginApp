import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { UsuarioModel } from '../../models/usuario.model';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordar = false;

  constructor(private auth: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    this.usuario.email = 'brayan@gmail.com';
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'

    });
    Swal.showLoading();

    console.log('form enviado');
    console.log(this.usuario);


    this.auth.nuevoUsuario(this.usuario)
      .subscribe(res => {
        Swal.close();

        if (this.recordar) {
          localStorage.setItem('email', this.usuario.email);
        }
        
        this.router.navigateByUrl('/home');

        console.log(res);
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          text: `Ha ocurrido un error inesperado: ${err.error.error.message}`

        });
      });

  }


}
