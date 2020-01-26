import { Injectable } from '@angular/core';
import * as Noty from 'noty';


@Injectable({
  providedIn: 'root'
})
export class NotyService {

  constructor() {
  }

  showSucessAlert(message) {
    new Noty({
      type: 'success',
      theme: 'metroui',
      text: message ? message : 'Success'
    }).show();
  }

  showErrorAlert(message) {
    new Noty({
      type: 'error',
      theme: 'metroui',
      text: message ? message : 'Error'
    }).show();
  }

  showInfoAlert(message) {
    new Noty({
      type: 'info',
      theme: 'metroui',
      text: message ? message : 'Info'
    }).show();
  }


}
