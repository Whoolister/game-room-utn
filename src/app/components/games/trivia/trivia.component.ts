import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgOptimizedImage} from "@angular/common";
import {Category, Format, Question, Questions, TriviaService} from "../../../services/games/trivia.service";

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [FormsModule, MatProgressSpinner, NgOptimizedImage],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css',
  host: { class: 'container d-flex justify-content-center my-auto'}
})
export class TriviaComponent {
  currentQuestion: Question | undefined;
  currentCategory: Category | undefined;

  readonly answers: string[] = [];
  correctAnswer: string | undefined;

  currentScore: number = 0;

  gameStatus: GameStatus = GameStatus.Pending;

  constructor(private triviaService: TriviaService) { }

  selectCategory(category: Category): void {
    this.getQuestion(category);
  }

  selectAnswer(answer: string): void {
    if (this.currentQuestion!.correctAnswers !== answer) {
      return this.lose();
    }

    this.win()
  }

  start(): void {
    if (this.gameStatus === GameStatus.Lose) {
      this.currentScore = 0;
    }

    this.gameStatus = GameStatus.ChooseCategory;

    this.currentCategory = undefined;
    this.currentQuestion = undefined;

    this.answers.length = 0;
    this.correctAnswer = undefined;
  }

  getQuestion(category: Category): void {
    this.currentCategory = category;

    const randomPage: number = Math.floor(Math.random() * 25) + 1;

    this.triviaService
      .getQuestions({limit: 1, page: randomPage, category: this.currentCategory!, format: Format.MultipleChoice})
      .subscribe((questions: Questions) => {
        this.currentQuestion = questions.questions[0];

        const answers: string[] = [...this.currentQuestion.incorrectAnswers, this.currentQuestion.correctAnswers].sort(() => Math.random() - 0.5);

        for (let answer of answers) {
          this.answers.push(answer);
        }

        this.correctAnswer = this.currentQuestion.correctAnswers;

        this.gameStatus = GameStatus.Playing;
      })
  }

  win(): void {
    this.currentScore++;
    this.gameStatus = GameStatus.Win;
  }

  lose(): void {
    this.gameStatus = GameStatus.Lose;
  }

  protected readonly GameStatus = GameStatus;
  protected readonly Category = Category;
}

enum GameStatus {
  Pending,
  ChooseCategory,
  Playing,
  Win,
  Lose
}
