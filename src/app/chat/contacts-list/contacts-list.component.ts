import { Component, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';

import { ContactsService } from './contacts.service';
import { ChatService } from '../../_services/chat.service';
import { User } from '../../_models/User';
import { Message } from '../../_models/Message';
const listenerId = 'ContactsListListner';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  @Output() userSelected = new EventEmitter<User>();

  activeUser: User;
  @Input()  users: User[] = [];

  constructor(readonly contactsService: ContactsService, private chatService: ChatService) {
  }

  ngOnInit() {
  

    this.chatService.getMessage().subscribe(value => console.log(value));
    this.chatService.broadcast_connect();
    // var message = new Message(1, "Hello World", 2, 3);

    //this.chatService.sendMessage(message);
    

    //this.selectFirstContact();
  }



  ngOnDestroy(): void {
    this.contactsService.destroy(listenerId);
  }

  onUserSelected(user: User) {
    this.activeUser = user;
    this.userSelected.emit(user);
  }

}
