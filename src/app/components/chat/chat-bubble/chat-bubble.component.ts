import {Component} from '@angular/core';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {MatIcon} from "@angular/material/icon";
import {ChatComponent} from "../chat.component";

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [
    NgbDropdown,
    NgbDropdownToggle,
    MatIcon,
    NgbDropdownMenu,
    ChatComponent
  ],
  templateUrl: './chat-bubble.component.html',
  styleUrl: './chat-bubble.component.css'
})
export class ChatBubbleComponent {}
