import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: { 'class': 'm-auto' },
})
export class HomeComponent {

  readonly games: Game[] = [
    { name: 'Ahorcado', image: 'assets/games/hangman/hangman.png', route: '/hangman'},
    { name: 'Mayor o Menor', image: 'assets/games/higher-or-lower/higher-or-lower.png', route: '/higher-or-lower'},
    { name: 'Preguntados', image: 'assets/games/trivia/trivia.png', route: '/trivia'},
    { name: 'Wordle', image: 'assets/games/wordle/wordle.png', route: '/wordle'},
  ]

  constructor() {}
}

type Game = {
  name: string,
  image: string,
  route: string,
}
