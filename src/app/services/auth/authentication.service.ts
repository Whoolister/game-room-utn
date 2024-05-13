import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {UserService} from "./user.service";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {

  private _currentUser: WritableSignal<firebase.User | null> = signal(null)

  get currentUser(): Signal<firebase.User | null> {
    return this._currentUser.asReadonly();
  }

  isLoggedIn: Signal<Boolean> = computed((): boolean => this.currentUser() !== null)

  constructor(
    private fireAuth: AngularFireAuth,
    private userService: UserService,
    private logService: LogService
  ) {
    fireAuth.onAuthStateChanged((user: firebase.User | null) => this._currentUser.set(user));
  }

  async register(email: string, password: string, username: string): Promise<RegisterResult> {
    try {
      if (!await this.userService.exists(username)) return RegisterResult.UsernameExists;

      await this.fireAuth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential: firebase.auth.UserCredential) => {
            userCredential.user!.updateProfile({ displayName: username });
            this.userService.save({ userId: userCredential.user!.uid, username: username });
        });

    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return RegisterResult.EmailExists;
        case 'auth/invalid-email':
          return RegisterResult.InvalidEmail;
        case 'auth/operation-not-allowed':
          return RegisterResult.OperationNotAllowed;
        default:
          return RegisterResult.WeakPassword;
      }
    }

    return RegisterResult.Success;
  }

  async login(email: string, password: string): Promise<LoginResult> {
    try {
      const user: firebase.auth.UserCredential = await this.fireAuth.signInWithEmailAndPassword(email, password);

      this.logService.logLogin(user.user!.displayName!)
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          return LoginResult.InvalidEmail;
        case 'auth/user-disabled':
          return LoginResult.UserDisabled;
        case 'auth/user-not-found':
          return LoginResult.UserNotFound;
        default:
          return LoginResult.WrongPassword;
      }
    }

    return LoginResult.Success;
  }

  async logOut(): Promise<void> {
    await this.fireAuth.signOut();
  }
}

export const enum RegisterResult {
  Success,
  EmailExists,
  InvalidEmail,
  OperationNotAllowed,
  WeakPassword,
  UsernameExists,
}

export const enum LoginResult {
  Success,
  InvalidEmail,
  UserDisabled,
  UserNotFound,
  WrongPassword,
}
