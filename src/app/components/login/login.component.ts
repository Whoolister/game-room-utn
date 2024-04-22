import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {FormsModule} from "@angular/forms";
import {User} from "../../models/User";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: { 'class': 'w-100 m-auto' },
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  logIn(): void {
    const user: User | null = this.authenticationService.logIn(this.email, this.password);

    if (user === null) {
      this.router.navigate(['/error']);
      return;
    }

    this.router.navigate(['/home']);
    return;
  }
}
