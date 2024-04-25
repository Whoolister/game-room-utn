import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"game-room-utn","appId":"1:618312835540:web:7a4daa7caf55d66c733641","storageBucket":"game-room-utn.appspot.com","apiKey":"AIzaSyB1sAPPKjvTy7nDgHliWrcEhsvqhsYYKq8","authDomain":"game-room-utn.firebaseapp.com","messagingSenderId":"618312835540"}))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"game-room-utn","appId":"1:618312835540:web:7a4daa7caf55d66c733641","storageBucket":"game-room-utn.appspot.com","apiKey":"AIzaSyB1sAPPKjvTy7nDgHliWrcEhsvqhsYYKq8","authDomain":"game-room-utn.firebaseapp.com","messagingSenderId":"618312835540"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
