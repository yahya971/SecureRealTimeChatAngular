import { Component, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';

import { ContactsService } from './contacts.service';
import { ChatService } from '../../_services/chat.service';
import { User } from '../../_models/User';
import { Message } from '../../_models/Message';
import { AuthService } from '../../_services/auth.service';
import { Observable } from 'rxjs';
const listenerId = 'ContactsListListner';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  @Output() userSelected = new EventEmitter<User>();
  @Input() users: User[];
  @Input() messages: Message[];
  currentUser: User;
  activeUser: User;



  constructor(readonly contactsService: ContactsService, private chatService: ChatService, private authService: AuthService) {
  }

  ngOnInit() {

    this.currentUser = this.authService.currentUser;

  
    // var message = new Message(1, "Hello World", 2, 3);

    //this.chatService.sendMessage(message);
    

    //this.selectFirstContact();
  }




  //this function returns the users list without the authenticated user (current User)
  getUsersWithoutCurrentUser() {
    let filteredUsers: User[] = [];
    this.users.map(value => {
      if (value.id != this.currentUser.id)
        filteredUsers.push(value);
    })
    return filteredUsers
  }

  ngOnDestroy(): void {
    this.contactsService.destroy(listenerId);
  }

  onUserSelected(user: User) {
    this.activeUser = user;
    this.userSelected.emit(user);
    for (let message of this.messages) {
      if (message.destinationId === this.authService.currentUser.id && message.senderId == user.id && !message.seen) {
        message.seen = true;
      }
    }
  }


  computeUnreadMessages(user: User) {

      
   let  sum = 0;
    for (let message of this.messages) {
      if (message.destinationId === this.authService.currentUser.id && message.senderId == user.id && !message.seen) {
        if (this.activeUser && user.id == this.activeUser.id) {
          message.seen = true;
        }
        else
        sum++;
      }
    }
    return sum;
  }

}
