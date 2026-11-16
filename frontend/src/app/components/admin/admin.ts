import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  users: any[] = [];


  private API_URL = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {

    this.http.get<any[]>(
      `${this.API_URL}/admin/users`,
      {
        headers: this.auth.getAuthHeaders()
      }
    ).subscribe(res => {
      this.users = res;
    });
  }

  deleteUser(id: number) {

    if (!confirm('Delete user?')) return;

    this.http.delete(
      `${this.API_URL}/admin/users/${id}`,
      {
        headers: this.auth.getAuthHeaders()
      }
    ).subscribe(() => {

      this.users = this.users.filter(u => u.id !== id);

    });
  }

  goToEdit(id: number) {

    this.router.navigate(['/admin/users/updateuser', id]);

  }

}
