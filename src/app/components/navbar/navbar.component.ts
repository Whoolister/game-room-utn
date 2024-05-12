import {Component, Signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthenticationService} from "../../services/auth/authentication.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import firebase from "firebase/compat";

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
  readonly currentUser: Signal<firebase.User | null> = this.authenticationService.currentUser;

  constructor(private authenticationService: AuthenticationService) { }

  logout() {
    this.authenticationService.logOut()
  }
}
