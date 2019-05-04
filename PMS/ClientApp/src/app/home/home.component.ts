import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  registerMode: any = false;

  cobstructor(){}

  ngOnInit(){}

  registerToggle(){
    /*set var to true to display register page while cancel btn sets it to false i.e val from register component, to hide the page*/
    this.registerMode= true;
  }

  cancelRegisterMode(valueFromRegisterComponent: boolean){
    this.registerMode = valueFromRegisterComponent;
  }
}
