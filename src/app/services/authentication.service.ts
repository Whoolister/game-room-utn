import { Injectable } from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import { User, isUser} from "../models/User";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  private static readonly USERS_KEY = 'users';
  private static readonly CURRENT_USER_KEY = 'currentUser';
  static readonly EMAIL_REGEX: RegExp = /^\S+@\S+\.\S+$/gm;
  static readonly PASSWORD_REGEX: RegExp = /^[a-zA-Z\d]{8,}$/gm;

  constructor(private localStorageService: LocalStorageService) {
    this.currentUserListener.next(this.getCurrentUser());
  }

  private currentUserListener: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  signIn(email: string, password: string): boolean {
    const currentUsers: User[] = this.getUsers();

    if (currentUsers.find(user => user.email === email) !== undefined) {
      return false;
    }

    this.localStorageService.saveObject(AuthenticationService.USERS_KEY, [...currentUsers, { email, password }]);

    return true;
  }

  logIn(email: string, password: string): User | null {
    const currentUsers: User[] = this.getUsers();

    const user: User | undefined = currentUsers.find(user => user.email === email && user.password === password);

    if (user === undefined) {
      return null;
    }

    this.setCurrentUser(user);

    return user;
  }

  logOut(): void {
    this.clearCurrentUser();

    this.currentUserListener.next(null);
  }

  getCurrentUserListener(): Observable<User | null> {
    return this.currentUserListener.asObservable();
  }

  private setCurrentUser(user: User): void {
    this.localStorageService.saveObject(AuthenticationService.CURRENT_USER_KEY, user);

    this.currentUserListener.next(this.getCurrentUser());
  }

  private getCurrentUser(): User | null {
    return this.localStorageService.getObject(AuthenticationService.CURRENT_USER_KEY);
  }

  private clearCurrentUser(): void {
    this.localStorageService.remove(AuthenticationService.CURRENT_USER_KEY);
  }

  private getUsers(): User[] {
    const currentUsers: User[] | null = this.localStorageService.getObject(AuthenticationService.USERS_KEY);

    if (currentUsers === null) {
      return [];
    }

    if (!currentUsers.every(isUser)) {
      return [];
    }

    return currentUsers;
  }
}
