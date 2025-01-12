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
  {
    path: 'profile',
    loadComponent: () =>
      import('../components/user-profile/user-profile.component').then((m) => m.UserProfileComponent),
  },// Catch-all route to redirect to the Landing Page

  {
    path: 'donor-dashboard',
    loadComponent: () =>
      import('../components/donor-dashboard/donor-dashboard.component').then((m) => m.DonorDashboardComponent),
  },

/*  {
    path: 'profile',
    loadComponent: () =>
      import('../components/donor-profile/donor-profile.component').then((m) => m.DonorProfileComponent),
  },*/
  {
    path: 'change-password',
    loadComponent: () =>
      import('../components/change-password/change-password.component').then((m) => m.ChangePasswordComponent),
  },
  {
    path: 'appointments/schedule',
    loadComponent: () =>
      import('../components/appointments/schedule/schedule.component').then((m) => m.ScheduleComponent),
  },
  {
    path: 'appointments/upcoming',
    loadComponent: () =>
      import('../components/appointments/upcoming/upcoming.component').then((m) => m.UpcomingComponent),
  },
  {
    path: 'appointments/past',
    loadComponent: () =>
      import('../components/appointments/past/past.component').then((m) => m.PastComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('../components/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
    children: [
      {
        path: 'overview',
        loadComponent: () =>
          import('../components/admin/overview/overview.component').then(
            (m) => m.OverviewComponent
          ),
      },
      {
        path: 'blood-inventory',
        loadComponent: () =>
          import('../components/admin/blood-inventory/blood-inventory.component').then(
            (m) => m.BloodInventoryComponent
          ),
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import('../components/admin/appointments/appointments.component').then(
            (m) => m.AppointmentsComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../components/admin/users/users.component').then(
            (m) => m.UsersComponent
          ),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('../components/admin/reports/reports.component').then(
            (m) => m.ReportsComponent
          ),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('../components/admin/notifications/notifications.component').then(
            (m) => m.NotificationsComponent
          ),
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
