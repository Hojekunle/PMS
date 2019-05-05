import { Injectable } from '@angular/core';
// we need not declare the variable alertify or inject it as it is registered and available globally in angular.json.
// Below is to escape linting errors
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

  // OkCallBack is the function passed from the caller, e is the buttons click event on user clicking on Ok
  confirm(message: string, OkCallBack: () => any){
    alertify.confirm(message, function(e) {
      if (e) {
        OkCallBack();
      } else {}
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
