import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ErrorComponent} from "./components/error/error.component";
import {WhoAmIComponent} from "./components/who-am-i/who-am-i.component";
import {TriviaComponent} from "./components/games/trivia/trivia.component";
import {WordleComponent} from "./components/games/wordle/wordle.component";
import {HigherOrLowerComponent} from "./components/games/higher-or-lower/higher-or-lower.component";
import {HangmanComponent} from "./components/games/hangman/hangman.component";

export const routes: Routes = [
  // Routes
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'who-am-i', component: WhoAmIComponent },
  { path: 'hangman', component: HangmanComponent },
  { path: 'higher-or-lower', component: HigherOrLowerComponent },
  { path: 'trivia', component: TriviaComponent },
  { path: 'wordle', component: WordleComponent },

  { path: 'error', component: ErrorComponent },
  // Redirects
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' }
];
