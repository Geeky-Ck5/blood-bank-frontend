import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-validate-token',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './validate-token.component.html',
  styleUrl: './validate-token.component.scss'
})
export class ValidateTokenComponent implements OnInit {
  email: string = '';
  token: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Prefill email and token if present in the query parameters
    this.route.queryParams.subscribe(params => {
      if (params['email']) this.email = params['email'];
      if (params['token']) this.token = params['token'];
    });
  }

  onSubmit(): void {
    this.authService.validateToken({ email: this.email, token: this.token }).subscribe({
      next: () => {
        alert('Token validated successfully!');
        this.router.navigate(['/home']); // Redirect to the home page
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Invalid token.';
      }
    });
  }

  regenerateToken(): void {
    this.authService.regenerateToken({ email: this.email }).subscribe({
      next: () => {
        alert('A new token has been sent to your email.');
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Failed to regenerate token.';
      }
    });
  }

}
