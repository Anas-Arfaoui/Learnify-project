import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data).subscribe({

      next: (res: any) => {

        this.authService.saveToken(res.access_token,res.role);

        console.log('Token saved:', res.access_token);

        if (res.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/profile']);
      }
      },

      error: () => {
        this.error = 'Login failed';
      }

    });
  }
}
