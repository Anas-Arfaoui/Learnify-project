import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.css'],
})
export class CreateUser {
  name = '';
  email = '';
  password = '';

  private API_URL = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  register(registerForm: NgForm) {
    if (registerForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    // Send POST request to backend
    this.http.post(
      `${this.API_URL}/admin/users`, 
      {
        name: this.name,
        email: this.email,
        password: this.password
      },
      {
        headers: this.auth.getAuthHeaders()
      }
    ).subscribe({
      next: (res) => {

        alert('User created successfully!');
        console.log('User created successfully:', res);
   
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('Error creating user:', err);
      }
    });
  }
}
