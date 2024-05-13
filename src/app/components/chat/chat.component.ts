import {Component, Signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgbDropdown, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {ChatService, Message} from "../../services/chat/chat.service";
import {AuthenticationService} from "../../services/auth/authentication.service";
import firebase from "firebase/compat";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatIcon,
    NgbDropdown,
    NgbDropdownToggle,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  readonly messages: Signal<Message[]> = this.chatService.messages;
  readonly currentUser: Signal<firebase.User | null> = this.authService.currentUser

  currentMessage: string = '';

  private static readonly TIMESTAMP_OPTIONS: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  constructor(private authService: AuthenticationService, private chatService: ChatService) {}

  isFromCurrentUser(message: Message): boolean {
    return message.username === this.currentUser()?.displayName;
  }

  sendMessage() {
    this.chatService
      .sendMessage(this.currentMessage)
      .then(() => this.currentMessage = '');
  }

  transformTimestamp(timestamp: number): string {
    return new Date(timestamp).toLocaleString('es-ES', ChatComponent.TIMESTAMP_OPTIONS);
  }
}
