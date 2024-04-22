import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    FormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  host: { 'class': 'w-100 m-auto' },
})
export class SignInComponent {
  email: string = '';
  password: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  signIn(): void {
    // TODO: Implement Error Handling here
    if (!AuthenticationService.EMAIL_REGEX.test(this.email) || !AuthenticationService.PASSWORD_REGEX.test(this.password)) {
      this.router.navigate(['/error']);
      return;
    }

    if (!this.authenticationService.signIn(this.email, this.password)) {
      this.router.navigate(['/error']);
      return;
    }

    this.router.navigate(['/login']);
    return;
  }
}
