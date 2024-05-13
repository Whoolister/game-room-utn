import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthenticationService} from "../auth/authentication.service";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private static MESSAGES_COLLECTION = 'messages';

  private _messages: WritableSignal<Message[]> = signal([]);
  messages: Signal<Message[]> = this._messages.asReadonly();

  constructor(private firestore: AngularFirestore, private authenticationService: AuthenticationService) {
    this.firestore
      .collection<Message>(ChatService.MESSAGES_COLLECTION)
      .valueChanges()
      .subscribe(messages => this._messages.set(messages));
  }

  async sendMessage(message: string): Promise<MessageResult> {
    const currentUser: firebase.User | null = this.authenticationService.currentUser();

    if (currentUser === null) return MessageResult.Error;

    await this.firestore
      .collection<Message>(ChatService.MESSAGES_COLLECTION)
      .add({ username: currentUser.displayName!, content: message, timestamp: Date.now() });

    return MessageResult.Success;
  }
}

export type Message = {
  username: string;
  content: string;
  timestamp: number;
}

export enum MessageResult {
  Success,
  Error
}
