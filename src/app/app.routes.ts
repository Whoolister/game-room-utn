import { Routes } from '@angular/router';

export const routes: Routes = [
  // Routes
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(comp => comp.HomeComponent) },
  { path: 'login', loadComponent: () => import("./components/login/login.component").then(comp => comp.LoginComponent) },
  { path: 'register', loadComponent: () => import("./components/register/register.component").then(comp => comp.RegisterComponent) },
  { path: 'who-am-i', loadComponent: () => import("./components/who-am-i/who-am-i.component").then(comp => comp.WhoAmIComponent) },
  { path: 'hangman', loadComponent: () => import("./components/games/hangman/hangman.component").then(comp => comp.HangmanComponent) },
  { path: 'higher-or-lower', loadComponent: () => import("./components/games/higher-or-lower/higher-or-lower.component").then(comp => comp.HigherOrLowerComponent) },
  { path: 'trivia', loadComponent: () => import("./components/games/trivia/trivia.component").then(comp => comp.TriviaComponent) },
  { path: 'wordle', loadComponent: () => import("./components/games/wordle/wordle.component").then(comp => comp.WordleComponent) },

  { path: 'error', loadComponent: () => import("./components/error/error.component").then(comp => comp.ErrorComponent) },
  // Redirects
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' }
];
