import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  uploadedFiles: File[] = [];
  isDragging = false;
  loading = false;
  results: any[] = [];
  user: any = {};

  private API_URL = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadResults();
    this.loadUser();

  }

  // QUIZ HISTORY
  loadResults() {
    this.http.get<any[]>(`${this.API_URL}/my-results`, {
      headers: this.auth.getAuthHeaders()
    }).subscribe(res => {
      this.results = res;
    }, err => {
      console.error('Failed to load quiz history', err);
    });
  }

  loadUser() {
  this.http.get<any>(`${this.API_URL}/user`, {
    headers: this.auth.getAuthHeaders()
  }).subscribe({
    next: (res) => {
      this.user = res;
    },
    error: (err) => {
      console.error('Failed to load user', err);
    }
  });
}



// historique
get totalQuizzes(): number {
  return this.results.length;
}

get highestScore(): number {
  if (this.results.length === 0) return 0;
  return Math.max(...this.results.map(r => r.score));
}

get averageScore(): number {
  if (this.results.length === 0) return 0;
  const total = this.results.reduce((sum, r) => sum + r.score, 0);
  return +(total / this.results.length).toFixed(1);
}



  //fichier
  
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.uploadedFiles.push(files[i]);
      }
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  // generation
  generateQuiz() {
    if (this.uploadedFiles.length === 0) {
      alert('Please upload a file');
      return;
    }

    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.uploadedFiles[0]);
    formData.append('difficulty', 'medium');

    this.http.post<any>(
      `${this.API_URL}/quiz/generate`,
      formData,
      { headers: this.auth.getAuthHeaders() }
    ).subscribe({
      next: (res) => {
        this.loading = false;
        this.router.navigate(['/quiz', res.id]);
      },
      error: (err) => {
        console.error(err);
        alert('Quiz generation failed');
        this.loading = false;
      }
    });
  }
}
