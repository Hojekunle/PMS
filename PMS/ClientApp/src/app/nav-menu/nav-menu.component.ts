import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  model: any = {};
  constructor(public _authService: AuthService, private _alertifyService: AlertifyService, private _router: Router) {
  }

  ngOnInit(){
  }

  login(){
    this._authService.login(this.model).subscribe(next => {
      this._alertifyService.success("Successfully logged in");
    }, error => {
      this._alertifyService.error(error);
    }, () => this._router.navigate(['\members']));
  }

  loggedIn(){
    return this._authService.loggedIn();
  }

  logOut(){
    localStorage.removeItem('token');
    this._alertifyService.message("logged out successfully");
    this._router.navigate(['\home'])
  }
}
