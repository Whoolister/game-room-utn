import { Component } from '@angular/core';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [
    NgbDropdown,
    NgbDropdownToggle,
    MatIcon,
    NgbDropdownMenu
  ],
  templateUrl: './chat-bubble.component.html',
  styleUrl: './chat-bubble.component.css'
})
export class ChatBubbleComponent {

}
