import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(AngularFireModule.initializeApp(environment)),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment))),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideAuth(() => getAuth())),
  ]
};
