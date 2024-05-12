import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgbDropdown, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {ChatService} from "../../services/chat/chat.service";

@Component({
  selector: 'app-chat',
  standalone: true,
    imports: [
        MatIcon,
        NgbDropdown,
        NgbDropdownToggle
    ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  constructor(private chatService: ChatService) {
  }

}
