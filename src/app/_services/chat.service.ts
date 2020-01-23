import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { CometChat } from '@cometchat-pro/chat';
import { AuthService } from './auth.service';
import { Message } from '../_models/Message';
import { User } from '../_models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket: Socket, private authenticationService: AuthService) {
  }

  sendMessage(msg: Message) {

    this.socket.emit('send_message', msg);
  }

  getMessage() {
    return this.socket
      .fromEvent('get_message');
  }

  getConnectEvent() {
    return this.socket.fromEvent('USER_CONNECTED');
  }


  broadcast_connect() {
    return this.socket.on('connect', () => {
      console.log('i will give my id');
      this.broadcast_user_infos();
    });

  }

  getUsers() {
    this.socket.emit('getUsers');
    return this.socket.fromEvent('sendUsers') as Observable<User[]>;
  }

  broadcast_user_infos() {
    return this.socket.emit('user_infos', this.authenticationService.currentUser);
  }

}
