import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-quizdisplay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizdisplay.html',
  styleUrl: './quizdisplay.css'
})
export class QuizDisplay implements OnInit {

  quiz: any = null;
  answers: any = {};
  score: number | null = null;

  private API_URL = 'http://localhost:8000/api';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const quizId = this.route.snapshot.paramMap.get('id');

    if (quizId) {
      this.loadQuiz(quizId);
    }
  }

  loadQuiz(id: string) {

    this.http.get<any>(
      `${this.API_URL}/quiz/${id}`,
      {
        headers: this.auth.getAuthHeaders()
      }
    ).subscribe({

      next: (res) => {
        this.quiz = res;
      },

      error: (err) => {
        console.error('Load quiz error', err);
      }

    });

  }




  selectAnswer(qId: number, aId: number) {

    this.answers[qId] = aId;
  }

  submitQuiz() {

    this.http.post<any>(
      `${this.API_URL}/quiz/${this.quiz.id}/submit`,
      {
        answers: this.answers
      },
      {
        headers: this.auth.getAuthHeaders()
      }
    ).subscribe({

      next: (res) => {
        this.score = res.score;
      },

      error: (err) => {
        console.error('Submit error', err);
      }

    });

  }


  goToAnswers() {
  this.router.navigate(['/quiz', this.quiz.id, 'answers']);
}
}
