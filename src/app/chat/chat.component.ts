import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { ChatService } from '../_services/chat.service';
import { User } from '../_models/User';
import { Message } from '../_models/Message';
import { CryptoService } from '../_services/crypto.service';
import { NotyService } from '../_services/noty.service';

const listenerId = 'ChatScreenListener';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  selectedUser: User;
  messages: Message[] = [];

  users: User[] = [];

  constructor(
    readonly authService: AuthService,
    readonly chatService: ChatService,
    private cryptoService: CryptoService,
    private notyService: NotyService
  ) {

    this.chatService.getConnectEvent().subscribe(
      (data: User[]) => {
        this.users = this.getUsersWithoutCurrentUser(data);
        console.log('CONNECTED EVENT');
        console.log(this.users);

      });
  }

  getUsersWithoutCurrentUser(data) {
    let filteredUsers: User[] = [];
    data.map(value => {
      if (value.id !== this.authService.currentUser.id) {
        filteredUsers.push(value);
      }
    });
    return filteredUsers;
  }

  ngOnInit() {

    this.chatService.getMessage().subscribe((value: Message) => {
      console.log(value);
      this.messages.push(value);
    });

    this.notyService.showInfoAlert('Please enter your private key ');
    //this.chatService.getMessage().subscribe( (msg:Message) => {
    //  console.log('New message: ', msg);
    //  this.messages.push(msg);
    //});


  }

  ngOnDestroy() {
  }


  //Output Handeling of Contacts List
  selectUser(user) {
    this.selectedUser = user;
    console.log(user);
  }

  onSendkey(key: string) {
    console.log(key);
    this.cryptoService.loadPrivateKey(key);
  }

  onSendPublickey(key: string) {
    console.log(key);
    this.cryptoService.loadPublicKey(key);
  }

  //Output Handeling of MessageView
  recieveMessage(message: Message) {
    if (message.encrypted == true) {
      this.chatService.sendMessage(message);
    } else {
      this.messages.push(message);
    }
    console.log(this.messages);
  }


  //this filters the messages to leave those encrypted for the log
  filterMessagesEncrypted() {
    let filteredMessages: Message[] = [];
    if (this.selectedUser) {
      this.messages.map(value => {
        if ((value.destinationId == this.selectedUser.id && value.senderId == this.authService.currentUser.id && value.encrypted == true) || (value.destinationId == this.authService.currentUser.id && value.senderId == this.selectedUser.id && value.encrypted == true)) {
          filteredMessages.push(value);
        }

      });
    }
    return filteredMessages;
  }

  logout() {
    this.authService.logout();
  }


}
