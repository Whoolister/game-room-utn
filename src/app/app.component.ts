import {Component, Signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from "./components/footer/footer.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AuthenticationService} from "./services/auth/authentication.service";
import {ChatBubbleComponent} from "./components/chat/chat-bubble/chat-bubble.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, ChatBubbleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: { 'class': 'd-flex flex-column bg-body-tertiary' }
})
export class AppComponent {
  readonly isLoggedIn: Signal<Boolean> = this.authenticationService.isLoggedIn;

  constructor(private authenticationService: AuthenticationService) {
  }
}
