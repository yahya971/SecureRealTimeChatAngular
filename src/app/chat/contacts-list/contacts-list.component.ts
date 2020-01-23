import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { ContactsService } from './contacts.service';
import { ChatService } from '../../_services/chat.service';
import { User } from '../../_models/User';

const listenerId = 'ContactsListListner';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  @Output() userSelected = new EventEmitter<User>();

  activeUser: User;
  users: User[] = [];

  constructor(readonly contactsService: ContactsService, private chatService: ChatService) {
  }

  ngOnInit() {

    this.chatService.getConnectEvent().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log('CONNECTED EVENT');
      });
    this.chatService.broadcast_connect();


    this.selectFirstContact();
  }

  private selectFirstContact() {
    if (
      this.contactsService.contacts &&
      this.contactsService.contacts.length !== 0
    ) {
      this.onUserSelected(this.contactsService.contacts[0] as any);
    }
  }

  ngOnDestroy(): void {
    this.contactsService.destroy(listenerId);
  }

  onUserSelected(user: User) {
    this.activeUser = user;
    this.userSelected.emit(user);
  }

}
