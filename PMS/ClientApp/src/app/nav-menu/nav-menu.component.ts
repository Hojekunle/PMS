import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  model: any = {};
  constructor(private authService: AuthService ) {
  }

  ngOnInit(){
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      console.log("Successfully logged in")
    }, error => {
      console.log(error);
    });
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logOut(){
    localStorage.removeItem('token');
    console.log("logged out");
  }
}
