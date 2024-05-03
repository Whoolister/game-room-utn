import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";

type User = firebase.User;
type UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {

  constructor(private angularFireAuth: AngularFireAuth) {
    angularFireAuth.onAuthStateChanged((user: User | null) => this._currentUser.set(user));
  }

  private _currentUser: WritableSignal<User | null> = signal(null)

  get currentUser(): Signal<User | null> {
    return this._currentUser.asReadonly();
  }

  public isLoggedIn: Signal<Boolean> = computed((): boolean => this.currentUser() !== null)

  async register(email: string, password: string, username: string): Promise<RegisterResult> {
    try {
      await this.angularFireAuth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential: UserCredential) => userCredential.user?.updateProfile({ displayName: username }));

    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return RegisterResult.UserExists;
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
      await this.angularFireAuth.signInWithEmailAndPassword(email, password);
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

  logOut() {
    this.angularFireAuth.signOut();
  }
}

export const enum RegisterResult {
  Success,
  UserExists,
  InvalidEmail,
  OperationNotAllowed,
  WeakPassword,
}

export const enum LoginResult {
  Success,
  InvalidEmail,
  UserDisabled,
  UserNotFound,
  WrongPassword,
}
