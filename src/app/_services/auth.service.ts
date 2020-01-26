import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { User } from '../_models/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router) {
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

  logout() {
    this.currentUser = null;
    this.router.navigateByUrl('/login');
  }
}
