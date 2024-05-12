import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {AngularFirestore, CollectionReference, QuerySnapshot} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  private static USERS_COLLECTION = 'users';
  private static LOGIN_COLLECTION = 'login-logs';

  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) {
    fireAuth.onAuthStateChanged((user: firebase.User | null) => this._currentUser.set(user));
  }

  private _currentUser: WritableSignal<firebase.User | null> = signal(null)

  get currentUser(): Signal<firebase.User | null> {
    return this._currentUser.asReadonly();
  }

  public isLoggedIn: Signal<Boolean> = computed((): boolean => this.currentUser() !== null)

  async register(email: string, password: string, username: string): Promise<RegisterResult> {
    try {
      const userCollection: CollectionReference<User> = this.firestore
        .collection<User>(AuthenticationService.USERS_COLLECTION)
        .ref;

      const existingUser: QuerySnapshot<User> = await userCollection.where('username', '==', username).get();

      if (!existingUser.empty) return RegisterResult.UsernameExists;

      await this.fireAuth
        .createUserWithEmailAndPassword(email, password)
        .then(
          (userCredential: firebase.auth.UserCredential) => {
            userCredential.user?.updateProfile({ displayName: username });
            userCollection.add({ userId: userCredential.user!.uid, username: username });
          }
        );

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

      this.logLogin(user.user!.displayName!)
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

  logOut(): void {
    this.fireAuth.signOut();
  }

  private logLogin(username: string): void {
    this.firestore
      .collection<{ username: string, timestamp: number }>(AuthenticationService.LOGIN_COLLECTION)
      .add({username: username, timestamp: Date.now()});
  }
}

type User = {
  userId: string;
  username: string;
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
