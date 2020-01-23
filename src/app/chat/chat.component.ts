import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { CometChat } from '@cometchat-pro/chat';
import { ChatService } from '../_services/chat.service';
import { User } from '../_models/User';
import { Message } from '../_models/Message';
const listenerId = 'ChatScreenListener';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  selectedUser: User;
  messages: any[] = [];
  users: User[];

  constructor(
    readonly authService: AuthService,
    readonly chatService: ChatService
  ) {}

  ngOnInit() {
    this.chatService.getMessage().subscribe( msg => {
      console.log('New message: ', msg);
      this.messages.concat(msg);
    });
    this.chatService.getConnectEvent().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log('CONNECTED EVENT');
      });
  }

  ngOnDestroy() {
    //this.chatService.removeMessageListener(listenerId);
  }

  // async onUserSelected(usr: CometChat.UserObj) {
  //   this.selectedUser = usr;
  //   const messages = await this.chatService.getPreviousMessages(usr.uid);
  //   console.log('Previous messages', messages);
  //
  //   this.messages = (messages as any[]).filter(msg => msg.type === 'text');
  // }
  //
  // async onSendMessage(message: string) {
  //   console.log('sending message: ', message);
  //   const sentMessage = await this.chatService.sendMessage(
  //     this.selectedUser.uid,
  //     message
  //   );
  //
  //   console.log({ sentMessage });
  //
  //   if (sentMessage) {
  //     this.messages = [...this.messages, sentMessage as any];
  //   }
  // }
}
