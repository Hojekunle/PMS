import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  /*create cancelRegister Emit event and emit value of false to home component via EventEmitter
   in other to control Register page display on home page*/
  @Output() cancelRegister = new EventEmitter();

  constructor(private _authService:  AuthService, private _alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  register(){
    this._authService.register(this.model).subscribe(() => {
      this._alertifyService.success("Registration successful");
    }, error => {
      this._alertifyService.error(error);
      console.log(error);
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
