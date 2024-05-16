import {Component} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {RandomWordService} from "../../../services/games/random-word.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [MatProgressSpinner, MatIcon],
  templateUrl: './wordle.component.html',
  styleUrl: './wordle.component.css',
  host: { class: 'container d-flex justify-content-center my-auto'}
})
export class WordleComponent {
  readonly keyboard: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  readonly board: string[][] = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];

  guesses: number = 0;
  currentColumn: number = 0;
  currentScore: number = 0;

  currentWord: string | undefined;

  gameStatus: GameStatus = GameStatus.Pending;

  constructor(private randomWordService: RandomWordService) {}

  selectLetter(letter: string): void  {
    if (this.currentWord === undefined) {
      return;
    }

    this.board[this.guesses][this.currentColumn] = letter;

    if (this.currentColumn < 4) {
      this.currentColumn++;
    }
  }

  selectColumn(column: number): void {
    this.currentColumn = column;
  }

  removeLetter(): void {
    this.board[this.guesses][this.currentColumn] = '';

    if (this.currentColumn !== 0) {
      this.currentColumn--;
    }
  }

  enterGuess(): void {
    const currentGuess: string = this.board[this.guesses].join('')

    if (currentGuess.length !== 5) {
      return;
    }

    if (currentGuess === this.currentWord) {
      return this.win();
    }

    if (this.guesses === 5) {
      return this.lose();
    }

    this.guesses++;
    this.currentColumn = 0;
  }

  isLetterInPosition(letter: string, position: number): boolean {
    return this.currentWord?.charAt(position) === letter;
  }

  isLetterInCurrentWord(letter: string): boolean {
    return this.currentWord?.includes(letter) ?? false;
  }

  start(): void {
    for (let row of this.board) {
      row.fill('');
    }

    this.currentWord = undefined;
    this.guesses = 0;
    this.currentColumn = 0;

    if (this.gameStatus !== GameStatus.Win) {
      this.currentScore = 0;
    }

    this.randomWordService
      .getRandomWords()
      .subscribe((words: string[]) => {
        this.currentWord = words[0].toUpperCase();

        console.log(this.currentWord)

        this.gameStatus = GameStatus.Playing
      })
  }

  win(): void  {
    this.gameStatus = GameStatus.Win;

    this.currentScore += 6 - this.guesses;
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
