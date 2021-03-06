import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
