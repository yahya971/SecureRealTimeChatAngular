import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../_models/User';
import { ChatService } from '../_services/chat.service';
import { NotyService } from '../_services/noty.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(readonly router: Router, private authService: AuthService, private chatService: ChatService,
              private notyService: NotyService) {
  }

  login(formulaire: NgForm) {
    this.authService.login(formulaire.value).subscribe((data: any) => {
        console.log(data);
        this.authService.currentUser = new User(data.uid, data.givenName, data.sn, '00000000', data.certificate, data.pubkey, 'online');
        console.log(this.authService.currentUser);
        this.chatService.broadcast_user_infos();
        this.router.navigateByUrl('/chat');

      }, () => {
        this.notyService.showErrorAlert('Invalid credentials');
      }
    )
    ;
  }
}
