import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error: string;

  constructor(readonly router: Router) {}

  login(formulaire: NgForm) {
    console.log(formulaire.value);
    this.router.navigateByUrl('/chat');
  }
}
