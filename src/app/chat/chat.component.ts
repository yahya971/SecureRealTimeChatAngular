import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { CometChat } from '@cometchat-pro/chat';
import { ChatService } from '../_services/chat.service';
import { User } from '../_models/User';
import { Message } from '../_models/Message';
import { Observable, of } from 'rxjs';
import { CryptoService } from '../_services/crypto.service';
const listenerId = 'ChatScreenListener';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  selectedUser: User;
  messages: Message[] = [];

  users: User[]=[];

  constructor(
    readonly authService: AuthService,
    readonly chatService: ChatService,
    private cryptoService: CryptoService,

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
      if (value.id !== this.authService.currentUser.id)
        filteredUsers.push(value);
    })
    return filteredUsers
  }

  ngOnInit() {

    this.chatService.getMessage().subscribe((value: Message) => {
      console.log(value);
      this.messages.push(value);
    })

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
  recieveMessage(message) {
    console.log(message);
    this.chatService.sendMessage(message);
  }


}
