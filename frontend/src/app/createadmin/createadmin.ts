// create-admin.component.ts
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './createadmin.html',
  styleUrls: ['./createadmin.css']
})
export class CreateAdminComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  message: string = '';

  private API_URL = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  createAdmin() {
  if (!this.name || !this.email || !this.password) {
    this.message = 'All fields are required!';
    return;
  }

  const adminData = {
    name: this.name,
    email: this.email,
    password: this.password
  };

  this.http.post<any>(
    `${this.API_URL}/create-admin`,
    adminData,
    { headers: this.auth.getAuthHeaders() }
  ).subscribe({
    next: (res) => {
      alert('Admin created successfully!');

      this.router.navigate(['/admin']);

      this.name = '';
      this.email = '';
      this.password = '';
    },
    error: (err) => {
      this.message = err.error.message || 'Error creating admin';
      console.error(err);
    }
  });
}

}
