import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private static readonly API_URL = 'https://api.quiz-contest.xyz/questions';
  // I know, I know, save it. It's just a demo.
  private static readonly API_KEY = "$2b$12$yha2cXchf7ZHrzS7mMqu2Oz2nzhEoOTiGM2cZH6TQMTknk29.LN4m";

  constructor(private http: HttpClient) { }

  getQuestions(params: QuestionParams): Observable<Questions> {
    const sanitizedLimit: number = Math.min(10, Math.max(1, Math.floor(params.limit)));
    const sanitizedPage: number = Math.min(99, Math.max(1, Math.floor(params.page)));

    if (params.format === undefined) {
      return this.http.get<Questions>(
        TriviaService.API_URL,
        {
          headers: {'Authorization': TriviaService.API_KEY},
          params: {limit: sanitizedLimit, page: sanitizedPage, category: params.category.value}
        }
      );
    } else {
      return this.http.get<Questions>(
        TriviaService.API_URL,
        {
          headers: {'Authorization': TriviaService.API_KEY},
          params: {limit: sanitizedLimit, page: sanitizedPage, category: params.category.value, format: params.format.value}
        }
      );
    }
  }
}

export type Questions = {
  questions: Question[];
  total: number;
  page: number;
  perPage: number;
}

export type Question = {
  id: string;
  category: string;
  format: string;
  question: string;
  correctAnswers: string;
  incorrectAnswers: string[];
}

type QuestionParams = {
  limit: number;
  page: number;
  category: Category;
  format: Format | undefined;
}

export class Category {
  static readonly Geography: Category = new Category('geography', 'Geografia');
  static readonly ArtAndLiterature: Category = new Category('arts&literature', 'Arte');
  static readonly Entertainment: Category = new Category('entertainment', 'Entretenimiento');
  static readonly ScienceAndNature: Category = new Category('science&nature', 'Ciencia');
  static readonly SportsAndLeisure: Category = new Category('sports&leisure', 'Deportes');
  static readonly History: Category = new Category('history', 'Historia');

  static readonly All: Category[] = <const> [
    Category.Geography,
    Category.ArtAndLiterature,
    Category.Entertainment,
    Category.ScienceAndNature,
    Category.SportsAndLeisure,
    Category.History
  ];

  private constructor(public readonly value: string, public readonly displayName: string) {}
}

export class Format {
  static readonly Boolean: Format = new Format('boolean', 'Verdadero/Falso');
  static readonly MultipleChoice: Format = new Format('multiple', 'Multiple Choice');
  static readonly All: Format[] = <const> [Format.Boolean, Format.MultipleChoice];

  private constructor(public readonly value: string, public readonly displayName: string) {}
}
