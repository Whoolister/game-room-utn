import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService, RegisterResult} from "../../services/auth/authentication.service";
import {FormsModule} from "@angular/forms";
import {RandomUsernameService} from "../../services/utils/random-username.service";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    NgbAlert
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  host: { 'class': 'm-auto' },
})
export class RegisterComponent {
  username: string = this.randomUsernameService.generateUsername();
  email: string = '';
  password: string = '';

  error: string | null = null;

  constructor(private authenticationService: AuthenticationService, private randomUsernameService: RandomUsernameService, private router: Router) { }

  signIn(): void {
    this.authenticationService
      .register(this.email, this.password, this.username)
      .then((result: RegisterResult) => this.handleRegisterResult(result));
  }

  dismissError(): void {
    this.error = null;
  }

  private handleRegisterResult(result: RegisterResult): void {
    switch (result) {
      case RegisterResult.Success:
        this.router.navigate(['/home']);
        return;
      case RegisterResult.EmailExists:
        this.error = 'Ya existe un usuario con este mail.'
        return;
      case RegisterResult.InvalidEmail:
        this.error = 'El mail ingresado no es válido.'
        return;
      case RegisterResult.OperationNotAllowed:
        this.router.navigate(['/error']);
        return;
      case RegisterResult.WeakPassword:
        this.error = 'La contraseña ingresada es muy débil.'
        return;
      default:
        this.router.navigate(['/error']);
        return;
    }
  }
}
