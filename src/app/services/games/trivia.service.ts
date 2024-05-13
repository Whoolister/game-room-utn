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

  getQuestions(params: QuestionParams): Observable<Question[]> {
    const sanitizedLimit: number = Math.min(10, Math.max(1, Math.floor(params.limit)));
    const sanitizedPage: number = Math.min(99, Math.max(1, Math.floor(params.page)));
    const sanitizedCategory: string = this.fromCategory(params.category);
    const sanitizedFormat: string | undefined = params.format ? this.fromFormat(params.format) : undefined;

    if (sanitizedFormat === undefined) {
      return this.http.get<Question[]>(
        TriviaService.API_URL,
        {
          headers: {
            'Authorization': `Bearer ${TriviaService.API_KEY}`
          },
          params: {limit: sanitizedLimit, page: sanitizedPage, category: sanitizedCategory}
        }
      );
    } else {
      return this.http.get<Question[]>(
        TriviaService.API_URL,
        {
          headers: {
            'Authorization': `Bearer ${TriviaService.API_KEY}`
          },
          params: {limit: sanitizedLimit, page: sanitizedPage, category: sanitizedCategory, format: sanitizedFormat}
        }
      );
    }
  }

  private fromCategory(category: Category): string {
    switch (category) {
      case Category.GEOGRAPHY:
        return 'geography';
      case Category.ART_AND_LITERATURE:
        return 'arts&literature';
      case Category.ENTERTAINMENT:
        return 'entertainment';
      case Category.SCIENCE_AND_NATURE:
        return 'science&nature';
      case Category.SPORTS_AND_LEISURE:
        return 'sports&leisure';
      case Category.HISTORY:
        return 'history';
    }
  }

  private fromFormat(format: Format): string {
    switch (format) {
      case Format.BOOLEAN:
        return 'boolean';
      case Format.MULTIPLE_CHOICE:
        return 'multiple';
    }
  }
}

type Question = {
  id: string;
  category: string;
  format: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

type QuestionParams = {
  limit: number;
  page: number;
  category: Category;
  format: Format | undefined;
}

enum Category {
  GEOGRAPHY,
  ART_AND_LITERATURE,
  ENTERTAINMENT,
  SCIENCE_AND_NATURE,
  SPORTS_AND_LEISURE,
  HISTORY,
}

enum Format {
  BOOLEAN,
  MULTIPLE_CHOICE,
}
