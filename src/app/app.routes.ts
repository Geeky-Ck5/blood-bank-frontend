import { Routes } from '@angular/router';
import { LandingComponent} from '../components/landing/landing.component';
import {SignupComponent} from '../components/signup/signup.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent) },
  { path: 'signup', loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent) },
  { path: '**', redirectTo: '' },
];
