import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  login(data: any) {
    return this.http.post<any>(`${this.API_URL}/login`, data);
  }

  logout() {
    localStorage.removeItem('token');

    return this.http.post(`${this.API_URL}/logout`, {}, {
      headers: this.getAuthHeaders()
    });
  }


  saveToken(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(){
    return localStorage.getItem('role');
  }


  getAuthHeaders() {

    const token = this.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
