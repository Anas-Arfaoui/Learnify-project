import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AuthService } from '../services/auth';

@Component({
  selector: 'app-correctanswers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './correctanswers.html',
  styleUrl: './correctanswers.css'
})
export class CorrectanswersComponent {

  answers: any[] = [];

  private API_URL = 'http://localhost:8000/api';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService
    
  ) {}

  ngOnInit() {

    const quizId = this.route.snapshot.paramMap.get('id');

    this.loadAnswers(quizId);
  }

  loadAnswers(id: any) {

    this.http.get<any[]>(
      `${this.API_URL}/quiz/${id}/correct-answers`,
      {
        headers: this.auth.getAuthHeaders()
      }
    ).subscribe(res => {

      this.answers = res;

    });

  }

}
