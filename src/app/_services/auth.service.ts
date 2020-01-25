import { Injectable } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { MatSnackBar } from '@angular/material';

import { environment } from '../../environments/environment';
import { User } from '../_models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {
    //this.init(environment.appId);
  }

  init(appId: string) {
    //CometChat.init(appId).then(
    //  msg => console.log('Initialized succesfull: ', msg),
    //  err => {
    //    console.log('App init failed', err);
    //    this.snackBar.open(
    //      'App initialization failed. Please refresh the page.'
    //    );
    //  }
    //);
  }

  login(data) {
    return this.httpClient.post('http://127.0.0.1:5000/login', data);
  }

  signup(data) {
    return this.httpClient.post('http://127.0.0.1:5000/signup', data);
  }
}
