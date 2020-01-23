import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { MaterialModule } from './material.module';
import { ContactsListComponent } from './chat/contacts-list/contacts-list.component';
import { MessagesViewComponent } from './chat/messages-view/messages-view.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';


const config: SocketIoConfig = { url: 'http://127.0.0.1:5000/test', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    SignupComponent,
    ContactsListComponent,
    MessagesViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SocketIoModule.forRoot(config)

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
