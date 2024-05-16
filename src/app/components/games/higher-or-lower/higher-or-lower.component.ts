import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-higher-or-lower',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    MatIcon
  ],
  templateUrl: './higher-or-lower.component.html',
  styleUrl: './higher-or-lower.component.css',
  host: { class: 'container d-flex justify-content-center  my-auto'}
})
export class HigherOrLowerComponent implements OnInit {
  private readonly deck: Card[] = this.buildDeck();
  currentCard: Card | undefined;

  currentScore: number = 0;

  gameStatus: GameStatus = GameStatus.Pending;

  ngOnInit(): void {
    for (let card of this.deck) {
      new Image().src = `assets/games/higher-or-lower/${this.toAssetName(card)}.png`;
    }
  }

  guessHigher(): void  {
    if (this.currentCard!.type.value > this.deck[0].type.value) {
      this.lose();
      return
    }

    this.correctGuess();
  }

  guessLower(): void  {
    if (this.currentCard!.type.value < this.deck[0].type.value) {
      this.lose();
      return;
    }

    this.correctGuess();
  }

  private correctGuess(): void  {
    this.currentScore++;
    this.cycleCard();
  }

  cycleCard(): void  {
    this.currentCard = this.deck.shift()!;

    this.deck.push(this.currentCard);
  }

  start(): void {
    this.currentScore = 0;
    this.gameStatus = GameStatus.Playing;

    this.shuffleDeck();

    this.cycleCard();
  }

  lose(): void  {
    this.cycleCard();

    this.gameStatus = GameStatus.Lose;
  }

  toAssetName(card: Card): string {
    return `${card.type}_of_${card.suit}`;
  }

  private buildDeck(): Card[] {
    const deck: Card[] = [];

    for (let suit of CardSuit.All) {
      for (let type of CardType.All) {
        deck.push({type: type, suit: suit});
      }
    }

    return deck;
  }

  private shuffleDeck(): void {
    this.deck.sort(() => Math.random() - 0.5);
  }

  protected readonly GameStatus = GameStatus;
}

enum GameStatus {
  Pending,
  Playing,
  Lose
}

type Card = {
  type: CardType;
  suit: CardSuit;
}

class CardType {
  static readonly Ace: CardType = new CardType('ace', 14);
  static readonly Two: CardType = new CardType('2', 2);
  static readonly Three: CardType = new CardType('3', 3);
  static readonly Four: CardType = new CardType('4', 4);
  static readonly Five: CardType = new CardType('5', 5);
  static readonly Six: CardType = new CardType('6', 6);
  static readonly Seven: CardType = new CardType('7', 7);
  static readonly Eight: CardType = new CardType('8', 8);
  static readonly Nine: CardType = new CardType('9', 9);
  static readonly Ten: CardType = new CardType('10', 10);
  static readonly Jack: CardType = new CardType('jack', 11);
  static readonly Queen: CardType = new CardType('queen', 12);
  static readonly King: CardType = new CardType('king', 13);

  static readonly All: CardType[] = <const> [
    CardType.Ace,
    CardType.Two,
    CardType.Three,
    CardType.Four,
    CardType.Five,
    CardType.Six,
    CardType.Seven,
    CardType.Eight,
    CardType.Nine,
    CardType.Ten,
    CardType.Jack,
    CardType.Queen,
    CardType.King
  ];

  private constructor(public readonly name: string, public readonly value: number) {}

  toString(): string {
    return this.name;
  }
}

class CardSuit {
  static readonly Diamonds = new CardSuit('diamonds');
  static readonly Hearts = new CardSuit('hearts');
  static readonly Clubs = new CardSuit('clubs');
  static readonly Spades = new CardSuit('spades');

  static readonly All: CardSuit[] = <const> [CardSuit.Diamonds, CardSuit.Hearts, CardSuit.Clubs, CardSuit.Spades];

  private constructor(public readonly name: string) {}

  toString(): string {
    return this.name;
  }
}
