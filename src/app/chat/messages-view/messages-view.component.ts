import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { timer, from } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Message } from '../../_models/Message';

@Component({
  selector: 'app-messages-view',
  templateUrl: './messages-view.component.html',
  styleUrls: ['./messages-view.component.scss']
})
export class MessagesViewComponent implements OnChanges {
 // @Input() messages: Message[];
  @Input() selectedUserName: string;
  messages: Message[]=[];
  @Output() sendMessage = new EventEmitter<string>();

  @ViewChild('scrollMe', { static: false })
  messagesContainer: ElementRef<HTMLDivElement>;

  constructor(readonly authService: AuthService) {
    this.messages.push(new Message(1, "Hello", 926062, 926062));
    this.messages.push(new Message(1, "World", 926062, 926062));
    console.log(this.messages);
  }

  onSendMessage(message: string) {
    this.sendMessage.emit(message);
    
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
}
