import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../components/landing/landing.component').then((m) => m.LandingComponent), // Landing/Sign-In
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('../components/signup/signup.component').then((m) => m.SignupComponent), // Sign-Up
  },
  {
    path: 'auth',
    children: [
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('../auth/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
      },
      {
        path: 'email-verification',
        loadComponent: () =>
          import('../auth/email-verification/email-verification.component').then((m) => m.EmailVerificationComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },

  {
    path: 'profile',
    loadComponent: () =>
      import('../components/user-profile/user-profile.component').then((m) => m.UserProfileComponent),
  }// Catch-all route to redirect to the Landing Page
];
