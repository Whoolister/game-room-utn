import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {Subscription} from "rxjs";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {ProfileCardComponent} from "../profile/card/profile-card.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, NgOptimizedImage, MatMenu, ProfileCardComponent, MatMenuTrigger],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  host: { 'class': 'navbar navbar-expand bg-dark mb-4' }
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private authListener!: Subscription;

  constructor(private authenticationService: AuthenticationService) { }

  logout() {
    this.authenticationService.logOut()
  }

  ngOnInit() {
    this.authListener = this.authenticationService
      .getCurrentUserListener()
      .subscribe(user => { this.isAuthenticated = user !== null });
  }

  ngOnDestroy(): void {
    this.authListener.unsubscribe();
  }
}
