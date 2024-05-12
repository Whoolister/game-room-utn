import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomUsernameService {
  private static readonly ADJECTIVES: string[] = ['Happy', 'Sad', 'Angry', 'Excited', 'Bored', 'Tired', 'Energetic', 'Calm', 'Anxious', 'Relaxed', 'Blossoming', 'Credulous', 'Silly'];
  private static readonly NOUNS: string[] = ['Lion', 'Tiger', 'Bear', 'Eagle', 'Shark', 'Dolphin', 'Elephant', 'Wolf', 'Fox', 'Hawk'];

  constructor() { }

  generateUsername(): string {
    return RandomUsernameService.ADJECTIVES[this.randomInt(0, RandomUsernameService.ADJECTIVES.length)] + RandomUsernameService.NOUNS[this.randomInt(0, RandomUsernameService.NOUNS.length)];
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
