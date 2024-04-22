import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent implements OnInit, OnDestroy {
  email: string = '';
  private authListener!: Subscription;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authListener = this.authenticationService
      .getCurrentUserListener()
      .subscribe(user => { if (user !== null) { this.email = user.email; }});
  }

  ngOnDestroy(): void {
    this.authListener.unsubscribe();
  }
}
