import { Routes } from '@angular/router';
import {NewComponent} from '../components/recipient-blood-request/new/new.component';
import {HistoryComponent} from '../components/recipient-blood-request/history/history.component';

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

  {
    path: 'recipient-signup',
    loadComponent: () =>
      import('../components/recipient-signup/recipient-signup.component').then(
        (m) => m.RecipientSignupComponent
      ),
  },

  {
    path: 'recipient-profile',
    loadComponent: () =>
      import('../components/recipient-profile/recipient-profile.component').then(
        (m) => m.RecipientProfileComponent
      ),
  },

  {
    path: 'recipient/appointments/schedule',
    loadComponent: () =>
      import('../components/recipient-appointments/schedule/schedule.component').then(
        (m) => m.ScheduleComponent
      ),
  },

  {
    path: 'recipient/appointments/upcoming',
    loadComponent: () =>
      import('../components/recipient-appointments/upcoming/upcoming.component').then(
        (m) => m.UpcomingComponent
      ),
  },
  {
    path: 'recipient/appointments/past',
    loadComponent: () =>
      import('../components/recipient-appointments/past/past.component').then(
        (m) => m.PastComponent
      ),
  },
  {
    path: 'recipient/blood-request/new',
    loadComponent: () =>
      import('../components/recipient-blood-request/new/new.component').then(
        (m) => m.NewComponent
      ),
  },
  {
    path: 'recipient/blood-request/history',
    loadComponent: () =>
      import('../components/recipient-blood-request/history/history.component').then(
        (m) => m.HistoryComponent
      ),
  },

  {
    path: 'donor/notifications',
    loadComponent: () =>
      import('../components/recipient-notifications/recipient-notifications.component').then(
        (m) => m.RecipientNotificationsComponent
      ),
    data: { role: 'donor' },
  },
  {
    path: 'recipient/notifications',
    loadComponent: () =>
      import('../components/recipient-notifications/recipient-notifications.component').then(
        (m) => m.RecipientNotificationsComponent
      ),
    data: { role: 'recipient' },
  },
  {
    path: 'donor/blood-request/new',
    loadComponent: () =>
      import('../components/donor-blood-request/new/new.component').then(
        (m) => m.NewComponent
      ),
  },


  {
    path: 'donor/blood-request/history',
    loadComponent: () =>
      import('../components/donor-blood-request/history/history.component').then(
        (m) => m.HistoryComponent
      ),
  },

  {
    path: 'recipient/community/stories',
    loadComponent: () =>
      import('../components/donor-community/stories/stories.component').then(
        (m) => m.StoriesComponent
      ),
    data: { role: 'recipient' },
  },
  {
    path: 'donor/community/stories',
    loadComponent: () =>
      import('../components/donor-community/stories/stories.component').then(
        (m) => m.StoriesComponent
      ),
    data: { role: 'donor' },
  },

  {
    path: 'donor/feedback',
    loadComponent: () =>
      import('../components/donor-feedback/donor-feedback.component').then(
        (m) => m.DonorFeedbackComponent
      ),
  },



  { path: '**', redirectTo: '' },
];
