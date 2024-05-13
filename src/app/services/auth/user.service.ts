import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static USERS_COLLECTION = 'users';

  constructor(private firestore: AngularFirestore) { }

  private readonly userCollection = this.firestore
    .collection<User>(UserService.USERS_COLLECTION)
    .ref;

  async save(user: User): Promise<SaveResult> {
    if (await this.exists(user.username)) {
      return SaveResult.USERNAME_EXISTS;
    }

    await this.userCollection.add(user);

    return SaveResult.SUCCESS;
  }

  async exists(username: string): Promise<Boolean> {
    return await this.userCollection
      .where('username', '==', username)
      .get()
      .then(querySnapshot => !querySnapshot.empty);
  }
}

type User = {
  userId: string;
  username: string;
}

enum SaveResult {
  SUCCESS,
  USERNAME_EXISTS
}
