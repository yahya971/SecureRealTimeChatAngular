import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(readonly router: Router, private authService: AuthService) {}

  login(formulaire: NgForm) {
    this.authService.login(formulaire.value).subscribe(data => {
      console.log(data);
    })
    this.router.navigateByUrl('/chat');
  }
}
