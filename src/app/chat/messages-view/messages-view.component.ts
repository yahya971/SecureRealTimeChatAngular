import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { timer, from, Observable } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Message } from '../../_models/Message';
import { User } from '../../_models/User';

@Component({
  selector: 'app-messages-view',
  templateUrl: './messages-view.component.html',
  styleUrls: ['./messages-view.component.scss']
})
export class MessagesViewComponent implements OnChanges {
  @Input() selectedUser:User;
  @Input() messages: Message[];
  @Output() sendMessage = new EventEmitter<Message>();


  @ViewChild('scrollMe', { static: false })
  messagesContainer: ElementRef<HTMLDivElement>;

  constructor(readonly authService: AuthService) {

  }
  ngOnInit() {
    this.filterMessages()
  }

  onSendMessage(message: string) {
    if (this.selectedUser)
    this.sendMessage.emit(new Message(Math.floor(Math.random() * (999999 - 100000)) + 100000, message, this.authService.currentUser.id, this.selectedUser.id));   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.messages) {
      timer(10).subscribe(() => this.scrollIntoView());
    }
  }

  private scrollIntoView() {
    if (this.messagesContainer) {
      const { nativeElement } = this.messagesContainer;
      nativeElement.scrollTop = nativeElement.scrollHeight;
    }
  }


  //this function filters the messages to leave only the current user and the selected user messages visible
  filterMessages() {
    let filteredMessages: Message[] = [];
    if(this.selectedUser)
      this.messages.map(value => {
        if ((value.destinationId == this.selectedUser.id && value.senderId == this.authService.currentUser.id) || (value.destinationId == this.authService.currentUser.id && value.senderId == this.selectedUser.id)) {
        filteredMessages.push(value);
      }

    })
    return filteredMessages;
  }




  //this functions checks if there are any messages between the selected User and the current User
  checkforMessages() {
    if(this.selectedUser)
    for (let value of this.messages) {
      if ((value.destinationId == this.selectedUser.id && value.senderId == this.authService.currentUser.id) || (value.destinationId == this.authService.currentUser.id && value.senderId == this.selectedUser.id))
        return true;
    }
    return false;
  }
}
