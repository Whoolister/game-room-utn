import {Component, Signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, NgOptimizedImage, MatIcon, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  host: { 'class': 'navbar navbar-expand bg-dark mb-4' }
})
export class NavbarComponent {
  readonly isAuthenticated: Signal<Boolean> = this.authenticationService.isLoggedIn;

  constructor(private authenticationService: AuthenticationService) { }

  logout() {
    this.authenticationService.logOut()
  }
}
