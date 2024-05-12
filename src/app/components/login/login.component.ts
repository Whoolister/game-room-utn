import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService, LoginResult} from "../../services/auth/authentication.service";
import {FormsModule} from "@angular/forms";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    NgbAlert
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: { 'class': 'w-100 m-auto' },
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string | null = null;

  presetAccounts: PresetAccount[] = [
    { username: 'Admin', email: 'yodremilte@gufum.com', password: '123456' },
    { username: 'Jugador 1', email: 'bipsilifye@gufum.com', password: '123456' },
    { username: 'Jugador 2', email: 'lemlovalme@gufum.com', password: '123456' },
  ]

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  populateForm(account: PresetAccount): void {
    this.email = account.email;
    this.password = account.password;
  }

  login(): void {
    this.authenticationService
      .login(this.email, this.password)
      .then((result: LoginResult) => this.handleLoginResult(result));
  }

  dismissError(): void {
    this.error = null;
  }

  private handleLoginResult(result: LoginResult): void {
    switch (result) {
      case LoginResult.Success:
        this.router.navigate(['/home']);
        return;
      case LoginResult.InvalidEmail:
        this.error = 'El mail ingresado no es válido.';
        return;
      case LoginResult.UserDisabled:
        this.error = 'El usuario se encuentra deshabilitado.';
        return;
      case LoginResult.UserNotFound:
        this.error = 'No se encontró un usuario con este mail.';
        return;
      case LoginResult.WrongPassword:
        this.error = 'La contraseña ingresada es incorrecta.';
        return;
      default:
        this.router.navigate(['/error']);
        return;
    }
  }
}

type PresetAccount = {
  username: string,
  email: string,
  password: string,
}
