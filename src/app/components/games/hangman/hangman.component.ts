import {Component, OnInit} from '@angular/core';
import {RandomWordService} from "../../../services/games/random-word.service";
import {NgOptimizedImage} from "@angular/common";
import {MatFabButton} from "@angular/material/button";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatFabButton,
    FormsModule,
    NgbAlert,
    ReactiveFormsModule,
    MatProgressSpinner
  ],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.css',
  host: { class: 'container d-flex justify-content-center my-auto'}
})
export class HangmanComponent implements OnInit {
  readonly keyboard: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  readonly usedLetters: string[] = [];

  incorrectGuesses: number = 0;
  correctGuesses: number = 0;
  currentScore: number = 0;

  currentWord: string | undefined;
  wordLength: number = RandomWordService.DEFAULT_LENGTH;

  gameStatus: GameStatus = GameStatus.Pending;

  constructor(private randomWordService: RandomWordService) {}

  ngOnInit(): void {
    for (let i: number = 0; i <= 10; i++) {
      new Image().src = `assets/games/hangman/${i}.jpg`;
    }
  }

  selectLetter(letter: string): void  {
    if (this.currentWord === undefined) {
      return;
    }

    this.usedLetters.push(letter);

    if (this.currentWord.includes(letter)) {
      this.correctGuesses++;
    } else {
      this.incorrectGuesses++;
    }

    if (this.incorrectGuesses >= 10) {
      return this.lose();
    }

    if ([...this.currentWord].every((letter: string) => this.usedLetters.includes(letter))) {
      return this.win();
    }
  }

  start(): void {
    this.currentWord = undefined;
    this.usedLetters.length = 0;

    if (this.gameStatus === GameStatus.Win) {
      this.currentScore++;
    } else {
      this.currentScore = 0;
    }

    this.incorrectGuesses = 0;
    this.correctGuesses = 0;

    this.randomWordService
      .getRandomWords(this.wordLength)
      .subscribe((words: string[]) => {
        this.currentWord = words[0].toUpperCase();

        this.gameStatus = GameStatus.Playing
      })
  }

  win(): void  {
    this.gameStatus = GameStatus.Win;

    this.currentScore++;
  }

  lose(): void  {
    this.gameStatus = GameStatus.Lose;
  }

  protected readonly GameStatus = GameStatus;
}

enum GameStatus {
  Pending,
  Playing,
  Win,
  Lose
}
