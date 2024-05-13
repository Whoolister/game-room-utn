import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RandomWordService {
  private static readonly API_URL = 'https://random-word-api.herokuapp.com/word';
  private static readonly DEFAULT_AMOUNT = 1
  private static readonly DEFAULT_LENGTH = 5

  constructor(private http: HttpClient) { }

  getRandomWords(
    length: number = RandomWordService.DEFAULT_LENGTH,
    amount: number = RandomWordService.DEFAULT_AMOUNT
  ): Observable<string[]> {
    const sanitizedLength: number = Math.min(10, Math.max(1, Math.floor(length)))
    const sanitizedAmount: number = Math.min(10, Math.max(1, Math.floor(amount)))

    return this.http.get<string[]>(RandomWordService.API_URL, {params: {lang: 'es', length: sanitizedLength, number: sanitizedAmount}});
  }
}
