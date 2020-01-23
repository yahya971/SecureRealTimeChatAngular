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

  // sendMessage(receiverId: string, text: string) {
  //   const message = new CometChat.TextMessage(
  //     receiverId,
  //     text,
  //     CometChat.MESSAGE_TYPE.TEXT,
  //     CometChat.RECEIVER_TYPE.USER
  //   );
  //
  //   return CometChat.sendMessage(message);
  // }

  //listenForMessages(listenerId: string, onMessageReceived: (msg: any) => void) {
  //  CometChat.addMessageListener(
  //    listenerId,
  //    new CometChat.MessageListener({
  //      onTextMessageReceived: onMessageReceived,
  //      onMediaMessageReceived: _ => undefined
  //    })
  //  );
  //}

  //removeMessageListener(listenerId: string) {
  //  CometChat.removeMessageListener(listenerId);
  //}

  //getPreviousMessages(userId: string) {
  //  const messageRequest = new CometChat.MessagesRequestBuilder()
  //    .setUID(userId)
  //    .setLimit(100)
  //    .build();

  //  return messageRequest.fetchPrevious();
  //}

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
