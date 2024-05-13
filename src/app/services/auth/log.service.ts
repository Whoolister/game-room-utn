import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private static LOGIN_COLLECTION = 'login-logs';

  constructor(private firestore: AngularFirestore) { }

  logLogin(username: string): void {
    this.firestore
      .collection<{ username: string, timestamp: number }>(LogService.LOGIN_COLLECTION)
      .add({username: username, timestamp: Date.now()});
  }
}
