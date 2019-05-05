import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  jwtHelper = new JwtHelperService();

  constructor(private _authService: AuthService){}

  ngOnInit(){
    // get the decoded token on every app load from localStorage so as to get the user logged in as this is typically lost on app refresh
    const token = localStorage.getItem('token');
    if (token)
    {
      this._authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }




}
