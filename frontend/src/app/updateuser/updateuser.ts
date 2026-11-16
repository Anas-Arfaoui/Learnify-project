import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../services/auth';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updateuser.html',
    styleUrl: './updateuser.css'

})
export class UpdateUser implements OnInit {

  userId!: number;

  name = '';
  email = '';

  private API_URL = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {

    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadUser();
  }

  loadUser() {

    this.http.get<any>(
      `${this.API_URL}/admin/users/${this.userId}`,
      {
        headers: this.auth.getAuthHeaders()
      }
    ).subscribe(res => {

      this.name = res.name;
      this.email = res.email;

    });
  }

  updateUser() {

    const data = {
      name: this.name,
      email: this.email
    };

    this.http.put(
      `${this.API_URL}/admin/users/${this.userId}`,
      data,
      {
        headers: this.auth.getAuthHeaders()
      }
    ).subscribe(() => {

      alert('User updated successfully');
      this.router.navigate(['/admin']);

    });

  }
}
