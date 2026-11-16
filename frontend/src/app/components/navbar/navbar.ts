import { Component, inject } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private http = inject(HttpClient);
  private router = inject(Router);

  logout() {
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.http.post('http://localhost:8000/api/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }
}